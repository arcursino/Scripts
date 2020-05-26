const express = require('express'); //módulo express(servidor implementado em Node)

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('../public'));
app.use('/msg', express.static('../public/a.txt'));

//curl -X GET http://localhost:3000/op/10/20
app.get('/op/:a/:b', (req, res) => {
    let a = req.params.a;
    let b = req.params.b;
    a = parseInt(a);
    b = parseInt(b);
    res.send(a+b+'');
});

//curl -X POST http://localhost:3000/op/10/20
app.post('/op/:a/:b', (req, res) => {
    let a = req.params.a;
    let b = req.params.b;
    a = parseInt(a);
    b = parseInt(b);
    res.send(a*b+'');
});

app.all ('/cad/cli', (req, res) => {res.send('rota cad/cli')});

app.use( (req, res) => {
    res.send('Não foi dessa vez');
});


app.listen(3000, () => {console.log('rodando .....');});

/* 
const express = require('express'); //importa o módulo Express
const app = express(); //cria uma aplicação Express
app.use(express.json()); //para conversão de application/json
app.use(express.urlencoded({ extended: true })) // para conversão de application/x-www-form-urlencoded
app.use('/saudacao',express.static('../public'));

//definição da rota para a raiz
//acesso usando http://localhost:3000/
app.get('/', function (req, res) {
    res.send('Raiz');
});

//acesso usando http://localhost:3000/cadastro/cliente
app.get('/cadastro/cliente', function (req, res) {
    res.send('caminho para cadastro/cliente');
});

//acesso usando http://localhost:3000/produto/arroz/10.99
app.get('/produto/:nome/:valor', function (req, res) {
    let nome = req.params.nome;
    let valor = req.params.valor;
    res.send('parâmetros ' + nome + ' ' + valor);
});

// curl -X GET -d "x=5&y=2" http://localhost:3000/valores
app.get('/valores', function (req, res) {
    //recebe os parâmetros enviados pelo corpo da requisição
    let { x, y } = req.body;
    res.send('GET ' + x + ' e ' + y);
});

// curl -X POST -d "x=5&y=2" http://localhost:3000/valores
app.post('/valores', function (req, res) {
    //recebe os parâmetros enviados pelo corpo da requisição
    let { x, y } = req.body;
    res.send('POST ' + x + ' e ' + y);
});

// curl -X POST -d "x=5&y=2" http://localhost:3000/valores/10
app.post('/valores/:w', function (req, res) {
    //recebe os parâmetros enviados pelo corpo da requisição
    let { x, y } = req.body;
    let w = req.params.w; //parâmetro enviado pela URL
    res.send('POST ' + x + ', ' + y + ' e ' + w);
});

//curl -X GET -d "x=1&y=2" http://localhost:3000/tudo
//curl -X POST -d "x=3&y=4" http://localhost:3000/tudo
//curl -X PUT -d "x=5&y=6" http://localhost:3000/tudo
//curl -X DELETE -d "x=7&y=8" http://localhost:3000/tudo
app.all('/tudo', function (req, res) {
    let { x, y } = req.body;
    res.send('ALL ' + x + ' e ' + y);
});

//aceita qualquer método HTTP ou URL iniciando por /inicio 
app.use('/inicio', function(req, res){
    res.send('URL com /inicio');
});

//aceita qualquer método HTTP e URL
app.use(function(req, res){
    res.send('URL desconhecida');
});

//define a porta e a função callback a ser executada após o servidor iniciar
app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000...");
});
*/