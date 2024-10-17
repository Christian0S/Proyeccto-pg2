document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.avatar) {
        // Update the avatar image in the header
        const avatarImage = document.getElementById('avatar');
        if (avatarImage) {
            avatarImage.src = user.avatar;
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const empleadoId = urlParams.get('id'); // Get employee ID from the URL
    const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
    const empleado = empleados.find(emp => emp.id == empleadoId);

    if (empleado) {
        // Populate the form with employee data
        document.getElementById('nombre').value = empleado.nombre;
        document.getElementById('apellidos').value = empleado.apellidos;
        document.getElementById('cargo').value = empleado.cargo;
        document.getElementById('antecedentes').value = empleado.antecedentes || '';

        // Display who created the employee and when
        document.getElementById('modifiedBy').textContent = empleado.creadoPor || 'Desconocido';
        document.getElementById('modificationDate').textContent = empleado.fechaCreacion || 'Fecha no disponible';

        // Edit employee logic
        document.getElementById('editEmployeeForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Update employee data
            empleado.nombre = document.getElementById('nombre').value;
            empleado.apellidos = document.getElementById('apellidos').value;
            empleado.cargo = document.getElementById('cargo').value;
            empleado.antecedentes = document.getElementById('antecedentes').value;

            // Keep creator information intact
            empleado.creadoPor = empleado.creadoPor || user.nombre; // Use the stored creator or the current user if creating
            empleado.fechaCreacion = empleado.fechaCreacion || new Date().toLocaleDateString(); // Only set if not already set

            // Save the updated employees list back to localStorage
            localStorage.setItem('empleados', JSON.stringify(empleados));
            alert('Empleado editado con éxito.');

            window.location.href = 'empleados.html'; // Redirect to employee list page
        });
    } else {
        alert('Empleado no encontrado.');
    }
});
