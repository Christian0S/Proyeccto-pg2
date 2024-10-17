document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.avatar) {
        // Actualiza la imagen en el header
        const avatarImage = document.getElementById('avatar');
        if (avatarImage) {
            avatarImage.src = user.avatar;
        }
    }

    // Función para cargar y mostrar empleados en la tabla
    function cargarEmpleados() {
        const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
        const tablaEmpleados = document.getElementById('tablaEmpleados'); // Asegúrate de tener esta ID en tu HTML
        tablaEmpleados.innerHTML = ''; // Limpiar la tabla antes de cargar

        empleados.forEach(empleado => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${empleado.id}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.puesto}</td>
                <td>${empleado.salario}</td>
                <td>${empleado.creadoPor}</td>
                <td>
                    <a href="editar_empleado.html?id=${empleado.id}" class="button">Editar</a>
                    <button class="button eliminar" data-id="${empleado.id}">Eliminar</button>
                </td>
            `;
            tablaEmpleados.appendChild(fila);
        });

        // Agregar evento de eliminar para los botones de eliminación
        const botonesEliminar = document.querySelectorAll('.eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                eliminarEmpleado(id);
            });
        });
    }

    // Función para eliminar un empleado
    function eliminarEmpleado(id) {
        let empleados = JSON.parse(localStorage.getItem('empleados')) || [];
        empleados = empleados.filter(emp => emp.id != id);
        localStorage.setItem('empleados', JSON.stringify(empleados));
        alert('Empleado eliminado con éxito.');
        cargarEmpleados(); // Recargar la lista de empleados
    }

    cargarEmpleados(); // Cargar los empleados al inicio
});
