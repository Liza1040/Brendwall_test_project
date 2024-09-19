function submitForm() {
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    console.log(formData)
    const product = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price')
    };
    console.log(product)
    fetch('http://127.0.0.1:8000/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product created:', data);
        fetchProducts();
    })
    .catch(error => console.error('Error:', error));
};

function fetchProducts() {
  fetch('http://127.0.0.1:8000/products/all')
    .then(response => response.json())
    .then(data => {
      displayProducts(data);
    })
    .catch(error => console.error('Error:', error));
}

function displayProducts(products) {
  const tableBody = document.getElementById('productTableBody');
  tableBody.innerHTML = '';

  products.forEach(product => {
    const row = tableBody.insertRow(-1);
    row.innerHTML = `<td>${product.name}</td><td>${product.description}</td><td>${product.price}</td>`;
  });
}

fetchProducts();
