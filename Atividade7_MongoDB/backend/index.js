var express = require('express');
var app = express();
var cors = require('cors');
app.use(express.json()); //para conversão de application/json
app.use(express.urlencoded({ extended: true })) // para conversão de application/x-www-form-urlencoded
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
})); //para aceitar requisição de outros domínios

const PORT = '3101';

const session = require('express-session')
//cria uma sessão com as opções fornecidas
//Apenas o ID da session é salvo no cookie enviado para o navegador
//Os dados da sessão são armazenados no servidor.
//Os cookies ficam nos objetos req/res
app.use(session({
    secret: 'qqSenhaUnicaPorServidor', // palavra usada para assinar o cookie de identificação da sessão
    resave: false, // não força a sessão ser atualizada a cada nova request
    saveUninitialized: false
}))

//define a conexão com o SGBD
require('./initBD');

//importa as operações no BD
const op = require('./operations')

// curl -X POST -d "mail=a@teste.com&senha=123456" http://localhost:3101/login
app.post('/login', op.login);

// curl -X POST http://localhost:3101/logout
app.post('/logout', (req,res) =>{
    if( req.session )
        req.session.destroy(err=>res.send({result:'Sessão encerrada'}))
    else
        res.send({message:'Problemas para encerrar a sessão'})
});

// curl -X POST -d "mail=a@teste.com&senha=123456" http://localhost:3101/add
app.post('/add', op.addUsuario);

// curl -X POST -d "oid=5eda549e8669566e045cf9d3&senha=654321" http://localhost:3101/password
app.post('/password', op.updateSenha);

// curl -X POST http://localhost:3101/list
app.post('/list', op.list);

// curl -X POST -d "oid=5edae29ec1b5a580b0456f2a&syear=2020&smonth=5&sday=6&eyear=2020&emonth=5&eday=7" http://localhost:3101/listbyinterval
// curl -X POST -d "oid=5edae2a4c1b5a580b0456f2b&syear=2020&smonth=5&sday=6&eyear=2020&emonth=5&eday=7" http://localhost:3101/listbyinterval
app.post('/listbyinterval', op.listByInterval);

// curl -X POST -d "descricao=Posto&valor=25.23" http://localhost:3101/addgasto
app.post('/addgasto', op.addGasto);

// curl -X POST -d "descricao=Venda&valor=150" http://localhost:3101/addganho
app.post('/addganho', op.addGanho);

// curl -X POST -d "oid=5edae50677da0f9d98adf58b" http://localhost:3101/deleteganho
app.post('/deleteganho', op.deleteGanho);

// curl -X POST -d "oid=5edba5ed5f1ad65410352800" http://localhost:3101/deletegasto
app.post('/deletegasto', op.deleteGasto);

//aceita qualquer método HTTP e URL
app.use((req, res) => {
    res.send({message:"URL desconhecida"});
});

//define a porta e a função callback a ser executada após o servidor iniciar
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});