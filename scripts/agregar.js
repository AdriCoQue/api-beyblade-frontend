//Función para agregar un beyblade
function addBey() {
    //Obtener datos del fomrulario HTML
    const formulario = document.getElementById('nuevoBeyblade');
    const formData = new FormData(formulario);
    //POST de los datos como form-encoded
    fetch('http://localhost:3000/beyblades', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        window.location.href="index.html"
    })
    .catch(error => console.error('Error:', error));
}