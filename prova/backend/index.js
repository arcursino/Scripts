var express = require('express');
var app = express();
var cors = require('cors');
app.use(express.json()); //para conversão de application/json
app.use(express.urlencoded({ extended: true })) // para conversão de application/x-www-form-urlencoded
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
})); //para aceitar requisição de outros domínios

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

// importar o módulo que possui as operações no SQLite
const bd = require('./modelo');

const PORT = '3101';

// http://localhost:3101/login/a@teste.com/123
app.get('/login/:mail/:senha', bd.login);

// http://localhost:3101/logout
app.get('/logout', (req,res) =>{
    if( req.session ){
        req.session.destroy(err=>{
            res.send({result:'Sessão encerrada'})
        })
    }
    else
        res.send({message:'Problemas para encerrar a sessão'})
});

// http://localhost:3101/select
app.get('/select', bd.selectContato);

// http://localhost:3101/usuario/a@teste.com/123
app.get('/usuario/:mail/:senha', bd.insertUsuario);

// http://localhost:3101/contato/José/1234567890
app.get('/contato/:nome/:telefone', bd.insertContato);

// http://localhost:3101/contato/1
app.get('/contato/:idcontato', bd.deleteContato);

// http://localhost:3101/contato/3/Bruninha/1234567899
app.get('/contato/:idcontato/:nome/:telefone', bd.updateContato);

//aceita qualquer método HTTP e URL
app.use((req, res) => {
    res.send({message:"URL desconhecida"});
});

//define a porta e a função callback a ser executada após o servidor iniciar
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});