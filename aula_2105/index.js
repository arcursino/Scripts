var express = require('express');
var app = express();
var cors = require('cors');
app.use(express.json()); //para conversão de application/json
app.use(express.urlencoded({ extended: true })) // para conversão de application/x-www-form-urlencoded
app.use(cors()); //para aceitar requisição de outros domínios

const PORT = '3100';

const log = [];

app.get('/log', (req, res) => {
    res.send({result:log});
})

// http://localhost:3100/calc/3/2/+
// http://localhost:3100/calc/3/2/%2F
app.get('/calc/:a/:b/:op', (req, res) =>{
    try{
        const {a, b, op } = req.params;
        const r = eval(a + op + b);
        log.push(a + op + b + '=' + r);
        res.send({result:r});
    }catch(e){
        res.send({message:e.message});
    }
});

app.use('/calc', (req, res) =>{
    res.send({message:'Parâmetros inválidos'});
});

//aceita qualquer método HTTP e URL
app.use((req, res) => {
    res.send({message:"URL desconhecida"});
});

//define a porta e a função callback a ser executada após o servidor iniciar
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});