// Importa a instância do banco de dados
const Database = require('./src/Conetion');
const mongoose = require('mongoose');
const { createOrder, addOrderItem, getOrdersByCustomer } = require('./src/services/CreateOrder'); // Importa as funções
const readlineSync = require('readline-sync');
const CreatePerson = require('./src/services/CreatePerson');
const CreateProduct = require('./src/services/CreateProduct');
const { exists } = require('./src/models/product');

async function Createorder() {
  try {
    // Perguntar o ID do cliente para criar o pedido
    const customerId = readlineSync.question('Digite o ID do cliente: ');

    // Criar o pedido
    const order = await createOrder(customerId);

    // Perguntar se o usuário deseja adicionar itens ao pedido
    let addMoreItems = true;
    while (addMoreItems) {
      const addItem = readlineSync.keyInYNStrict('Deseja adicionar um item ao pedido?');
      if (addItem) {
        await addOrderItem(order._id); // Passa o ID do pedido para adicionar o item
      } else {
        addMoreItems = false;
      }
    }

    //console.log('Pedido finalizado.');
  } catch (error) {
    //console.error('Erro na criação do pedido:', error);
  }
}

async function Createproduct(){
  try {
    // Defina os dados do produto (pode ser estático ou dinâmico)
    const nome = readlineSync.question('Digite o nome do produto: ');
    const preco = readlineSync.question('Digite o preco do produto: ');
    const estoque = readlineSync.question('Digite a quantidade do estoque do produto: ');

    // Chama a função para criar o produto no banco de dados
    await CreateProduct(nome, preco, estoque);

    //console.log('Produto cadastrado com sucesso!');
} catch (error) {
    //.log('Erro ao cadastrar o produto:', error);
}
}


async function ConsultOrderByiD() {
  try {
    const customerId = readlineSync.question('Digite o ID do cliente para consultar os pedidos: ');

    // Chamar a função para obter pedidos do cliente
    const orders = await getOrdersByCustomer(customerId);

    // Exibir os pedidos
    if (orders.length === 0) {
      console.log('Nenhum pedido encontrado para este cliente.');
    } else {
      console.log('Pedidos encontrados:');
      orders.forEach(order => {
        console.log(`ID do Pedido: ${order.orderId}`);
        console.log(`Data do Pedido: ${order.orderDate}`);
        console.log('Itens:');
        order.items.forEach(item => {
          console.log(`- Produto: ${item.productName}, Quantidade: ${item.quantity}, Preço Unitário: R$ ${item.unitPrice}, Total: R$ ${item.totalPrice}`);
        });
        console.log(`Valor Total do Pedido: R$ ${order.totalValue}`);
        console.log('---------------------------');
      });
    }
  } catch (error) {
    //console.error('Erro ao consultar pedidos:', error);
  }
}

async function Createperson(){
  try {
    // Pergunta ao usuário os dados para a nova pessoa
    const name = readlineSync.question('Digite o nome do cliente: ');
    const email = readlineSync.question('Digite o email: ');
    const phone = readlineSync.question('Digite o numero: ');

    await CreatePerson(name, email, phone);

    //console.log('Cadastro realizado com sucesso!');
} catch (error) {
} 
}

// Função para exibir o menu e obter a escolha do usuário
async function showMenu() {
  while (true) {
    console.log('====================');
    console.log('Gerenciador de Pedidos');
    console.log('1. Cadastrar Cliente');
    console.log('2. Cadastrar Produto');
    console.log('3. Adicionar novo pedido');
    console.log('4. Consultar pedidos por Clientes');
    console.log('0. Sair');
    console.log('====================');
    
    const choice = readlineSync.question('Escolha uma opcao: ');

    switch (choice) {
      case '1':
        console.clear();
        await Createperson();
        break;
      case '2':
        console.clear();
        await Createproduct();
        break;
      case '3':
        console.clear();
        await Createorder() 
        break;
      case '4':
        await ConsultOrderByiD()
        break;
      case '0':
        process.exit(1)
        break;
      default:
        console.log('Opção inválida. Tente novamente.');
        break;
    }
  }
}

showMenu()