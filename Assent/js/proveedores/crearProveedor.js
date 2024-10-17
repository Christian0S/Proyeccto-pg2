// Variables globales
let providers = [];

// Cargar datos de localStorage y configurar eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargar proveedores del localStorage
    const storedProviders = localStorage.getItem('providers');
    if (storedProviders) {
        providers = JSON.parse(storedProviders);
    } else {
        console.log('No se encontraron proveedores en localStorage.');
    }

    // Configurar el evento de envío del formulario
    const form = document.getElementById('providerForm');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar el envío del formulario
            addProvider(); // Llamar a la función para agregar un proveedor
        });
    } else {
        console.error('Formulario no encontrado.');
    }

    // Agregar evento para el botón de cierre de sesión
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            alert('Sesión cerrada.');
        });
    } else {
        console.error('Botón de cierre de sesión no encontrado.');
    }

    // Mostrar imagen de perfil del usuario activo
    const userAvatar = document.getElementById('avatar');
    if (userAvatar) {
        userAvatar.src = '/Assent/img/default-avatar.jpeg'; // Cambia la ruta si es necesario
    }

    // Configurar notificaciones (aquí puedes agregar lógica para cargar notificaciones)
    const notificationMenu = document.getElementById('notificationMenu');
    if (notificationMenu) {
        notificationMenu.innerHTML = "<p>No hay nuevas notificaciones.</p>"; // Mensaje por defecto
    }
});

// Función para agregar un nuevo proveedor
function addProvider() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const tipoIdentificacion = document.getElementById('tipoIdentificacion').value;
    const numeroIdentificacion = document.getElementById('numeroIdentificacion').value;
    const pais = document.getElementById('pais').value;
    const ciudad = document.getElementById('ciudad').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    // Crear un nuevo proveedor
    const newProvider = {
        id: providers.length + 1, // Generar un ID único
        nombre: `${nombre} ${apellidos}`,
        tipoIdentificacion,
        numeroIdentificacion,
        pais,
        ciudad,
        direccion,
        telefono,
        correo,
        fechaCreacion: new Date().toLocaleDateString(),
    };

    // Agregar el nuevo proveedor a la lista y guardar en localStorage
    providers.push(newProvider);
    localStorage.setItem('providers', JSON.stringify(providers));
    
    // Limpiar el formulario después de guardar
    document.getElementById('providerForm').reset();
    
    // Mostrar mensaje de éxito
    alert('Proveedor agregado exitosamente.');
}

// Función para mostrar la imagen de perfil del proveedor
function loadProfileImage() {
    const profilePic = document.getElementById('profile-pic');
    const avatar = document.getElementById('avatars');

    if (profilePic && avatar) {
        profilePic.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    avatar.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Llamar a la función para cargar la imagen de perfil
loadProfileImage();
