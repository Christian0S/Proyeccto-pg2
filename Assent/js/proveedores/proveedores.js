let providers = [];

// Cargar datos de un archivo JSON al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetch('/JSONs/proveedores.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos cargados:', data); // Verifica si los datos se cargan
            providers = data; // Asigna los datos cargados al array de proveedores
            localStorage.setItem('providers', JSON.stringify(providers)); // Guarda en localStorage
            renderProviders(); // Renderiza los proveedores en la tabla
        })
        .catch(error => {
            console.error('Hubo un problema con la carga del JSON:', error);
            const storedProviders = localStorage.getItem('providers');
            if (storedProviders) {
                providers = JSON.parse(storedProviders);
                console.log('Datos cargados desde localStorage:', providers); // Verifica si los datos del localStorage se cargan
                renderProviders();
            } else {
                console.log('No se encontraron datos en localStorage.');
            }
        });
});

// Renderizar proveedores en la tabla
function renderProviders() {
    const providerBody = document.getElementById('providerBody');

    // Si el elemento no existe, salimos de la función para evitar errores
    if (!providerBody) {
        console.error('Elemento con id "providerBody" no encontrado.');
        return;
    }

    providerBody.innerHTML = ''; // Limpiar tabla

    if (providers.length === 0) {
        providerBody.innerHTML = '<tr><td colspan="6">No hay proveedores disponibles.</td></tr>';
        return;
    }

    providers.forEach(provider => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${provider.id}</td>
            <td>${provider.email}</td>
            <td>${provider.nombre}</td>
            <td>${provider.productos}</td>
            <td>${provider.clasificacion}</td>
            <td>
                <button onclick="editProvider(${provider.id})">Editar</button>
                <button onclick="deleteProvider(${provider.id})">Eliminar</button>
                <button onclick="openChat(${provider.id})">Chat</button>
            </td>
        `;
        providerBody.appendChild(row);
    });
}

// Abrir chat con proveedor (función ejemplo)
function openChat(id) {
    const provider = providers.find(p => p.id === id);
    if (provider) {
        alert(`Abriendo chat con el proveedor: ${provider.nombre}`);
        // Aquí puedes implementar la lógica para abrir una ventana de chat
        // o redirigir a una página específica de chat.
    } else {
        console.error(`Proveedor con ID ${id} no encontrado.`);
    }
}
// Editar proveedor (implementación básica)
function editProvider(id) {
    const provider = providers.find(p => p.id === id);
    if (provider) {
        // Lógica de edición del proveedor (mostrar un formulario, etc.)
        alert(`Editando proveedor: ${provider.nombre}`);
    } else {
        console.error(`Proveedor con ID ${id} no encontrado.`);
    }
}

// Eliminar proveedor
function deleteProvider(id) {
    providers = providers.filter(provider => provider.id !== id);
    localStorage.setItem('providers', JSON.stringify(providers));
    renderProviders();
}

// Cerrar los menús al hacer clic fuera de ellos
window.onclick = function(event) {
    const notificationMenu = document.querySelector('.notification-menu');
    const profileMenu = document.querySelector('.profile-menu');

    if (!event.target.matches('.notification') && !event.target.matches('.user')) {
        if (notificationMenu && notificationMenu.style.display === 'block') {
            notificationMenu.style.display = 'none';
        }
        if (profileMenu && profileMenu.style.display === 'block') {
            profileMenu.style.display = 'none';
        }
    }
};

// Agregar eventos a los íconos de notificaciones y perfil
document.querySelector('.notification').addEventListener('click', function(event) {
    event.stopPropagation();
    toggleNotificationMenu();
});

document.querySelector('.user').addEventListener('click', function(event) {
    event.stopPropagation();
    toggleProfileMenu();
});

// Actualizar el avatar del usuario al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.avatar) {
        const avatarImage = document.getElementById('avatar');
        if (avatarImage) {
            avatarImage.src = user.avatar;
        }
    }
});
