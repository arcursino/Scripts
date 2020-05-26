const express = require('express');

const app = express();

const PORT = '3100';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('../public'));


//b) C:\>curl http://localhost:3100/
app.get('/', (req, res) => {
    res.send('caminho raiz');
});

//c) C:\>curl http://localhost:3100/somar/5/10
app.get('/somar/:a/:b', (req, res) => {
    let a = req.params.a;
    let b = req.params.b;
    a = parseInt(a);
    b = parseInt(b);
    res.send(a+b+'');
});

//d) C:\>//curl -X GET -d "x=12&y=4" http://localhost:3100/diff
app.get('/diff/', (req, res) => {
    let x = req.query.x;
    let y = req.query.y;
    x = parseInt(x);
    y = parseInt(y);
    res.send(x-y+'');
});

//e) C:\>//curl -X POST -d "x=12&y=4" http://localhost:3100/diff
app.post('/diff/', (req, res) => {
    let x = req.query.x;
    let y = req.query.y;
    x = parseInt(x);
    y = parseInt(y);
    res.send(x-y+'');
});

//f) C:\>//curl -X GET -d "x=12" http://localhost:3100/diff/4
app.get('/diff/:y', (req, res) => {
    let x = req.query.x;
    let y = req.params.y;
    x = parseInt(x);
    y = parseInt(y);
    res.send(x-y+'');
});

//g) C:\>//curl -X GET/POST/PUT/DELETE -d "b=2&e=5" http://localhost:3100/pow
app.all ('/pow', (req, res) => {
    let b = req.query.b;
    let e = req.query.e;
    b = parseInt(b);
    e = parseInt(e);
    res.send(b**e+'');
});

//h) rotas desconhecidas : curl -X GET -d "b=2&e=5" http://localhost:3100/errado
//                         curl -X POST http://localhost:3100/rota/desconhecida
//                         curl -X PUT http://localhost:3100/nao/mapeado
app.use(function(req, res){
    res.send('Caminho Inexistente');
});

//i) C:\>curl http://localhost:3100/texto.txt
app.use(express.static('../public'));

//j) C:\>curl http://localhost:3100/arquivo/txt
app.use('/arquivo/txt', express.static(__dirname + '../public/'));


//a):
app.listen(PORT, () => {console.log(`rodando na porta ${PORT} .....`);});