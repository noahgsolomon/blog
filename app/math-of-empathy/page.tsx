import hljs from 'highlight.js'
import hljsZig from 'highlightjs-zig'
import { Metadata } from 'next'
import Blog from '@/blog'
// Register Zig language for highlight.js
hljs.registerLanguage('zig', hljsZig)

export const metadata: Metadata = {
  title: 'The Mathematical Importance of Empathy',
  description:
    'how we understand and interact with others through the lens of mathematical dimensionality and projections.',
  keywords: ['mathematics', 'empathy', 'dimensionality', 'projections', 'vector spaces'],
}

const md = `
## the mathematical importance of empathy

misunderstandings happen when we view a system or person through a *lower-dimensional* lens than reality demands. mathematically, consider a vector space of dimension M. if you only measure N < M coordinates, you lose data—this is a projection, or a *lossy compression* of truth.

### dimensional expansions & time
truth evolves with new dimensions. historically, the dimension N of a truth at time t0 may be less than M, the dimension at time t1. for instance, if we once believed a certain scientific law to be "absolute," new discoveries (dimensions) can challenge it. mathematically:
$$
\\text{truth}(t_1) \\subseteq V \\quad\\text{where}\\quad \\dim(V) \\geq \\dim(\\text{truth}(t_0))
$$
as time progresses from t0 to t1, our understanding might expand into a larger space. newton's laws didn't become wrong—they became a special case of einstein's larger truth.

### empathy as dimensional bridging
empathy is *acknowledging* there's always a part of the vector space we haven't captured. in data terms, a single clustering method like *k-means* can't fully capture the nuanced distribution that might be better represented by a *gaussian mixture model*. each method is a different way of compressing information. empathy is our willingness to look for those "missing dimensions" in a system or person.

### abstraction & dependencies
any interface you see—be it a snippet of code or a brief conversation—represents a *projection* of a deeper, more complex space. dependencies that exist "higher up" in the abstraction hierarchy can't be inferred from one limited view. 
$$
\\Pi(\\text{high-dim truth}) \\neq \\text{high-dim truth}
$$
pi represents projection—like casting a 3D shadow onto a 2D wall, we inevitably lose information when we reduce dimensions.

### temporal re-check
every memory or historical record is pinned to a dimensional space of the past. as new dimensions emerge reevaluation of old truths is necessary.

### dimensional bias & blind spots
our tendency to simplify complex systems into lower dimensions creates inherent blind spots. imagine a curved surface (a manifold) floating in 3D space. when we project it onto a 2D plane, parts that are actually connected might appear separate:
$$
X_M \\xrightarrow{\\Pi} X_N
$$
X_M represents a connected structure in M dimensions (higher-dimensional space), while X_N shows how that same structure appears after being projected down to N dimensions (where M > N). the pi symbol represents this projection—like casting a shadow of a 3D object onto a 2D wall.

### the metric of understanding
the "distance" between two perspectives isn't rly a euclidean measure (like measuring with a straight ruler). instead, it's more like following the curve of the earth's surface—what we call a geodesic path. imagine walking on the surface of the earth—the shortest path between two points isn't a straight line through the earth, but the curved path along the surface:
$$
d_{\\text{true}}(p_1, p_2) \\leq d_{\\text{projected}}(p_1, p_2)
$$
the actual distance between viewpoints (d_true) is always shorter than what we perceive in our flattened view (d_projected).

### manifold learning
a manifold is any space that might curve or bend—like the surface of the earth, which looks flat locally but is globally curved. when we try to flatten these curved spaces (like making a flat map of earth), we inevitably create distortions:
$$
\\text{distortion} = \\sum (\\text{true distances} - \\text{flattened distances})^2
$$
this measures how much we're warping reality by simplifying it. every time we reduce something complex to something simpler, we pay a price in accuracy—like how no flat map can perfectly represent the globe.

`

export default function Page() {
  return <Blog title='the math of empathy' md={md} date='jan 16, 2025' />
}
