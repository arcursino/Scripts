const mongoose = require('mongoose');
//https://www.npmjs.com/package/mongoose
// Atlas > Clusters > aula
//https://cloud.mongodb.com/v2/5eadcaa90b8b5a2d311a3193#metrics/replicaSet/5eadccc7b83de735bc448671/explorer/test/usuarios/find

//importa os tipos de dados
const { Usuario } = require('./models');
const { formatWithOptions } = require('util');

const login = (req, res) => {
    const { mail, senha } = req.body;
    (async () => {
        try {
            //https://mongoosejs.com/docs/api.html#model_Model.findOne
            const obj = await Usuario.findOne({
                mail: mail, //filtro
                senha: senha
            },
                '_id mail'  //propriedades a serem exibidas no resultado
            );
            if (obj) {
                req.session.oid = obj._id;
                req.session.mail = obj.mail;
                res.send({ result: 'Login efetuado com sucesso' });
            }
            else
                res.send({ message: 'Dados de login não conferem' });
        }
        catch (e) {
            res.send({ message: e.message });
        }
    })();
};

const addUsuario = (req, res) => {
    const { mail, senha } = req.body;
    const usuario = new Usuario({ mail, senha });
    usuario.save(err => {
        try {
            if (err) {
                if (err.code === 11000)
                    res.send({ message: `${mail} já existe no cadastro` });
                else
                    res.send({ message: err.message });
            }
            else
                res.send({ result: 'Usuário cadastrado com sucesso' });
        }
        catch (e) {
            res.send({ message: "Problema para efetuar a operação no banco de dados" });
        }
    });
}

//https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#db.collection.updateOne
const updateSenha = (req, res) => {
    if (req.session.oid) {
        const { senha } = req.body;
        (async () => {
            try {
                const obj = await Usuario.updateOne(
                    { _id: req.session.oid }, //filtro
                    {
                        $set: {
                            senha: senha //elemento a ser atualizado
                        }
                    },
                    { runValidators: true }
                )
                if (obj.n) {
                    if (obj.nModified == 0)
                        res.send({ message: 'A senha é igual a anterior' });
                    else
                        res.send({ result: 'Senha atualizada com sucesso' });
                }
                else
                    res.send({ message: 'Problemas para alterar a senha' });
            }
            catch (e) {
                res.send({ message: e.message });
            }
        })();
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
}

const addGasto = (req, res) => {
    if (req.session.oid) {
        const { descricao, valor } = req.body;
        (async () => {
            try {
                const obj = await Usuario.updateOne(
                    { _id: req.session.oid }, //filtro
                    {
                        $addToSet: { //https://docs.mongodb.com/manual/reference/operator/update/addToSet/
                            gastos: {
                                descricao: descricao,
                                valor: valor
                            }
                        }
                    },
                    { runValidators: true }
                )
                if (obj.n == 1 && obj.nModified == 1)
                    res.send({ result: 'Gasto adicionado com sucesso' });
                else
                    res.send({ message: 'Problemas para registrar o gasto' });
            }
            catch (e) {
                res.send({ message: e.message });
            }
        })();
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
};

const addGanho = (req, res) => {
    if (req.session.oid) {
        const { descricao, valor } = req.body;
        (async () => {
            try {
                const obj = await Usuario.updateOne(
                    { _id: req.session.oid }, //filtro
                    {
                        $addToSet: { //https://docs.mongodb.com/manual/reference/operator/update/addToSet/
                            ganhos: {
                                descricao: descricao,
                                valor: valor
                            }
                        }
                    },
                    { runValidators: true }
                )
                if (obj.n == 1 && obj.nModified == 1)
                    res.send({ result: 'Ganho adicionado com sucesso' });
                else
                    res.send({ message: 'Problemas para registrar o ganho' });
            }
            catch (e) {
                res.send({ message: e.message });
            }
        })();
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
};

const deleteGanho = (req, res) => {
    if (req.session.oid) {
        const { oid } = req.body;
        (async () => {
            try {
                const obj = await Usuario.updateOne(
                    {}, //filtro
                    {
                        $pull: { //https://docs.mongodb.com/manual/reference/operator/update/pull/
                            ganhos: { _id: oid }
                        }
                    }
                )
                if (obj.n == 1)
                    res.send({ result: 'Ganho excluído com sucesso' });
                //else if (obj.n == 1 && obj.nModified == 0)
                    //res.send({ message: 'O ganho já tinha sido excluído' });
                else
                    res.send({ message: 'Problemas para excluir o ganho' });
            }
            catch (e) {
                res.send({ message: e.message });
            }
        })();
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
};

const deleteGasto = (req, res) => {
    if (req.session.oid) {
        const { oid } = req.body;
        (async () => {
            try {
                const obj = await Usuario.updateOne(
                    {}, //filtro
                    {
                        $pull: { //https://docs.mongodb.com/manual/reference/operator/update/pull/
                            gastos: { _id: oid }
                        }
                    }
                )
                if (obj.n == 1 && obj.nModified == 1)
                    res.send({ result: 'Gasto excluído com sucesso' });
                else if (obj.n == 1 && obj.nModified == 0)
                    res.send({ message: 'O gasto já tinha sido excluído' });
                else
                    res.send({ message: 'Problemas para excluir o gasto' });
            }
            catch (e) {
                res.send({ message: e.message });
            }
        })();
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
};

const list = (req, res) => {
    if (req.session.oid) {
        (async () => {
            try {
                //https://mongoosejs.com/docs/api.html#model_Model.findById
                const obj = await Usuario.findById(
                    req.session.oid, //filtro
                    'gastos ganhos' //propriedades a serem retornadas
                );
                if (obj._id)
                    res.send({ result: obj })
                else
                    res.send(obj);
            }
            catch (e) {
                res.send({ message: e.message });
            }
        })();
    }
    else
        res.send({ message: 'É necessário efetuar o login' });
};

const listByInterval = (req, res) => {
    if (req.session.oid) {
        const { syear, smonth, sday, eyear, emonth, eday } = req.body;
        (async () => {
            try {
                const start = new Date(syear, smonth, sday, 0, 0, 0), end = new Date(eyear, emonth, eday, 23, 59, 59);
                const obj = await Usuario.aggregate([
                    { $match: { _id: mongoose.Types.ObjectId(req.session.oid) } },
                    //{ $match: {mail:"b@teste.com"} },
                    {
                        $project: {
                            ganhos: {
                                $filter: {
                                    input: "$ganhos",
                                    as: "ganho",
                                    cond: {
                                        $and: [
                                            { $gte: ["$$ganho.data", start] },
                                            { $lt: ["$$ganho.data", end] },
                                        ]
                                    }

                                }
                            },
                            gastos: {
                                $filter: {
                                    input: "$gastos",
                                    as: "gasto",
                                    cond: {
                                        $and: [
                                            { $gte: ["$$gasto.data", start] },
                                            { $lt: ["$$gasto.data", end] },
                                        ]
                                    }

                                }
                            }
                        }
                    }
                ])
                if (obj && obj[0]._id)
                    res.send({ ganhos:obj[0].ganhos, gastos:obj[0].gastos })
                else
                    res.send(obj);
            }
            catch (e) {
                res.send({ message: e.message });
            }
        })();
    }
    else
       res.send({ message: 'É necessário efetuar o login' });
};



module.exports = {
    login,
    addUsuario,
    updateSenha,
    addGasto,
    addGanho,
    deleteGanho,
    deleteGasto,
    list,
    listByInterval
};