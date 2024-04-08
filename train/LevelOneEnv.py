import gymnasium as gym
from gymnasium import spaces

import pygame
import random
import numpy as np

from Agent import Agent
from gymnasium.envs.registration import register
from typing import Optional, Union


HEIGHT = 25
WIDTH = 25
get_random_apple = lambda: [random.randrange(1,int(WIDTH)),random.randrange(1,int(HEIGHT))]


class LevelOneEnv(gym.Env[np.ndarray, Union[int, np.ndarray]]):

    def __init__(self, render_mode: Optional[str] = None):
        super().__init__()
        
        self.metadata = {"render_modes": ["human", "rgb_array"], "render_fps": 30}

        self.screen = None

        self.done = False 
        self.run = True
        self.render_mode = render_mode

        self.action_space = spaces.Discrete(4)
        self.observation_space = spaces.Box(low=0, high=WIDTH, shape=(5,), dtype=float)

        self.info = {}

        self.Agent = Agent()
        self.Apple = get_random_apple()

        self.distance = np.linalg.norm(np.array([self.Agent.head[0], self.Agent.head[1]]) - np.array([self.Apple[0], self.Apple[1]]))


    def step(self, action):

        reward = 0

        if action == 0: # left
            self.Agent.head[0] -= 1

        if action == 1: # Up
            self.Agent.head[1] -= 1

        if action == 2: # Right
            self.Agent.head[0] += 1

        if action == 3: # Down
            self.Agent.head[1] += 1


        if np.linalg.norm(np.array([self.Agent.head[0], self.Agent.head[1]]) - np.array([self.Apple[0], self.Apple[1]])) < self.distance:
            reward += 1

        else:
            reward -= 0.5

        self.distance = np.linalg.norm(np.array([self.Agent.head[0], self.Agent.head[1]]) - np.array([self.Apple[0], self.Apple[1]]))

        self.observation = np.array([self.Agent.head[0], self.Agent.head[1], self.Apple[0], self.Apple[1], self.distance])

        if self.Agent.head[1] < 0 or self.Agent.head[0] < 0 or self.Agent.head[1] > HEIGHT or self.Agent.head[0] > WIDTH:
            self.done = True

        if self.Apple == self.Agent.head:

            self.Agent.tail.insert(0,list(self.Agent.head))
            self.Apple = get_random_apple()
            self.distance = np.linalg.norm(np.array([self.Agent.head[0], self.Agent.head[1]]) - np.array([self.Apple[0], self.Apple[1]]))


        return self.observation, reward, self.done, self.done, self.info


    def reset(self, seed=None, options=None):
        if seed is not None:
            np.random.seed(seed)

        self.Agent = Agent()
        self.Apple = get_random_apple()
        self.distance = np.linalg.norm(np.array([self.Agent.head[0], self.Agent.head[1]]) - np.array([self.Apple[0], self.Apple[1]]))
        self.observation = np.array([self.Agent.head[0], self.Agent.head[1], self.Apple[0], self.Apple[1], self.distance])
        self.done = False

        return self.observation, {}


    def render(self):
        if self.render_mode is None:
            gym.logger.warn(
                "You are calling render method without specifying any render mode. "
                "You can specify the render_mode at initialization, "
                f'e.g. gym.make("{self.spec.id}", render_mode="rgb_array")'
            )
            return
        if self.render_mode == 'human':
            self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
            self.screen.fill((0,0,0))
            pygame.draw.rect(self.screen, (255,0,0), [self.Apple[0],self.Apple[1], 15,15])

            for pos in self.Agent.tail:
                pygame.draw.rect(self.screen, (0,0,120), [pos[0], pos[1], 15,15])

            self.Agent.tail.insert(0,list(self.Agent.head))
            self.Agent.tail.pop()

            blockSize = 15
            for x in range(0, 1200, blockSize):
                for y in range(75, 800, blockSize):
                    rect = pygame.Rect(x, y, blockSize, blockSize)
                    pygame.draw.rect(self.screen, (25,25,25), rect, 1)

            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.run = False
                    self.close()

        elif self.render_mode == 'rgb_array':
            if self.screen is None:
                self.screen = pygame.Surface((WIDTH*15, HEIGHT*15))
            
            self.screen.fill((0, 0, 0))
            pygame.draw.rect(self.screen, (255, 0, 0), [self.Apple[0]*15, self.Apple[1]*15, 15, 15])

            for pos in self.Agent.tail:
                pygame.draw.rect(self.screen, (0, 0, 120), [pos[0]*15, pos[1]*15, 15, 15])

            self.Agent.tail.insert(0, list(self.Agent.head*15))
            self.Agent.tail.pop()

            blockSize = 15
            for x in range(0, 1200, blockSize):
                for y in range(75, 800, blockSize):
                    rect = pygame.Rect(x, y, blockSize, blockSize)
                    pygame.draw.rect(self.screen, (25, 25, 25), rect, 1)

            rgb_array = pygame.surfarray.array3d(self.screen)
            return rgb_array
    
    def close(self):
        if self.screen is not None:
            import pygame

            pygame.display.quit()
            pygame.quit()


register(
    id='LevelOne',
    entry_point='LevelOneEnv:LevelOneEnv',
)