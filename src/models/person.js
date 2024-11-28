const mongoose = require('mongoose');

// Definição do Schema da Pessoa
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  dateCreation: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;