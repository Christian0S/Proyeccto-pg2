document.addEventListener('DOMContentLoaded', function () {
    loadSuppliers();
    loadUserProfile();
    loadProductForEditing(); // Llamar para cargar el producto si estamos editando

    // Guardar producto con validación
    document.querySelector('.save-button').addEventListener('click', function () {
        saveProduct();
    });

    // Cancelar y redirigir
    document.querySelector('.cancel-button').addEventListener('click', function () {
        window.location.href = '/Html/Inventario/ListadoHistorial.html';
    });
});

// Función para cargar proveedores desde JSON y localStorage
function loadSuppliers() {
    const supplierSelect = document.getElementById('supplierSelect');

    // Cargar proveedores desde JSON
    fetch('/JSONs/proveedores.json') // Cambia la ruta si es necesario
        .then(response => response.json())
        .then(data => {
            data.forEach(supplier => {
                const option = document.createElement('option');
                option.value = supplier.id;
                option.textContent = `${supplier.nombre} ${supplier.apellidos}`;
                supplierSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar proveedores del JSON:', error));

    // Cargar proveedores desde localStorage
    const localSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
    localSuppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = supplier.name;
        supplierSelect.appendChild(option);
    });
}

// Función para cargar perfil del usuario actual
function loadUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('creatorName').textContent = currentUser.name;
        document.getElementById('creatorRole').textContent = currentUser.role;
        document.getElementById('creationDate').textContent = new Date().toLocaleDateString();
    }
}

// Función para cargar la imagen del producto
function loadImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const productImage = document.getElementById('productImage');
        productImage.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Función para cargar un producto en modo edición (si existe)
function loadProductForEditing() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(item => item.id === parseInt(productId));

        if (product) {
            document.getElementById('productName').value = product.name;
            document.getElementById('categorySelect').value = product.category;
            document.getElementById('supplierSelect').value = product.supplierId;
            document.getElementById('basePrice').value = product.basePrice;
            document.getElementById('vatPercentage').value = product.vatPercentage;
            document.getElementById('priceWithVAT').value = product.priceWithVAT;
            document.getElementById('quantityToAdd').value = product.quantityToAdd;
            document.getElementById('quantityToAlert').value = product.quantityToAlert;
            document.getElementById('productImage').src = product.image || '/Assent/img/default-avatar.jpeg';

            if (product.createdBy) {
                document.getElementById('creatorName').textContent = product.createdBy.name;
                document.getElementById('creatorRole').textContent = product.createdBy.role;
                document.getElementById('creationDate').textContent = product.createdBy.date;
            }
        }
    }
}

// Función para guardar la descripción del producto
function saveDescription() {
    const descriptionText = document.getElementById('descriptionText').value;
    localStorage.setItem('productDescription', descriptionText);
    toggleDescriptionPopup();
}

// Función para mostrar/ocultar el popup de descripción
function toggleDescriptionPopup() {
    const descriptionPopup = document.getElementById('descriptionPopup');
    descriptionPopup.style.display = descriptionPopup.style.display === 'none' ? 'block' : 'none';
}

// Función para guardar un producto nuevo o editado
function saveProduct() {
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

    if (quantityToAdd < 1) {
        document.getElementById('alertContainer').style.display = 'block';
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    if (productId) {
        // Modo edición
        const productIndex = products.findIndex(item => item.id === parseInt(productId));
        if (productIndex !== -1) {
            products[productIndex] = {
                ...products[productIndex],
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
                editedBy: {
                    name: currentUser.name,
                    role: currentUser.role,
                    date: new Date().toLocaleDateString()
                }
            };
        }
    } else {
        // Modo agregar nuevo producto
        const newProductId = products.length ? products[products.length - 1].id + 1 : 1;

        const newProduct = {
            id: newProductId,
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

        products.push(newProduct);
    }

    // Guardar en localStorage
    localStorage.setItem('products', JSON.stringify(products));

    alert("Producto guardado exitosamente.");
    window.location.href = '/Html/Inventario/ListadoHistorial.html'; // Redirigir a la página de proveedores
}
