
  var letra= document.getElementById('letra'); 
  var aciertos= document.getElementById('aciertos');
  var guiones;
  var anteriores ="";
  var ganar=false;
  
  // Leer ficheros del directorio seleccioando
  function SeleccionImagenes(evt) {
                       
    var files = evt.target.files; // FileList object
    // Bucle que recorre las imagenes obtenidos de la carpeta seleccionada.
    var columnas = 0;
    for (var i = 0, f; f = files[i]; i++) {


        // Si f no es de type image , no continua y vuelve al inicio del bucle(continue)
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Function(Clousure) que obtiene la información de cada archivo. la funcion 
        // se ejecuta al cargar (load) cada unop de los archivos seleccionadso
        
        reader.onload = (function (ElFichero) {
            return function (e) {
                // Render thumbnail.
               
              
                //ElFichero.name contiene el nombre de los ficheros seleccionados
                // e.target.result contiene el Data de la imagen,que asigándo el mismo
                // a la prpiedad src de un elemento html img, sevisualiza en el mismo
                var cadena = escape(ElFichero.name);
                var ppunto = cadena.indexOf(".");
                var nimagen = cadena.substring(0, ppunto)
                //  Creamos la 
                imm = document.createElement("img");

                imm.src = e.target.result;
                imm.alt = ElFichero.name;//Podemos guardar el nombre de la imagen  a adivinar 
                                         //en esta propiedad alt
                imm.title = nimagen;
                // Programamos en  evento clic sobre la imagen para jugar con ella
                imm.onclick = copiaPalabra;
                
                    document.getElementById('contenedorImagen').insertBefore(imm, null);
                }
                
            
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

document.getElementById('files').addEventListener('change', SeleccionImagenes, false);
aciertos.addEventListener("blur", copiaPalabra, false );
letra.addEventListener("keyup", buscarCaracter, false );


function copiaPalabra() {
    //   Gestionar la palabra a adivinar obtendia de la palabra pulsada
    var nombre= imm.title;
   // alert(nombre)
    guiones=nombre;
    guiones=guiones.replace(/[a-z]/gi,"-");
    aciertos.innerHTML=guiones;

   
}

function buscarCaracter(){
    var nombre= imm.title;

    if(letra==""){
        return
    }
    ;
    var palabraA =nombre.toUpperCase();
    var caracterBuscar=letra.value.toUpperCase();
    var posicion=palabraA.indexOf(caracterBuscar,0);
    var es_acierto=false;

    while(posicion > -1 & caracterBuscar!=""){
       // alert(guiones)
        guiones=guiones.substring(0,posicion) 
        +caracterBuscar 
        +guiones.substr(posicion+1,guiones.length);

        console.log(caracterBuscar);

        aciertos.innerHTML=guiones;

        posicion= palabraA.indexOf(caracterBuscar,posicion +1);
        es_acierto=true;

        if(guiones==palabraA){
            ganar=true;
        }
        
    }
    
    
  
    if(es_acierto==false){
    // alert(caracterBuscar)
        console.log(caracterBuscar);
        anteriores=anteriores+caracterBuscar;
        fallos.innerHTML =anteriores;
    // fallos.innerHTML =fallos.innerHTML+caracterBuscar;
    }

    if(ganar==true){
        alert("Has acertado la palabra");
    }
   
    letra.value="";
}