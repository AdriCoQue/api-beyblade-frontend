//Función para editar beyblade
function cargarBey(){
    //Obtener id
    const urlParams = new URLSearchParams(window.location.search);
    const beyId = urlParams.get("id");
    const detail = document.getElementById("detalleBey");
    //Obtener datos
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
        //Cargar formulario HTML para editar datos         
        beyblade+=`
        <form action="" class="addbey" id="modBeyblade" enctype="multipart/form-data">
        <input type="text" name="name" id="name" class="beyname" placeholder="${response.name}">
        <img src="http://localhost:3000/static/images/${response.image}" alt="beyblade" class="beyimg">
            <div class="inciso" id="altname">
                <label for="" class="campo">También llamado: </label>
                <input type="text" name="jpname" id="altname" class="texto" placeholder="${response.jpname}">
            </div>
            <div class="inciso">
                <label for="" class="campo">Tipo: </label>
                <select name="type" id="type" class="selects">
                    <option value="">${response.type}</option>
                    <option value="Ataque">Ataque</option>
                    <option value="Defensa">Defensa</option>
                    <option value="Resistencia">Resistencia</option>
                    <option value="Equilibrio">Equilibrio</option>
                </select>
            </div>
            <div class="inciso">
                <label for="" class="campo">Giro: </label>
                <select name="spin" id="spin" class="selects">
                    <option value="">${response.spin}</option>
                    <option value="Derecha">Derecha</option>
                    <option value="Izquierda">Izquierda</option>
                    <option value="Izquierda/Derecha">Izquierda/Derecha</option>
                </select>
            </div>
            <div class="inciso">
                <label for="" class="campo">Series: </label><select name="series" id="series" class="selects">
                    <option value="">${response.series}</option>
                    <option value="Beyblade Bakuten Shoot">Beyblade Bakuten Shoot</option>
                    <option value="Beyblade V-Force">Beyblade V-Force</option>
                    <option value="Beyblade G-Recolution">Beyblade G-Recolution</option>
                    <option value="Beyblade Metal Fusion">Beyblade Metal Fusion</option>
                    <option value="Beyblade Metal Maters">Beyblade Metal Maters</option>
                    <option value="Beyblade Metal Fury">Beyblade Metal Fury</option>
                    <option value="Beyblade Shogun Steel">Beyblade Shogun Steel</option>
                    <option value="Beyblade Burst">Beyblade Burst</option>
                    <option value="Beyblade Burst Evolution">Beyblade Burst Evolution</option>
                    <option value="Beyblade Burst Turbo">Beyblade Burst Turbo</option>
                    <option value="Beyblade Burst Rise">Beyblade Burst Rise</option>
                    <option value="Beyblade Burst Surge">Beyblade Burst Surge</option>
                    <option value="Beyblade Burst Dynamite Battle">Beyblade Burst Dynamite Battle</option>
                    <option value="Beyblade X">Beyblade X</option>
                </select>
            </div>
            <div class="inciso">
                <label for="" class="campo">Sistema: </label><select name="system" id="system" class="selects">
                    <option value="">${response.system}</option>
                    <option value="Spin Gear">Spin Gear</option>
                    <option value="Magnacore">Magnacore</option>
                    <option value="Engine Gear">Engine Gear</option>
                    <option value="Hard Metal">Hard Metal</option>
                    <option value="Metal">Metal</option>
                    <option value="Hybrid Wheel">Hybrid Wheel</option>
                    <option value="4D">4D</option>
                    <option value="Synchrome">Synchrome</option>
                    <option value="Dual Layer (Burst)">Dual Layer (Burst)</option>
                    <option value="God (Burst)">God (Burst)</option>
                    <option value="Cho-Z (Burst)">Cho-Z (Burst)</option>
                    <option value="Gatinko (Burst)">Gatinko (Burst)</option>
                    <option value="Superking (Burst)">Superking (Burst)</option>
                    <option value="Dynamite Battle (Burst)">Dynamite Battle (Burst)</option>
                    <option value="Burst Ultimate">Burst Ultimate</option>
                    <option value="Xtreme Gear Sports">Xtreme Gear Sports</option>
                </select>
            </div>
            <div class="inciso">
                <label for="" class="campo">Blader: </label>
                <input type="text" name="blader" id="blader" class="texto" placeholder="${response.blader}">
            </div>
            <div class="inciso">
                <label for="" class="campo">Imagen: </label>
                <input type="file" name="image" id="image" class="files" accept="image/*">
            </div>
        </form>`
        detail.innerHTML=beyblade;
        agregarBotones(beyId)
    })
}
//Añadir botones
function agregarBotones(beyId) {
    const botones = document.getElementById("buttons");
    let btns = "";
    btns += `<a href="index.html" class="btn back">Volver</a>
    <button class="btn save" id="save" onclick="saveBey('${beyId}')">Guardar Cambios</button>`;
    botones.innerHTML = btns;
}
//Función para guardar
function saveBey(beyId){
    //Obtener datos del formulario
    const formulario = document.getElementById('modBeyblade');
    const formData = new FormData(formulario);
    const newName = formData.get('name');
    const newJpName = formData.get('jpname');
    const newType = formData.get('type');
    const newSpin = formData.get('spin');
    const newSeries = formData.get('series');
    const newSystem = formData.get('system');
    const newBlader = formData.get('blader');
    const newImage = formData.get('image');
    fetch(`http://localhost:3000/beyblades/${beyId}`)
    .then(response => response.json())
    .then(response=>{  
        const changes = new FormData();
        //Función para verificar que campos cambiaron
        const addChange = (fieldName, newValue) => {
            if (newValue !== response[fieldName] && newValue.trim() !== '') {
                changes.append(fieldName, newValue);
            }
        };
        addChange('name', newName);
        addChange('jpname', newJpName);
        addChange('type', newType);
        addChange('spin', newSpin);
        addChange('series', newSeries);
        addChange('system', newSystem);
        addChange('blader', newBlader);
        if (newImage) {
            changes.append('image', newImage);
        }
        //Realizar PATCH únicamente con datos que cambiaron
            fetch(`http://localhost:3000/beyblades/${beyId}`, {
                method: 'PATCH',
                body: changes,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al realizar la solicitud PATCH: ${response.statusText}`);
                }
                console.log('Elemento actualizado con éxito');
                console.log(changes);
                window.location.href = 'index.html';
            })
            .catch(error => console.error('Error:', error));
    })
}