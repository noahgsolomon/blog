if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const t=e=>a(e,c),d={module:{uri:c},exports:r,require:t};s[c]=Promise.all(i.map((e=>d[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Satoshi-Light.otf",revision:"d1d1eaba7a325545089fa9d773459211"},{url:"/Satoshi-Medium.otf",revision:"378def5c1f4df7eb6554a88608893391"},{url:"/_next/static/chunks/0c4b6b70-26bcf7c333e892ba.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/0e5ce63c-9535d6a10cdb92bb.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/12-5da4cfa1ddd54104.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/122.fe83d29d00fda95e.js",revision:"fe83d29d00fda95e"},{url:"/_next/static/chunks/231.45482c88410f529b.js",revision:"45482c88410f529b"},{url:"/_next/static/chunks/246-d722097821d664c7.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/333-662c91a2ff75c6b4.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/468-886a6ff3396aeaf2.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/500.1a367681c49f24ab.js",revision:"1a367681c49f24ab"},{url:"/_next/static/chunks/618-cac294466ab742fd.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/683-8003435a1f5e0f05.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/685-1cdb6fc38e3878d2.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/756-5bab3abf21b9aeaf.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/app/(game)/actor.onnx",revision:"f58b296951b5a53093e96e45477a1959"},{url:"/_next/static/chunks/app/(game)/actorlvl2.onnx",revision:"bdd24c3e7921ed81152f4e3fa28c7e89"},{url:"/_next/static/chunks/app/_not-found-da8e6d8632f6bee6.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/app/layout-7bbdd26c7bc20a68.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/app/page-aed747095d859216.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/app/ppo/page-ece5b57ca4059646.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/b536a0f1-6e326cc3ad71ee84.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/d3ac728e-7a430af9635359bc.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/e16086ba-70d6d397e771e3e7.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/fd9d1056-f5dd263ee94ae4a9.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/framework-6a5fbe53cde9e80c.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/main-app-b6e760fe0a25c79f.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/main-ed016905e0a3ced7.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-eb35ea184f9edcf4.js",revision:"kwq97HrkIYslg7DVbYiTf"},{url:"/_next/static/css/27480dbc37bc0f65.css",revision:"27480dbc37bc0f65"},{url:"/_next/static/kwq97HrkIYslg7DVbYiTf/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/kwq97HrkIYslg7DVbYiTf/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/65c45678397a3c14-s.p.otf",revision:"8b71aedc00d9b15379bf7de976571291"},{url:"/_next/static/media/krypton.65c45678.otf",revision:"65c45678"},{url:"/bunny.png",revision:"cc2a085e4fc17cafc017c7776b4646f8"},{url:"/bunnycard.png",revision:"38f79bb04a9dd392203ffe0342cb5c39"},{url:"/bunnycard.webp",revision:"658fddbc9049d6df8bcb2abd052656fd"},{url:"/bunnypfp.png",revision:"9922821bcd8ea1c509efea168b9245a6"},{url:"/bunnyupclose.png",revision:"38f79bb04a9dd392203ffe0342cb5c39"},{url:"/coin.webp",revision:"bde434ac645c68e813ee90704ca83773"},{url:"/coolmatcap.png",revision:"9e3fe4917eb4c4b8fc1a44ff8ee7c2e1"},{url:"/defaultdisplacement.png",revision:"75db99b125fe4e9afbe58696320bea73"},{url:"/favicon.ico",revision:"7a3d6c48553b7032eca2e28f6a8de5df"},{url:"/helvetiker_regular.typeface.json",revision:"73827a618c7eb2d2792b1d08b3329e97"},{url:"/krypton.json",revision:"8264591c5fad21499e7bb2d91118588d"},{url:"/krypton.otf",revision:"8b71aedc00d9b15379bf7de976571291"},{url:"/legoheart.png",revision:"012648b360d3ba5cdb71cdb558edc3d1"},{url:"/legoheartold.png",revision:"b7e09332af6318bd0bce00b4e06afab7"},{url:"/manifest.json",revision:"bc6ca85c72b588c2f76ce840026e9800"},{url:"/model.json",revision:"b8f28445b804df8b10d0d9303511694b"},{url:"/model.json.weights.bin",revision:"f62817cdc58ce80d2d0101825e55b64b"},{url:"/model/actor.onnx",revision:"f58b296951b5a53093e96e45477a1959"},{url:"/model/actorlvl2.onnx",revision:"bdd24c3e7921ed81152f4e3fa28c7e89"},{url:"/model/ort-wasm-simd.wasm",revision:"27a8292511e77fc50ced64326875ca4a"},{url:"/model/ort-wasm.wasm",revision:"88cb0475e8c4228b29dd201646223f0c"},{url:"/models/bear.glb",revision:"707d2adbdd2ec4a2aec0d4c1d74627ba"},{url:"/models/bomb.glb",revision:"ee50659cf7396dcfacffc92598625e86"},{url:"/models/bunny.glb",revision:"e5671a2e391fc70ef8c06d8460b74eaf"},{url:"/models/cat.glb",revision:"5115101a7cdce4804dba8432fcf676a8"},{url:"/models/clonebunny.glb",revision:"2887a2ee4a4bf3dda80ef471c1534df9"},{url:"/models/crocodile.glb",revision:"f373c76408d5a1b3109380bf6c340fe4"},{url:"/models/dog.glb",revision:"2c3b3178090501902d4414cd6b5d45b5"},{url:"/models/duck.glb",revision:"7c6431b6bccb703a690a2ec16d725fd9"},{url:"/models/femalechicken.glb",revision:"d4887d580e6bd2e324c740ffbef85cfd"},{url:"/models/glass.glb",revision:"2afab963e56383611fca7c9e0b9ac8de"},{url:"/models/glassbucket.glb",revision:"6e0c7ef9b112ba7820361d94b172effc"},{url:"/models/heart.glb",revision:"b0e6b9505998fab1fc2dbb7a4e5e513d"},{url:"/models/malechicken.glb",revision:"7ff51e0b025153e1d28bd82cd58cd49f"},{url:"/models/penguin.glb",revision:"68e0c983fe9ab8997250b5241f1ba33f"},{url:"/models/skull.glb",revision:"11eeee2324b14fa92aafb69a2777a349"},{url:"/roboto.json",revision:"cfde6acd51bd645bf7eddd4a85cbdb90"},{url:"/robots.txt",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/sam.png",revision:"de50070fb79fbefd6e696d3d7c7245f0"},{url:"/textures/Spidververse2_MatCap.png",revision:"27d2793c0c83196c6c81d803ff861042"},{url:"/textures/Spidververse2_MatCap.tif",revision:"a526677a6874dc351467a61b41e5b685"},{url:"/textures/matcapblack.png",revision:"834abd9ecf2f710c749e4a81d63d5aab"},{url:"/textures/redmatcap.png",revision:"06cd20b6b37a4af3ced088da0d35ae99"},{url:"/textures/toonmatcap.jpeg",revision:"c2073b5feeaea587b8b62e6945322d82"},{url:"/yann.jpeg",revision:"b978ab0c348af3d383cb899131ed5819"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
