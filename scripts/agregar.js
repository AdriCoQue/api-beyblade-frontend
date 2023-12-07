function addBey() {
    const formulario = document.getElementById('nuevoBeyblade');
    const formData = new FormData(formulario);
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