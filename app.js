
let newServiceWorker;

window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js").then((registration)=>{
        registration.addEventListener('updatefound',()=>{
            newServiceWorker=registration.installing;
            newServiceWorker.addEventListener('statechange', ()=>{
                //if , switch
                switch(newServiceWorker.state){
                    case 'installed':
                        //lanzar snackbar
                        ShowSanckBar();
                        break;
                        default:
                            console.log('Unknown');
                        break;
                }
            })
    })
}).catch((err)=>{
        console.log("data error =>"+err);
    })

})
function ShowSanckBar (){
    var  x= document.getElementById('snackbar');
    x.className='show';
}
document.getElementById('btn-update').addEventListener('click',()=>{
    newServiceWorker.postMessage({action:'skipWaiting'});
    window.location.reload();
    });