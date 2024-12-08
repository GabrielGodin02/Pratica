document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores de los campos del formulario de inicio de sesión
        const correo = loginForm.elements['correo'].value;
        const contrasena = loginForm.elements['contraseña'].value;

        // Obtener la lista de registros del almacenamiento local
        let registros = JSON.parse(localStorage.getItem('registros')) || [];

        // Buscar si hay un registro que coincida con el correo y contraseña
        const usuario = registros.find(registro => registro.correo === correo && registro.contrasena === contrasena);

        if (usuario) {
            // Si el usuario existe, mostrar mensaje de éxito
            alert('Inicio de sesión exitoso');
            // Aquí podrías redirigir a otra página o realizar alguna acción adicional
            window.location.href = "ingreso.html"; // Ejemplo de redirección
        } else {
            // Si el usuario no existe, mostrar mensaje de error
            alert('Correo o contraseña incorrectos');
        }

        // Limpiar el formulario
        loginForm.reset();
    });
});