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
NUM_PREV_STATES = 5

class LevelTwoEnv(gym.Env[np.ndarray, Union[int, np.ndarray]]):

    def __init__(self, render_mode: Optional[str] = None):
        super().__init__()
        
        self.metadata = {"render_modes": ["human", "rgb_array"], "render_fps": 30}

        self.screen = None

        self.done = False 
        self.run = True
        self.render_mode = render_mode

        self.action_space = spaces.Discrete(4)
        self.observation_space = spaces.Box(low=0, high=1, shape=(14,), dtype=float)

        self.info = {}

        self.prev_positions = []

        self.Agent = Agent()

        self.step_counter = 0

        self.hologram_tiles = self.generate_hologram_tiles()
        self.Apple = self.get_random_apple()

        self.distance = np.linalg.norm(np.array([self.Agent.head[0]/WIDTH, self.Agent.head[1]/WIDTH]) - np.array([self.Apple[0]/WIDTH, self.Apple[1]/WIDTH]))

    
    def get_random_apple(self):
        while True:
            pos = [random.randrange(1,int(WIDTH)),random.randrange(1,int(HEIGHT))]
            if pos not in self.hologram_tiles:
                return pos

    def generate_hologram_tiles(self):
        num_hologram_tiles = random.randint(25, 50)
        hologram_tiles = []
        for _ in range(num_hologram_tiles):
            x = random.randrange(1, WIDTH)
            y = random.randrange(1, HEIGHT)
            hologram_tiles.append([x, y])
        return hologram_tiles

    def get_agent_vision(self):
        vision = np.zeros((3, 3))
        for i in range(-1, 2):
            for j in range(-1, 2):
                x = self.Agent.head[0] + i
                y = self.Agent.head[1] + j
                if 0 <= x < WIDTH and 0 <= y < HEIGHT:
                    if [x, y] in self.hologram_tiles:
                        vision[i+1, j+1] = 1
                else:
                    vision[i+1, j+1] = 1
        return vision.flatten()

    def step(self, action):

        reward = 0

        self.prev_positions.append(self.Agent.head[:])

        if action == 0: # left
            self.Agent.head[0] -= 1

        if action == 1: # Up
            self.Agent.head[1] -= 1

        if action == 2: # Right
            self.Agent.head[0] += 1

        if action == 3: # Down
            self.Agent.head[1] += 1

        while len(self.prev_positions) > NUM_PREV_STATES:
            self.prev_positions = self.prev_positions[1:]

        current_distance = np.linalg.norm(np.array([self.Agent.head[0]/WIDTH, self.Agent.head[1]/WIDTH]) - np.array([self.Apple[0]/WIDTH, self.Apple[1]/WIDTH]))

        if current_distance < self.distance:
            reward += 1

        if current_distance < self.distance:
            reward -= 0.5
        
        if self.Agent.head in self.prev_positions:
            # index = self.prev_positions.index(self.Agent.head)
            reward -= 0.5

        self.distance = current_distance

        agent_vision = self.get_agent_vision()
        # [vision, [x, y], [target_x, target_y], distance]
        self.observation = np.concatenate((agent_vision, [self.Agent.head[0]/WIDTH, self.Agent.head[1]/WIDTH, self.Apple[0]/WIDTH, self.Apple[1]/WIDTH, self.distance]))

        if self.Agent.head[1] < 0 or self.Agent.head[0] < 0 or self.Agent.head[1] > HEIGHT or self.Agent.head[0] > WIDTH or self.Agent.head in self.hologram_tiles:
            reward -= 2.5
            self.done = True

        if self.Apple == self.Agent.head:
            reward += 2.5 - 1.5*(self.step_counter / 100)
            self.prev_positions = []
            self.Agent.tail.insert(0,list(self.Agent.head))
            self.Apple = self.get_random_apple()
            self.distance = np.linalg.norm(np.array([self.Agent.head[0]/WIDTH, self.Agent.head[1]/WIDTH]) - np.array([self.Apple[0]/WIDTH, self.Apple[1]/WIDTH]))

        self.step_counter += 1

        if self.step_counter >= 100:
            self.done = True

        return self.observation, reward, self.done, self.done, self.info


    def reset(self, seed=None, options=None):
        if seed is not None:
            np.random.seed(seed)
            
        self.prev_positions = []
        self.Agent = Agent()
        self.Apple = self.get_random_apple()
        self.distance = np.linalg.norm(np.array([self.Agent.head[0]/WIDTH, self.Agent.head[1]/WIDTH]) - np.array([self.Apple[0]/WIDTH, self.Apple[1]/WIDTH]))
        agent_vision = self.get_agent_vision()
        self.observation = np.concatenate((agent_vision, [self.Agent.head[0]/WIDTH, self.Agent.head[1]/WIDTH, self.Apple[0]/WIDTH, self.Apple[1]/WIDTH, self.distance]))
        self.done = False
        self.hologram_tiles = self.generate_hologram_tiles()

        self.step_counter = 0

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

            for pos in self.hologram_tiles:
                pygame.draw.rect(self.screen, (255,255,0), [pos[0], pos[1], 15,15])

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

            for pos in self.hologram_tiles:
                pygame.draw.rect(self.screen, (255,255,0), [pos[0]*15, pos[1]*15, 15,15])

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
    id='LevelTwo',
    entry_point='LevelTwoEnv:LevelTwoEnv',
)