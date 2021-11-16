const staticCache = "staticCache-v1";
const dynamicCache="dynamicCache-v1";
const inmutableCache="inmutableCache-v1";


self.addEventListener("install", installEvent => {
    const assets = [
        "/",
        "/index.html",
        "/style.css",
        "/app.js",
        "/recetas.js"
      ];
      const inmutableAssets=[
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
            'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
      ]



      const static_cache=caches.open(staticCache).then(cache => {
        return cache.addAll(assets);
      }).catch(error => {
        console.log(error);
      });
      const inmutable_cache=caches.open(inmutableCache).then(cache => {
        return cache.addAll(inmutableAssets);
      }).catch(error => {
        console.log(error);
      });
    installEvent.waitUntil(
    Promise.all([static_cache,inmutable_cache])
    );
});



self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cachesList  => Promise.all (
        cachesList.map(cacheName => {
          if(staticCache!=cacheName && inmutableCache!=cacheName) {
            return caches.delete(cacheName);
          }
        })
    )).then(() => {
      console.log('v2 now ready to handle fetches');
    })
    );
  })


  self.addEventListener('fetch', event=>{
    const res = caches.match(event.request)
    .then((param) => {
      return param ? param : fetch(event.request).then(fetchResponse=>{
        caches.open(dynamicCache).then(cache=>{
          cache.put(event.request,fetchResponse.clone());
           return fetchResponse;
        })
      });
    })
    .catch((error) => {
      console.log(error); 
    });
    event.respondWith(res);
  });

  self.addEventListener('message',object=>{
    if(object.data.action=='skipWaiting'){
      self.skipWaiting(); 
    }
  })