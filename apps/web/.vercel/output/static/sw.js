/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-9637eeee'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "_app/immutable/assets/_layout.CQRWw0ts.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/_layout.wEX3nLAr.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/0.wEX3nLAr.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/2.CQRWw0ts.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/Footer.BE6Vk0ma.css",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/6.-LS5Hydt.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/each.DtwpW6cy.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/entry.C_O7o2gS.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/Footer.svelte_svelte_type_style_lang.CDznny2Y.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/general.Z1BHvWxg.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/i18n-util.CuBES_s3.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/i18n.aQXWC8hQ.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.BSTUT0d9.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.M_k6ra4C.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.vMZz7VXH.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/paths.DKdZnm7Y.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/scheduler.B3kXyu8W.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/spread.CgU5AtxT.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/stores.Dq3yG_9G.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.CwfkugVM.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.C05fi5Uq.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.CvCz8Aif.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.CaLcnQ3J.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.Dm_LKtiF.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.CaLcnQ3J.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/4.CaLcnQ3J.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/5.DMyJehQr.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/7.DUY9MF4u.js",
    "revision": null
  }, {
    "url": "anno-logo.svg",
    "revision": "50674ad5279d3716278c6e3ffb222449"
  }, {
    "url": "apple-icon-180.png",
    "revision": "53088808e63780b554817c62faf0308a"
  }, {
    "url": "favicon-196.png",
    "revision": "dbef66d0a16aa96f33889821cb54ec96"
  }, {
    "url": "manifest-icon-192.maskable.png",
    "revision": "c7d8bda579a44bd15693bf5d75cc82db"
  }, {
    "url": "manifest-icon-512.maskable.png",
    "revision": "fdd1abbd060bf2e6cd731316e71fe87d"
  }, {
    "url": "mstile-icon-128.png",
    "revision": "dcb8d9988a5b3d3a46ab197f9149a8bc"
  }, {
    "url": "mstile-icon-270.png",
    "revision": "f16182d5789e0742d1dc8a18fbb5a00d"
  }, {
    "url": "mstile-icon-558-270.png",
    "revision": "cbe315ca9ec50336a9f70830f72dd782"
  }, {
    "url": "mstile-icon-558.png",
    "revision": "9e6d384fc3d4d8c21180540ec771be8b"
  }, {
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "manifest.webmanifest",
    "revision": "d0238827750dbb3c3172347d406102aa"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/")));

}));
