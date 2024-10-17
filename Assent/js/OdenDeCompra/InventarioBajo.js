// Fetch JSON and display products
fetch('/JSONs/productos.json')
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
        filterProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));

// Display products in inventory grid
function displayProducts(products) {
    const inventoryGrid = document.getElementById('inventoryGrid');
    inventoryGrid.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        // Only display low stock products (<= 20)
        if (product.stock <= 20) {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Create product HTML structure
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>Categoría: ${product.category}</p>
                    <p>Stock: ${product.stock}</p>
                </div>
            `;
            inventoryGrid.appendChild(productDiv);
        }
    });
}

// Filter products based on category
function filterProducts(products) {
    const filters = document.querySelectorAll('.filter-checkbox');
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            const selectedFilters = Array.from(filters)
                .filter(f => f.checked)
                .map(f => f.id.toLowerCase()); // Asegúrate de que todo esté en minúsculas

            // Filtrar productos si hay filtros seleccionados
            const filteredProducts = selectedFilters.length > 0
                ? products.filter(product =>
                    selectedFilters.includes(product.category.toLowerCase()) && product.stock <= 20
                  )
                : products; // Si no hay filtros, muestra todos los productos

            displayProducts(filteredProducts);
        });
    });
}
