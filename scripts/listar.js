//Función para cargar todos los beyblades
function cargarBeys(){
    const contenido = document.getElementById("beys");
    //GET para todos los beyblades
    fetch("http://localhost:3000/beyblades")
    .then(response => response.json())
    .then(response=>{
        let beyblades="";
        let type="";
        response.beys.forEach(bey => {
            if(bey.type === "Ataque"){
                type = "attack";
            }else if(bey.type === "Defensa"){
                type = "defense";
            }else if(bey.type === "Resistencia"){
                type = "stamina";
            }else if(bey.type === "Equilibrio"){
                type = "balance";
            }else{
                type = "";
            }    
            //Creación de un elemento HTML por bey     
            beyblades+=`<div class="bey ${type}">
                <p class="beyname ${type}">${bey.name}</p>
                <img src="http://localhost:3000/static/images/${bey.image}" alt="beyblade" class="beyimg">
                <button id="${bey._id}" class="btn ${type}">Ver Beyblade</button>
            </div>`
        });
        //Creación del botón para añadir beyblade
        beyblades+=`<div class="bey new" id="crearBey">
        <h1 class="add">+</h1>
        </div>`
        //Carga de elementos en el HTML
        contenido.innerHTML=beyblades;
        asignarDetalle();
    })
    .catch(err => console.error(err));
}
//Función para asignar acciones a los botones
function asignarDetalle(){
    //Boton para añadir nuevo beyblade
    const crear = document.getElementById("crearBey");
    crear.addEventListener('click', function(){
        window.location.href = 'nuevo.html';
    });
    //Botones para ir a detalles del beyblade
    fetch("http://localhost:3000/beyblades")
    .then(response => response.json())
    .then(response=>{
        response.beys.forEach(bey => {
            document.getElementById(bey._id).addEventListener('click', function () {
                window.location.href = 'detalle.html?id=' + bey._id;
                });
        });
    })
    .catch(err => console.error(err));
}
