document.addEventListener('DOMContentLoaded', () => {
    AtualizarTabela();
});
window.Products = [
    { id: 1, name: 'Produto A', expiryDate: '2024-07-01', quantity: 10, value: 15.50, dthUpdate: '01/08/2024', fExibir: true},
    { id: 2, name: 'Produto B', expiryDate: '2024-07-02', quantity: 17, value: 25.00, dthUpdate: '09/11/2024', fExibir: true },
];

function AdicionarProduto(){
    var produto = {};
    produto.name = document.getElementById('txtNome').value;
    produto.expiryDate = document.getElementById('dthValidade').value;
    produto.quantity = document.getElementById('qtdEstoque').value;
    produto.value = document.getElementById('txtValor').value;
    produto.dthUpdate = new Date().toLocaleDateString();
    produto.id = window.Products[window.Products.length - 1].id + 1;
    produto.fExibir = true;

    let produtoCerto = true;
    if(produto.name == '' || produto.expiryDate == '' || produto.quantity == '' || produto.value == ''){
        produtoCerto = false;
    }
    if(produtoCerto == false){
        alert('Preencha todos os campos');
        return;
    }

    window.Products.push(produto);
    AtualizarTabela();
    LimparCampos();
}

function RemoverProduto(id){
    window.Products = window.Products.filter(p => p.id != id);
    AtualizarTabela();
}

function AtualizarProduto(id){
    document.getElementById('txtNome').value = window.Products.find(p => p.id == id).name;
    document.getElementById('dthValidade').value = window.Products.find(p => p.id == id).expiryDate;
    document.getElementById('qtdEstoque').value = window.Products.find(p => p.id == id).quantity;
    document.getElementById('txtValor').value = window.Products.find(p => p.id == id).value;
    window.Products = window.Products.filter(p => p.id != id);
    AtualizarTabela();
}


function LimparCampos(){
    document.getElementById('txtNome').value = '';
    document.getElementById('dthValidade').value = '';
    document.getElementById('qtdEstoque').value = '';
    document.getElementById('txtValor').value = '';
}

function AtualizarTabela(){
    const ProductsTableBody = document.getElementById('products').querySelector('tbody');
    ProductsTableBody.innerHTML = '';
    window.Products.forEach(product => {
        if(!product.fExibir){
            return;
        }
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="icones"><i class="fa fa-trash" onclick="RemoverProduto(${product.id})"> 
             </i><i class="fa fa-pencil" onclick="AtualizarProduto(${product.id})"></i></td>
            <td>${product.name}</td>
            <td>${product.value}</td>
            <td>${product.expiryDate}</td>
            <td>${product.quantity}</td>
            <td>${product.dthUpdate}</td>
        `;
        ProductsTableBody.appendChild(row);
    });

}

function OrganizarQuantidade(){
    window.Products.sort((a, b) => a.quantity - b.quantity);
    AtualizarTabela();
}

function OrganizarValidade(){
    window.Products.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    AtualizarTabela();
}

function OrganizarValor(){
    window.Products.sort((a, b) => a.value - b.value);
    AtualizarTabela();
}

function Pesquisar(){
    const pesquisa = document.getElementById('txtPesquisa').value;
    window.Products = window.Products.map(p => {
        p.fExibir = p.name.toLowerCase().includes(pesquisa.toLowerCase());
        return p;
    });
    AtualizarTabela();
}


