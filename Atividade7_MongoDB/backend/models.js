const mongoose = require('mongoose');
//https://mongoosejs.com/docs/schematypes.html

const usuarioSchema = new mongoose.Schema({
    mail: {
        type: String,
        unique:true,
        required: true,
        dropDups: true, //remover registros duplicados
        lowercase: true, 
        trim: true
    },
    senha: {
        type: String,
        required: true,
        lowercase: true, 
        trim: true,
        minlength:6,
        maxlength:10
    },
    ganhos: [
        {
            descricao: {
                type: String,
                required: true,
                maxlength:20,
                trim: true
            },
            valor: {
                type: Number,
                required: true,
                min: 0
            },
            data: { 
                type: Date, 
                required: true,
                default: Date.now 
            }
        }
    ],
    gastos: [
        {
            descricao: {
                type: String,
                required: true,
                maxlength:20,
                trim: true
            },
            valor: {
                type: Number,
                required: true,
                min: 0
            },
            data: { 
                type: Date, 
                required: true,
                default: Date.now 
            }
        }
    ]
});

//Converte o esquema usuarioSchema num modelo. 
//Um modelo define a estrutura da tabela, no MongoDB as tabelas são chamadas de coleção. 
//O mongoose automaticamente transformará singular em plural,
//então a coleção terá o nome de "usuarios" no MongoDB.
module.exports = {
    Usuario: mongoose.model('Usuario', usuarioSchema),
};