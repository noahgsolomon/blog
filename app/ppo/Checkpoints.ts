export const CHECKPOINTS = [
  {
    chapterName: 'Intro to RL',
    position: [-10, 4, 5],
    look: [0, -2, 0],
    play: [
      {
        position: [-12, 1, 2],
        look: [6, 0, 2],
        markdown: `This is Ollie, our agent. He is currently dumb, but we will smarten him up more and more as we progress...
<br></br>
Ollie wants only 1 thing... and that is to maximize his average cumulative reward over many episodes.`,
      },
      {
        position: [-13, 3, -2],
        look: [0, -2, 2],
        markdown: `His current objective: Make it to this golden tile in as few steps as possible. This is a very simple optimization problem, and we don't even need any neural networks to solve it.
<br></br>
We need to create a reward function R that takes in parameters of our state and the action we take to get a value of how good or bad taking that action was.

        `,
      },
    ],
    markdown: [
      `## Reinforcement Learning
<br></br>
RL is a class of algorithms in Machine learning which can learn to navigate an environment in such a way to maximize a cumulative reward. By initially making random actions in an environment, and being informed of the quality of the action chosen, the agent is able to iteratively approach more optimal generalizations about this environment.
<br></br>
A valuable aspect of RL is that we do not even need to understand what the optimal solution will be which maximizes the reward. All that is needed for learning to take place is an environment, a way to observe that environment, and a reward signal which determines the value of any state. For this reason, one particularly important and challenging aspect of RL is how to model the environment states, and what reward we should assign to those states.
<br></br>
## Why do we even need this RL stuff? 
<br></br>
Can't we just pre-compute the most optimal action to take for any given state? The problem is the scale of possible states to experience and actions to choose from. As an example, if we take an atari screen's pixels as input to learn to play some game, where the size of the screen is 160x192 pixels in grayscale, each pixel would be able to take on 256 different values. 
<br></br> 
There being $160 \\times 192$ different pixels, the total number of states this policy function could receive as input would be $256^{(160 \\times 192)}$. (Costa Huang dissertation) For context, there are $10^{80}$ atoms in the known universe, so this problem is computationally infeasible to pre-compute a state-to-action mapping table.
<br></br>
### The essence
<br></br>
The essence of RL is to learn some function approximation called the policy, denoted as $\\pi$, which takes in as input the state $s$ of the agent in the environment and outputs an action $a$ to take to move us from the current state to a new state.
<br></br>
The chain of state-action pairs an agent experiences is called a trajectory, denoted as $\\tau = (s_0, a_0, s_1, a_1, \\dots, s_T)$.
<br></br>
This trajectory forms an episode, and can either end by reaching a terminal state (out of bounds, or final reward achieved, etc.) or by taking $T$ transitions, where $T$ is the maximum trajectory length.
`,
      `### Fundamentally there are only <u>two</u> phases in training. 
<br></br>
#### <u className="bg-blue-500/40">Step 1</u>
The first is the <u>data collection step</u>, which is when the agents navigate the environment, collecting information like the state transitions and actions taken, the probability outputted for the action chosen, the reward received from the new state, and more.

<br></br>
Mathematically, we can represent this as a tuple $(s_t, a_t, r_t, s_{t+1}, \\pi_\\theta(a_t|s_t))$, where $s_t$ is the current state, $a_t$ is the action taken, $r_t$ is the reward received, $s_{t+1}$ is the next state, and $\\pi_\\theta(a_t|s_t)$ is the probability of taking action $a_t$ given state $s_t$ under the current policy $\\pi_\\theta$.
<br></br>
#### <u className="bg-purple-500/40">Step 2</u>
The next step is the <u>optimization step</u> where we take this information and optimize our policy function $\\pi_\\theta$ so that we discourage taking actions in states which received low reward, and encourage taking actions in states where we received large reward.
<br></br>
This can be achieved by maximizing the expected cumulative reward $J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}[\\sum_{t=0}^T \\gamma^t r_t]$, where $\\tau$ is a trajectory sampled from the policy $\\pi_\\theta$, $\\gamma$ is the discount factor, and $T$ is the horizon length. By updating the policy parameters $\\theta$ using gradient ascent on $J(\\theta)$, we can improve the policy to take actions that lead to higher rewards.`,
      `## If you get anything from this section it should be this
<br></br>
An agent is situation in environment $E$, in which it observed states $s_t$ where $s \\in S$, the possibly infinite number of different states an agent might find itself, for all timesteps $t$, where $1 \\leq t \\leq T$, $T$ being the max trajectory length.
<br></br>
When situated in state $s_t$, the objective is to pick an action $a_t$ in which is most optimal with respect to our cumulative reward received. $a_t$ denotes the action we pick at time step $t$ based on our observation in $s_t$. Once we take this action, we arive in a new state $s_{t+1}$ which yields a reward $r_t$.<br></br>
Note, we ourselves need to come up with some reward function, which is what we want the critic (will explain more later) to predict as accurately as possible. $a_t$ is within the set $A$, where $A$ is all possible actions we can take. For simplicity, we can assume all actions in the set $A$ are valid for all states. (PPO Explained Paper)`,
    ],
  },
  {
    chapterName: 'Q Learning',
    position: [90, 0, 0],
    look: [0, 0, 0],
    markdown: [
      `### The essence
<br></br>
The essence of RL is to learn some function approximation called the policy, denoted as $\\pi$, which takes in as input the state $s$ of the agent in the environment and outputs an action $a$ to take to move us from the current state to a new state.
<br></br>
The chain of state-action pairs an agent experiences is called a trajectory, denoted as $\\tau = (s_0, a_0, s_1, a_1, \\dots, s_T)$.
<br></br>
This trajectory forms an episode, and can either end by reaching a terminal state (out of bounds, or final reward achieved, etc.) or by taking $T$ transitions, where $T$ is the maximum trajectory length.
`,
    ],
  },
  {
    chapterName: 'Deep Q Learning (DQN)',
    position: [190, 0, 0],
    look: [0, 0, 0],
    markdown: [
      `
`,
    ],
  },
]
