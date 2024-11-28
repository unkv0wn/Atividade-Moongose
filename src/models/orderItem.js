const mongoose = require('mongoose');
const Product = require('./product'); 

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'A Quantidade nao pode ser zero.']
  },
  unitPrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    default: function() {
      return this.quantity * this.unitPrice; 
    }
  }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;