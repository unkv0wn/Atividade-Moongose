const mongoose = require('../Conetion'); 
const Product = require('../models/product'); // Importando o modelo Produto

// Função para cadastrar um produto
async function CreateProduct(nome, preco, estoque) {
    try {
        // Criando uma nova instância do Produto
        const product = new Product({
            name: nome,
            price: preco,
            stock: estoque
        });

        // Salvando o produto no banco de dados
        const resultado = await product.save();

        console.log('Produto cadastrado com sucesso:', resultado);
        return resultado; // Retorna o produto cadastrado
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err);
        throw err; // Lança o erro para ser tratado em outro lugar
    }
}

module.exports = CreateProduct;

