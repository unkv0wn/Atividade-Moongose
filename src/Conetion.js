const mongoose = require('mongoose');

mongoose.connect(`mongodb://meuUsuario:minhaSenha@localhost:27017/Pedido?authSource=admin`)
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    })
    .catch((err) => {
        console.error('Erro na conexão com o banco de dados:', err.message);
    });
