// Función para cargar proveedores desde el JSON
function loadSuppliers() {
    const supplierSelect = document.getElementById('supplierSelect'); // Asegúrate de que este ID sea correcto

    // Cargar proveedores desde el archivo JSON
    fetch('/JSONs/proveedores.json')  // Cambia la ruta a la correcta si es necesario
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(supplier => {
                // Asegurarse de que el proveedor tenga un ID y nombre válidos
                if (supplier.id && supplier.nombre) {
                    const option = document.createElement('option');
                    option.value = supplier.id;  // Asume que cada proveedor tiene un ID
                    option.textContent = `${supplier.nombre} ${supplier.apellidos || ''}`;  // Nombre y apellidos
                    supplierSelect.appendChild(option);
                }
            });
        })
        .catch(error => console.error('Error al cargar proveedores del JSON:', error));

    // Cargar proveedores desde localStorage
    const localSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
    localSuppliers.forEach(supplier => {
        // Asegurarse de que el proveedor tenga un ID y nombre válidos
        if (supplier.id && supplier.nombre) {  // Cambié 'supplier.name' por 'supplier.nombre'
            const option = document.createElement('option');
            option.value = supplier.id;
            option.textContent = supplier.nombre;
            supplierSelect.appendChild(option);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Llamar a la función de cargar proveedores al cargar la página
    loadSuppliers();

    // Otras funciones como cargar el usuario y manejar la imagen del producto
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('creatorName').textContent = currentUser.name;
        document.getElementById('creatorRole').textContent = currentUser.role;
        document.getElementById('creationDate').textContent = new Date().toLocaleDateString();
    }

    // Función para cargar la imagen del producto
    window.loadImage = function(event) {
        const reader = new FileReader();
        reader.onload = function() {
            const productImage = document.getElementById('productImage');
            productImage.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    // Guardar descripción en localStorage
    window.saveDescription = function() {
        const descriptionText = document.getElementById('descriptionText').value;
        localStorage.setItem('productDescription', descriptionText);
        toggleDescriptionPopup();
    };

    // Alternar la visibilidad del popup de descripción
    window.toggleDescriptionPopup = function() {
        const descriptionPopup = document.getElementById('descriptionPopup');
        descriptionPopup.style.display = descriptionPopup.style.display === 'none' ? 'block' : 'none';
    };

    // Guardar producto con alert y redirección
    document.querySelector('.save-button').addEventListener('click', function() {
        const productName = document.getElementById('productName').value;
        const categorySelect = document.getElementById('categorySelect').value;
        const supplierSelect = document.getElementById('supplierSelect').value;
        const basePrice = parseFloat(document.getElementById('basePrice').value);
        const vatPercentage = parseFloat(document.getElementById('vatPercentage').value);
        const priceWithVAT = parseFloat(document.getElementById('priceWithVAT').value);
        const quantityToAdd = parseInt(document.getElementById('quantityToAdd').value);
        const quantityToAlert = parseInt(document.getElementById('quantityToAlert').value);
        const productImage = document.getElementById('productImage').src;
        const productDescription = localStorage.getItem('productDescription') || '';

        // Validaciones para evitar datos nulos o inválidos
        if (!productName || !categorySelect || !supplierSelect || 
            isNaN(basePrice) || isNaN(vatPercentage) || isNaN(priceWithVAT) || 
            isNaN(quantityToAdd) || isNaN(quantityToAlert) || 
            quantityToAdd < 1) {
            document.getElementById('alertContainer').style.display = 'block'; // Muestra alerta
            return; // Sale de la función sin guardar el producto
        }

        // Generar un ID único para el nuevo producto
        let products = JSON.parse(localStorage.getItem('products')) || [];
        const newProductId = products.length ? products[products.length - 1].id + 1 : 1;  // Incrementar el ID

        const product = {
            id: newProductId,  // Asignar el ID único
            name: productName,
            category: categorySelect,
            supplierId: supplierSelect,
            basePrice: basePrice,
            vatPercentage: vatPercentage,
            priceWithVAT: priceWithVAT,
            quantityToAdd: quantityToAdd,
            quantityToAlert: quantityToAlert,
            image: productImage,
            description: productDescription,
            createdBy: {
                name: currentUser.name,
                role: currentUser.role,
                date: new Date().toLocaleDateString()
            }
        };

        // Guardar producto en localStorage
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        alert("Producto guardado exitosamente."); // Muestra mensaje solo si se guardó
        // Redirigir a la página de proveedores
        window.location.href = '/Html/Inventario/ListadoHistorial.html';
    });

    // Cancelar acción
    document.querySelector('.cancel-button').addEventListener('click', function() {
        window.location.href = '/Html/Inventario/ListadoHistorial.html';
    });
});
