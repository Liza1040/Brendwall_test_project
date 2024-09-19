function submitForm() {
    event.preventDefault()
    const name = document.getElementById('name')
    const description = document.getElementById('description')
    const price = document.getElementById('price')
    const product = {
        name: name.value,
        description: description.value,
        price: price.value
    };
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
const addForm = document.getElementById('productForm')
addForm.addEventListener('submit', submitForm)
