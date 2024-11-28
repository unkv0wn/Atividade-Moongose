  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const orderSchema = new Schema({
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Person', 
      required: false, 
    },
    orderDate: {
      type: Date,
      default: Date.now, 
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product', 
          required: true, 
        },
        quantity: {
          type: Number,
          required: true, 
        },
        unitPrice: {
          type: Number,
          required: true, 
        },
        totalPrice: {
          type: Number,
          required: true, 
          
          default: function() {
            return this.quantity * this.unitPrice; 
          }
        }
      }
    ]
  });

  orderSchema.virtual('orderTotal').get(function() {
    return this.items.reduce((total, item) => total + item.totalPrice, 0);
  });


  const Order = mongoose.model('Order', orderSchema);

  module.exports = Order;
