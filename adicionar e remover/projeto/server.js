const products = [
    { id: 1, name: 'Ração', price: 100, },
    { id: 2, name: 'Produto B', price: 200 },
    { id: 3, name: 'Produto C', price: 300 }
];

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const results = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );

    if (results.length > 0) {
        results.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.textContent = `Preço: R$${product.price}`;
            resultsDiv.appendChild(productDiv);
        });
    } else {
        resultsDiv.textContent = 'Nenhum produto encontrado.';
    }
});