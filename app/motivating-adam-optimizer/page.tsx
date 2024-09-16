import hljs from 'highlight.js'
import hljsZig from 'highlightjs-zig'
import { Metadata } from 'next'
import Blog from '@/blog'
// Register Zig language for highlight.js
hljs.registerLanguage('zig', hljsZig)

export const metadata: Metadata = {
  title: 'Motivating Adam Optimizer',
  description: 'Learn about adam optimizer from the optimization algorithms that preceded it.',
  keywords: ['adam optimizer', 'ai', 'artificial intelligence', 'machine learning', 'neural networks'],
}

const md = `
our first type of optimization, the standard one size fits all solution would be to subtract the gradient from the weights multiplied by some learning rate constant throughout training. this changes the weights all the same amount relative to their gradients. one obvious downside of this approach, is it does not have any memory of prior gradient descent values prior, so in effect, this can make the descent path more sparse. basically the noise in the movement would be larger because we are not identifying prior redundant paths based on a moving average, so if we are jostling from high negative to high positive gradients and going across the whole error surface for every iteration, we wouldn't be able to use this information in standard gradient descent with a constant learning rate.   

another thing which is bad about a constant learning rate, is that during initial training, there are large gradients, and it would be helpful and more computationally efficient to exponentially descrease the learning rate as the training goes on since this could help us reduce the required number of iterations.     
## stochastic gradient descent

$$
W_{t+1} =W_t - \\eta* \\frac{\\partial L}{\\partial W_t}
$$
This is the basic gradient descent formula. The next set of weights is equal to what they were prior, minus the gradients times the learning rate.   
## stochastic gradient descent with momentum   
now, we can create memory of past gradient descent gradients in order to smooth our descent through the error surface. we can do this with something called momentum. momentum can be thought of how it is in the natural sense. if you are barreling in one direction and suddenly make a weird pivot in the opposite direction, you will slightly slow down your velocity in the previous direction, but will still go in that direction for some number of iterations, until there would be a sufficient number of sequential iterations going towards that opposite direction. so momentum is the direction and magnitude history of prior gradients. there are two ways to consider momentum: either we can have it be that each step has the same expressive power as all the last (as a proportion of effectiveness), or we can have it dimisive expressive power by treating momentum like gas in a car which decreases (linearly or exponentionally), thus, leading to a convergence in placement over t iterations.   

$$
v^\\tau = \\beta_1 v^{\tau-1} +(1-\\beta_1)\\frac{\\partial L}{\\partial W_t}
$$

$$
W_{t+1} =W_t - \\eta*v^\\tau
$$
this equation denotes momentum at the t'th iteration for the parameters. it has memory of the previous value of momentum and is multiplied by some significance value, beta which is a number from 0 to 1, typically 0.9 or 0.99 which denotes the weighting the momentum has on the current gradient, while this means 0.1 or 0.01 is the typical weighting of the current iterations gradient on this weight change. like we mentioned, this is a way to smooth the descent through the error surface.   
## adagrad (adaptive gradient)   

$$
s^\\tau = s^{\\tau-1} + (\\frac{\\partial L}{\\partial W_t})^2
$$

$$
W_{t+1} =W_t - \\eta* \\frac{\\frac{\\partial L}{\\partial W_t}}{\\sqrt{s^\\tau}+\\varepsilon}
$$
we notice we are like momentum, factoring in prior gradients in our future gradients, and this of course smooths our descent down the error surface too, but there is a difference between this and momentum. with momentum we aren't factoring in the magnitude of the prior gradients so it doesn't have this descending weighting affect. all iterations have just as much movement power as the last ones. but with adagrad, since we aren't adding a proportion as beta to the prior speed (magnitude which is non-directional) squared and the current speed (gradient) squared, this magnitude just builds up and up as we go deeper in training (higher iterations), so we are dividing by a larger and larger number over time, so we can consider this speed term as a gravity, which increases more and more over time until we eventually can change only a negligible amount. this is helpful for both smoothing, but also so we can approach a local minima instead of bouncing over it if we had just as much expressive power with a constant learning rate which is possible with sgd with momentum for example. also, we aren't moving in some average direction, but rather, we are moving in the direction only of the most recent grad, but with a scaling affected by the total amount of speeds of all prior grads plus our grads speed (magnitude).   
## rmsprop (root mean square propagation)   

$$
s^\\tau = \\beta_2 s^{\\tau-1} +(1-\\beta_2)(\\frac{\\partial L}{\\partial W_t})^2
$$

$$
W_{t+1} =W_t - \\eta* \\frac{\\frac{\\partial L}{\\partial W_t}}{\\sqrt{s^\\tau}+\\epsilon}
$$
now, here is the equation for rmsprop. our v now does not denote direction, but only magnitude squared because all negatives become positives. now dividing the direction by the average magnitude (speed), we can move in the exact direction of our specific gradient, but scaled by a factor of how much larger or smaller the magnitude of the gradient is from our moving average magnitude. the difference between this and sgd with momentum, is that sgd with momentum not only changes the scale of the magnitude, but also changes the direction. with rmsprop however, magnitude is determined relative to the moving average magnitude, but the direction is only determined by this most recent gradient like adagrad.   
the difference between adagrad and rmsprop however, is there is not this decreasing expressiveness with rmsprop, because we are not simply adding the gradients together, but their proportions, so they are in effect, an average, not a sum.   
## adam (adaptive moment)   
now we move to the most modern and popular optimizer, which combines the ideals of momentum and rmsprop together. so we enjoy the smooth effect of momentum, which only gradually changes velocity, but we don't like how it does not decrease in strength over time. like rmsprop, we are moving at a speed relative to the average magnitude where we govern the significance of the memory and the current momentum. so, adam has the average directionality of momentum, while moving at a speed relative to the average speed like rmsprop.   

$$
v^\\tau = \\beta_1 v^{\\tau-1} +(1-\\beta_1)\\frac{\\partial L}{\\partial W_t}
$$

$$
s^\\tau = \\beta_2 s^{\\tau-1} +(1-\\beta_2)(\\frac{\\partial L}{\\partial W_t})^2
$$

$$
\\hat{v} = \\frac{v^\\tau}{1-(\\beta_1)^\\tau}
$$

$$
\\hat{s} = \\frac{s^\\tau}{1-(\\beta_2)^\\tau}
$$

$$
W_{t+1} = W - \\eta * \\frac{\\hat{v}}{\\sqrt{\\hat{s}} + \\varepsilon}
$$
as you see, we are literally just combining momentum, and rmsprop! v^t is the momentum equation and s^t is the rmsprop equation. but we are adding something which neither of them had which is the exponentially decreasing learning rate effect denoted by v hat and s hat. all these equations do is change the scale of v and s, so by doing this, since the decay rate is less than 1 (typically 0.9 for beta2 and 0.99 for beta1), as the iteration approaches infinity, s hat will approach s^t and v hat will approach v^t. so the equation v hat divided by sqrt s hat approaches v^t/sqrt(s^t) which means this is the amount it is able to move the weights times the learning rate ofc.   
**so, why is this better? **   
- rmsprop or momentum do not diminish the scale of the change in weight exponentially as more iterations are gone through.   
- momentum utilizes average velocity, and rmsprop utilizes average speed. average velocity makes the navigation through the error surface smoother, and average speed adapts the learning rate to the recent gradient magnitudes, potentially leading to more stable and efficient convergence.   
- adam combines the concepts of average velocity and average speed, using bias-corrected moving averages of both the gradients and the squared gradients to adaptively adjust the learning rate.   
   
adagrad is like converging decay toward 0, adam is converging decay towards s hat / sqrt r hat, and rms prop has no convergence because it simply is the velocity / avg magnitude key word avg not sum. so rmsprop has the same expressive power for any iteration r.   
there are two ways to consider momentum: either we can have it be that each step has the same expressive power as all the last (as a proportion of effectiveness), or we can have it dimisive expressive power by treating momentum like gas in a car which decreases (linearly or exponentionally), convering to a speed of 0 or some constant (which you could think of like how running out of gas on the slope of a hill would lead to a speed constant (governed by the hill)).   
`

export default function Page() {
  return <Blog title='motivating adam optimizer' md={md} date='sept 16, 2024' />
}
