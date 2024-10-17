document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.avatar) {
        // Actualiza la imagen en el header
        const avatarImage = document.getElementById('avatar');
        if (avatarImage) {
            avatarImage.src = user.avatar;
        }
    }

    // Lógica para crear un nuevo empleado
    document.getElementById('crearEmpleadoBtn').addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value;
        const puesto = document.getElementById('puesto').value;
        const salario = document.getElementById('salario').value;
        
        if (nombre && puesto && salario) {
            const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
            const nuevoEmpleado = {
                id: empleados.length + 1,
                nombre,
                puesto,
                salario,
                creadoPor: user.nombre // Guarda el nombre del creador
            };
            empleados.push(nuevoEmpleado);
            localStorage.setItem('empleados', JSON.stringify(empleados));
            alert('Empleado creado con éxito.');
            window.location.href = 'empleados.html'; // Redirigir a la lista de empleados
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});
