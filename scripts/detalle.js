function cargarBey(){
    const urlParams = new URLSearchParams(window.location.search);
    const beyId = urlParams.get("id");
    const detail = document.getElementById("detalleBey");

    fetch(`http://localhost:3000/beyblades/${beyId}`)
    .then(response => response.json())
    .then(response=>{
        let beyblade="";
        if(response.type === "Ataque"){
            type = "attack";
        }else if(response.type === "Defensa"){
            type = "defense";
        }else if(response.type === "Resistencia"){
            type = "stamina";
        }else if(response.type === "Equilibrio"){
            type = "balance";
        }else{
            type = "";
        }         
        beyblade+=`<h1 class="beyname ${type}">${response.name}</h1>
        <img src="http://localhost:3000/static/images/${response.image}" alt="beyblade" class="beyimg">
            <div class="data">
                <h1 class="altbeyname">Tambien llamado: ${response.jpname}</h1>
                <h1 class="tipo">Tipo: ${response.type}</h1>
                <h1 class="giro">Giro: ${response.spin}</h1>
                <h1 class="series"> Series: ${response.series}</h1>
                <h1 class="sistema">Sistema: ${response.system}</h1>
                <h1 class="blader">Usado por: ${response.blader}</h1>
            </div>`
        detail.innerHTML=beyblade;
        agregarBotones(beyId)
    })
}
function agregarBotones(beyId) {
    const botones = document.getElementById('buttons');
    let btns = "";
    btns += `<a href="index.html" class="btn back">Volver</a>
    <button class="btn edit" id="mod">Editar Bey</button>
    <button class="btn delete" onclick="deleteBey('${beyId}')">Eliminar</button>`;
    botones.innerHTML = btns;
    document.getElementById("mod").addEventListener("click", function () {
        window.location.href = 'editar.html?id=' + beyId;
    });
}

function deleteBey(beyId) {
    fetch(`http://localhost:3000/beyblades/${beyId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al realizar la solicitud DELETE: ${response.statusText}`);
            }
            console.log('Elemento eliminado con éxito');
            window.location.href = "index.html";
        })
        .catch(error => console.error('Error:', error));
}