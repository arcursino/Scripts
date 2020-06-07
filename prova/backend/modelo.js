// importar o módulo sqlite3
// ao definir verbose (detalhado) poderemos rastrear a pilha de execução
const sqlite3 = require('sqlite3').verbose();

// cria o BD e abre a conexão com ele, e após, dispara a função callback
const bd = new sqlite3.Database('./bdaula.db', (error) => {
    console.log(error ? error.message : "BD criado");
});

//cria a tabela no bdaula
bd.run(
    'create table if not exists tbusuario(' +
    'idusuario integer primary key autoincrement,' +
    'mail text not null unique,' +
    'senha text not null);')
bd.run(
    'create table if not exists tbcontato(' +
    'idcontato integer primary key autoincrement,' +
    'idusuario integer,'+
    'nome text not null,' +
    'telefone text not null,'+
    'FOREIGN KEY(idusuario) REFERENCES tbusuario(idusuario))'
);

const login = (req, res) => {
    console.log("login");
    const { mail, senha } = req.params;
    if (mail && mail !== '' && senha && senha !== '') {
        try {
            bd.get('select * from tbusuario where mail like ? and senha = ?',
                [mail, senha],
                (error, row) => {
                    if (error) 
                        res.send({ message: error.message });
                    else if( row ){
                        req.session.idusuario = row.idusuario;
                        req.session.mail = mail;
                        console.log(req.session)
                        res.send({ result: 'Login efetuado com sucesso' })
                    }
                    else
                        res.send({ message: 'Os dados de login não conferem' });
                }
            );
        }
        catch (e) {
            res.send({ message: e.message });
        }
    }
    else
        res.send({ message: 'Por favor, forneça um e-mail' })
};


// retorna todos os registros da tbcontato vinculados ao e-mail de login
const selectContato = (req, res) => {
    if (req.session.idusuario) {
        // o método all é usado para fazer uma consulta que retorna vários registros
        // a resposta é um array de JSON
        bd.all('select * from tbcontato where idusuario = ? order by nome',
            [req.session.idusuario],
            (error, rows) => {
                console.log(rows)
                if (error) 
                    res.send({ message: error.message });
                else
                    res.send({ result: rows });
            }
        );
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
};

// insere um registro na tbcontato
const insertUsuario = (req, res) => {
    try {
        const { mail, senha } = req.params;
        if( mail !== '' && senha !== '' ){
            bd.run('insert into tbusuario(mail,senha) values (?,?)',
                [mail, senha],
                (error) => {
                    if (error){
                        if( error.errno && error.errno == 19 )
                            res.send({ message: `${mail} já existe no cadastro` });
                        else
                            res.send({ message: error.message });
                    }
                    else
                        res.send({ result: 'Usuário cadastrado com sucesso' })
                }
            );
        }
        else
            res.send({ message: 'É necessário fornecer o e-mail e senha' });
    }
    catch (e) {
        res.send({ message: e.message });
    }
};

// insere um registro na tbcontato
const insertContato = (req, res) => {
    if (req.session.idusuario) {
        try {
            const { nome, telefone } = req.params;
            if( nome !== '' && telefone !== '' ){
                bd.run('insert into tbcontato(idusuario,nome,telefone) values (?,?,?)',
                    [req.session.idusuario, nome, telefone],
                    (error) => {
                        if (error)
                            res.send({ message: error.message });
                        else
                            res.send({ result: 'Contato adicionado com sucesso' })
                    }
                );
            }
            else
                res.send({ message: 'É necessário fornecer o nome e telefone' });
        }
        catch (e) {
            res.send({ message: e.message });
        }
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
};

const deleteContato = (req, res) => {
    if (req.session.idusuario) {
        try {
            const { idcontato } = req.params;
            if( idcontato !== '' ){
                bd.run('delete from tbcontato where idusuario = ? and idcontato = ?',
                    [req.session.idusuario, idcontato],
                    (error) => {
                        console.log(this)
                        console.log(this.changes)
                        if (error)
                            res.send({ message: error.message });
                        else
                            res.send({ result: 'Contato removido com sucesso' })
                    }
                );
            }
            else
                res.send({ message: 'É necessário fornecer a identificação do contato' });
        }
        catch (e) {
            res.send({ message: e.message });
        }
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
};

const updateContato = (req, res) => {
    if (req.session.idusuario) {
        try {
            const { idcontato, nome, telefone } = req.params;
            if( idcontato !== '' && nome !== '' && telefone !== '' ){
                bd.run('update tbcontato set nome=?,telefone=? where idcontato=? and idusuario=?',
                    [nome, telefone, idcontato, req.session.idusuario],
                    (error) => {
                        if (error)
                            res.send({ message: error.message });
                        else
                            res.send({ result: 'Contato atualizado com sucesso' })
                    }
                );
            }
            else
                res.send({ message: 'É necessário fornecer o nome e telefone' });
        }
        catch (e) {
            res.send({ message: e.message });
        }
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
};

module.exports = {
    login,
    insertUsuario,
    selectContato,
    insertContato,
    deleteContato,
    updateContato
};
