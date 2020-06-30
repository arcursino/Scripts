const mongoose = require('mongoose');
//url de acesso ao MongoDB Atlas
const { mongoUrl } = require('./keys');

//define uma conexão
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false //necessário ao usar findOneAndUpdate
});
//uma vez conectado o evento open é disparado na instância connection
mongoose.connection.on('connected', () => {
    console.log('Conectado com o BD');
});
mongoose.connection.on('error', (err) => {
    console.log('Erro de conexão com o BD', err);
});