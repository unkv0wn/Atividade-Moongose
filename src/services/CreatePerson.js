const mongoose = require('../Conetion'); 
const Person = require('../models/person');  

async function CreatePerson(name, email, phone) {
    try {

        const pessoaExistente = await Person.findOne({ email });
        if (pessoaExistente) {
            console.log('Email já cadastrado.');
            return;
        }

        const novaPessoa = new Person({
            name: name,
            email: email,
            phone: phone,
        });

        await novaPessoa.save();
        console.log('Pessoa cadastrada com sucesso!');
    } catch (err) {
        console.log('Erro ao cadastrar pessoa:', err);
    }
}

module.exports = CreatePerson;
