if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const t=e=>a(e,c),d={module:{uri:c},exports:r,require:t};s[c]=Promise.all(i.map((e=>d[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/JetBrainsMonoNerdFontMono-Regular.ttf",revision:"a1d4c3e26f216c7486041badf046bdab"},{url:"/Satoshi-Light.otf",revision:"d1d1eaba7a325545089fa9d773459211"},{url:"/Satoshi-Medium.otf",revision:"378def5c1f4df7eb6554a88608893391"},{url:"/_next/static/Xu8OQx9B4FYK2qUV0Aek4/_buildManifest.js",revision:"d8963c6657102db1f2fa51dc81a43a6f"},{url:"/_next/static/Xu8OQx9B4FYK2qUV0Aek4/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0c4b6b70-33d394da03907b27.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/250-0d31900d83b47bad.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/450-ae1b68e012114549.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/468-db439d1a971ec1a8.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/484.1e242c8bc1565ee0.js",revision:"1e242c8bc1565ee0"},{url:"/_next/static/chunks/525-30f517e6f9689e32.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/568-28efeb2ccf7c7a8c.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/599-77178e1fe21ab2e4.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/685-11799fc30ffa92b0.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/753.ed6faa4d5f5196e0.js",revision:"ed6faa4d5f5196e0"},{url:"/_next/static/chunks/89-b6b748a3ef24c11e.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/950-122aedeb4242dc95.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/963.66354cfbf82fdd54.js",revision:"66354cfbf82fdd54"},{url:"/_next/static/chunks/991-e20729e6e84933e2.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/9da6db1e-fb24dcac22d45ba6.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/a3cd4a83-8b5ea032da8fb2f3.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/app/(game)/actor.onnx",revision:"f58b296951b5a53093e96e45477a1959"},{url:"/_next/static/chunks/app/(game)/actorlvl2.onnx",revision:"bdd24c3e7921ed81152f4e3fa28c7e89"},{url:"/_next/static/chunks/app/(ppo)/layout-e44dfdb749ab53d3.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/app/(ppo)/ppo/page-73584e2aec94b19a.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/app/cfg-and-recursive-descent-parser/page-35d20ed883289323.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/app/layout-4d4b60e790bf5eca.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/app/lexer-in-zig/page-202ca8b6fe267a6b.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/app/not-found-7383523864c951b9.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/app/page-73e185b59c9aba43.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/b536a0f1-7f500fa923ecad2d.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/d3ac728e-3d95299c7576b295.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/fd9d1056-520484c4d94529a0.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/framework-17a16e22058948a9.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/main-app-36b92f3767f7ccd2.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/main-f8578071ce470ae0.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/pages/_app-d21e88acd55d90f1.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/pages/_error-d6107f1aac0c574c.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-77923cc46fb97242.js",revision:"Xu8OQx9B4FYK2qUV0Aek4"},{url:"/_next/static/css/72fc36b129e73d10.css",revision:"72fc36b129e73d10"},{url:"/assets/dqn.png",revision:"3c7be547b35af3acc87d204b6e76e83a"},{url:"/assets/dqnalgorithnm.png",revision:"ce15d2bd9230ef5a8fe81affa5194482"},{url:"/assets/qlearningalgorithm.png",revision:"7416646326e39f9dede2cf8ce98ac057"},{url:"/assets/qtable.png",revision:"a9726a0116c13abaa06dd17111715671"},{url:"/assets/reinforce.png",revision:"0a2830d14c7cdcf556baa3debaccfa2c"},{url:"/assets/reinforcealgorithm.png",revision:"e47690989eaa7d0cfb30305aae9fe360"},{url:"/assets/reinforceoptimize.png",revision:"84592a8a30908e79578c344f852f0e87"},{url:"/bunny.png",revision:"cc2a085e4fc17cafc017c7776b4646f8"},{url:"/bunnycard.png",revision:"38f79bb04a9dd392203ffe0342cb5c39"},{url:"/bunnycard.webp",revision:"658fddbc9049d6df8bcb2abd052656fd"},{url:"/bunnypfp.png",revision:"9922821bcd8ea1c509efea168b9245a6"},{url:"/bunnyupclose.png",revision:"38f79bb04a9dd392203ffe0342cb5c39"},{url:"/coin.webp",revision:"bde434ac645c68e813ee90704ca83773"},{url:"/coolmatcap.png",revision:"9e3fe4917eb4c4b8fc1a44ff8ee7c2e1"},{url:"/defaultdisplacement.png",revision:"75db99b125fe4e9afbe58696320bea73"},{url:"/favicon.ico",revision:"7a3d6c48553b7032eca2e28f6a8de5df"},{url:"/helvetiker_regular.typeface.json",revision:"73827a618c7eb2d2792b1d08b3329e97"},{url:"/jsbridge.jpg",revision:"225ffe4a956501de10f46518fe6a6d3f"},{url:"/krypton.json",revision:"8264591c5fad21499e7bb2d91118588d"},{url:"/krypton.otf",revision:"8b71aedc00d9b15379bf7de976571291"},{url:"/legoheart.png",revision:"012648b360d3ba5cdb71cdb558edc3d1"},{url:"/legoheartold.png",revision:"b7e09332af6318bd0bce00b4e06afab7"},{url:"/manifest.json",revision:"bc6ca85c72b588c2f76ce840026e9800"},{url:"/model.json",revision:"b8f28445b804df8b10d0d9303511694b"},{url:"/model.json.weights.bin",revision:"f62817cdc58ce80d2d0101825e55b64b"},{url:"/model/actor.onnx",revision:"f58b296951b5a53093e96e45477a1959"},{url:"/model/actorlvl2.onnx",revision:"bdd24c3e7921ed81152f4e3fa28c7e89"},{url:"/model/ort-wasm-simd.wasm",revision:"27a8292511e77fc50ced64326875ca4a"},{url:"/model/ort-wasm.wasm",revision:"88cb0475e8c4228b29dd201646223f0c"},{url:"/models/arrow.glb",revision:"0e1435d69f67854e74bea2174030ce46"},{url:"/models/bear.glb",revision:"707d2adbdd2ec4a2aec0d4c1d74627ba"},{url:"/models/bomb.glb",revision:"ee50659cf7396dcfacffc92598625e86"},{url:"/models/bunny.glb",revision:"e5671a2e391fc70ef8c06d8460b74eaf"},{url:"/models/cat.glb",revision:"5115101a7cdce4804dba8432fcf676a8"},{url:"/models/clonebunny.glb",revision:"2887a2ee4a4bf3dda80ef471c1534df9"},{url:"/models/cow.glb",revision:"38b184148f1a7ed4de58a189b6ab01c0"},{url:"/models/crocodile.glb",revision:"f373c76408d5a1b3109380bf6c340fe4"},{url:"/models/dog.glb",revision:"2c3b3178090501902d4414cd6b5d45b5"},{url:"/models/duck.glb",revision:"7c6431b6bccb703a690a2ec16d725fd9"},{url:"/models/femalechicken.glb",revision:"d4887d580e6bd2e324c740ffbef85cfd"},{url:"/models/glass.glb",revision:"2afab963e56383611fca7c9e0b9ac8de"},{url:"/models/glassbucket.glb",revision:"6e0c7ef9b112ba7820361d94b172effc"},{url:"/models/heart.glb",revision:"b0e6b9505998fab1fc2dbb7a4e5e513d"},{url:"/models/malechicken.glb",revision:"7ff51e0b025153e1d28bd82cd58cd49f"},{url:"/models/penguin.glb",revision:"68e0c983fe9ab8997250b5241f1ba33f"},{url:"/models/skull.glb",revision:"11eeee2324b14fa92aafb69a2777a349"},{url:"/models/zigv8.glb",revision:"4f1ea617466afee1c1631932e7a78a11"},{url:"/models/zigv8.gltf",revision:"529a45649729d0cdfd051f7ead99bbc4"},{url:"/petergriffin.gif",revision:"333191b5106055ef959ccf860dce0b6c"},{url:"/ppo-dark.png",revision:"5f7390c5442c5cde618fe149da442eb8"},{url:"/ppo-light.png",revision:"5f580a43493ebf5a78310f757e672302"},{url:"/roboto.json",revision:"cfde6acd51bd645bf7eddd4a85cbdb90"},{url:"/robots.txt",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/sam.png",revision:"de50070fb79fbefd6e696d3d7c7245f0"},{url:"/superposition.png",revision:"7394d023ee2c3fc4f6ec583532fd39c6"},{url:"/textures/Spidververse2_MatCap.png",revision:"27d2793c0c83196c6c81d803ff861042"},{url:"/textures/Spidververse2_MatCap.tif",revision:"a526677a6874dc351467a61b41e5b685"},{url:"/textures/matcapblack.png",revision:"834abd9ecf2f710c749e4a81d63d5aab"},{url:"/textures/redmatcap.png",revision:"06cd20b6b37a4af3ced088da0d35ae99"},{url:"/textures/toonmatcap.jpeg",revision:"c2073b5feeaea587b8b62e6945322d82"},{url:"/thinking.jpg",revision:"5d4f5b65a62f43d1880bb36df26e8d0c"},{url:"/yann.jpeg",revision:"b978ab0c348af3d383cb899131ed5819"},{url:"/zigmatcap.png",revision:"17cc172c5f98c345bb1ffd7f7a28727e"},{url:"/zigmatcap.png:Zone.Identifier",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/zigmatcap2.png",revision:"853918a3493eb7f86f5bdc5e2cd13c66"},{url:"/zigmatcap2.png:Zone.Identifier",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/zigmatcap3.png",revision:"834abd9ecf2f710c749e4a81d63d5aab"},{url:"/zigmatcap3.png:Zone.Identifier",revision:"d41d8cd98f00b204e9800998ecf8427e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
