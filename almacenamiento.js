document.addEventListener('DOMContentLoaded', function() {
    const tabla = document.getElementById('tablaRegistros').getElementsByTagName('tbody')[0];

    // Recuperar los datos almacenados en localStorage
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    if (registros.length > 0) {
        registros.forEach(registro => {
            // Crear una nueva fila
            const nuevaFila = tabla.insertRow();

            // Insertar celdas en la fila
            const celdaIdent = nuevaFila.insertCell(0);
            const celdaNombres = nuevaFila.insertCell(1);
            const celdaApellidos = nuevaFila.insertCell(2);
            const celdaFecha = nuevaFila.insertCell(3);
            const celdaCorreo = nuevaFila.insertCell(4);

            // Asignar los valores a las celdas
            celdaNombres.textContent = registro.nombres;
            celdaApellidos.textContent = registro.apellidos;
            celdaIdent.textContent = registro.ident;
            celdaFecha.textContent = registro.fecha;
            celdaCorreo.textContent = registro.correo;
        });
    } else {
        // Mostrar mensaje si no hay registros
        const filaMensaje = tabla.insertRow();
        const celdaMensaje = filaMensaje.insertCell(0);
        celdaMensaje.colSpan = 5;
        celdaMensaje.textContent = 'No hay registros almacenados.';
        celdaMensaje.style.textAlign = 'center'; /* Centrar el texto */
        celdaMensaje.style.padding = '20px'; /* Relleno interno */
    }
});