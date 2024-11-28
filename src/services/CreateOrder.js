const mongoose = require('../Conetion');  
const readlineSync = require('readline-sync');
const OrderItem = require('../models/orderItem'); 
const Order = require('../models/order'); 
const Product = require('../models/product'); 
const Customer = require('../models/person'); 



async function createOrder(customerId) {
  try {

    if (!customerId) {
      throw new Error('ID do cliente não pode ser vazio');
    }


    const customer = await Customer.findById(customerId); 
    if (!customer) {
      throw new Error(`Cliente não encontrado para o ID: ${customerId}`);
    }


    const order = new Order({
      customer: customerId, 
      orderDate: new Date(), 
      items: [] 
    });



    const savedOrder = await order.save();
    console.log(`Pedido criado com sucesso! ID do pedido: ${savedOrder._id}`);
    return savedOrder; 

  } catch (error) {
    console.error('Erro ao criar o pedido:', error);
    throw error; 
  }
}

async function addOrderItem(orderId) {
  try {

    
    const productId = readlineSync.question('Digite o ID do produto: ');
    const product = await Product.findById(productId);

    if (!product) {
      console.log('Produto não encontrado!');
      return;
    }


    const quantity = readlineSync.questionInt('Digite a quantidade: ');

    if (product.stock < quantity) {
      console.log('Estoque insuficiente para adicionar este item ao pedido!');
      return;
    }

  
    const unitPrice = product.price;
    const totalPrice = unitPrice * quantity;

    const orderItem = new OrderItem({
      product: product._id,
      quantity,
      unitPrice,
      totalPrice
    });


    const savedOrderItem = await orderItem.save();
 

    const order = await Order.findById(orderId);
    if (!order) {
      console.log('Pedido não encontrado!');
      return;
    }



    order.items.push(savedOrderItem);

    product.stock -= quantity;
    await product.save();


    await order.save();

    console.log(`Item adicionado com sucesso! Total do item: R$ ${totalPrice}`);
  } catch (error) {
    console.error('Erro ao adicionar item ao pedido:', error);
  }

}

async function getOrdersByCustomer(customerId) {
  try {

    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new Error('Cliente não encontrado');
    }


    const orders = await Order.find({ customer: customerId }).populate('items.product');

    return orders.map(order => {
      const totalValue = order.items.reduce((sum, item) => {
        return sum + item.totalPrice; 
      }, 0);

      return {
        orderId: order._id,
        orderDate: order.orderDate,
        items: order.items.map(item => ({
          productId: item.product._id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice
        })),
        totalValue: totalValue 
      };
    });
  } catch (error) {
    console.error('Erro ao consultar pedidos do cliente:', error);
    throw error;
  }
}

module.exports = {
  createOrder,
  addOrderItem,
  getOrdersByCustomer
};
