document.getElementById('editProfileBtn').addEventListener('click', function() {
    window.location.href = 'editar_perfil.html'; // Redirigir a la página de edición de perfil
});

document.getElementById('historyBtn').addEventListener('click', function() {
    window.location.href = 'historial.html'; // Redirigir a la página de historial
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    // Lógica para cerrar sesión
    localStorage.removeItem('currentUser'); // Eliminar el usuario actual del localStorage
    window.location.href = '../Index.html'; // Redirigir al inicio
});

// Función para mostrar notificaciones (ejemplo)
function showNotification(message) {
    const notificationMenu = document.getElementById('notificationMenu');
    const notificationItem = document.createElement('a');
    notificationItem.className = 'button';
    notificationItem.textContent = message;
    notificationMenu.appendChild(notificationItem);
}

// Llamada a la función de notificación (puedes ajustar esta parte)
showNotification('Una nueva cuenta ha sido creada y está pendiente de aceptación.');

document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.avatar) {
        // Actualiza la imagen en el header
        const avatarImage = document.getElementById('avatar');
        if (avatarImage) {
            avatarImage.src = user.avatar;
        }
    }
});

