const url="https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=";

document.getElementById('btn_buscar').addEventListener('click',(e)=>{
let busqueda=document.getElementById('txt_receta').value;
if(busqueda!=''){
    
  let finalUrl=url+busqueda;
    fetch(finalUrl).then(response => response.json())
    .then(response => {
     let contendor=document.getElementById('contendor_recetas');
     contendor.innerHTML='';
     if(response.count>0){
         let recetas='';
        response.hits.forEach(hits => {
                let receta=hits.recipe;
            recetas+=`<div class="col-12 col-md-6 col-xl-4 mt-2">
            <div class="card h-100" >
                <img class="card-img-top " src="${receta.image}" alt="img receta">
                <div class="card-body">
                    <h6 class="">${receta.label}</h6>
                    <p class="text-bolder">Puntuación <span class="badge badge-pill badge-primary" > ${receta.yield}</span></p>
                    <a type="button" class="btn btn-outline-primary btn-block" href="${receta.url}">Ir ahora</a>
                 </div>
              </div>
            </div>`;
        });

        contendor.innerHTML=recetas;
        
     }else{
         contendor.innerHTML='<div class="col-12 text-center"><h1>No se encontrarón recetas</h1></div>'
     }

    })

}else{
    alert("Ingresa una palabra en la caja de busqueda")
}


});
