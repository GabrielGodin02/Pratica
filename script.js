document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores de los campos del formulario
        const nombres = form.elements['nombres'].value;
        const apellidos = form.elements['apellidos'].value;
        const ident = form.elements['ident'].value;
        const fecha = form.elements['fecha'].value;
        const correo = form.elements['correo'].value;
        const contrasena = form.elements['contraseña'].value;

        // Crear un objeto con los datos del formulario
        const registro = {
            nombres,
            apellidos,
            ident,
            fecha,
            correo,
            contrasena
        };

        // Obtener la lista de registros del almacenamiento local
        let registros = JSON.parse(localStorage.getItem('registros')) || [];

        // Añadir el nuevo registro a la lista
        registros.push(registro);

        // Guardar la lista actualizada en el almacenamiento local
        localStorage.setItem('registros', JSON.stringify(registros));

        // Confirmación de guardado
        alert('Registro guardado con éxito');
        
        // Limpiar el formulario
        form.reset();
    });
});