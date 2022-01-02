const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');


const turmaSchema = new Schema({
    nome: {
        type: String,
        required: false,
    },
    turma: {
        type: String,
        required: false,
    },
    professor: {
        type: String,
    },
    dataInicio:{
        type: String,
    },
    dataFim:{
        type: String,
    }
})

turmaSchema.plugin(normalize);

var Turmas = mongoose.model('Turma', turmaSchema);


module.exports = Turmas;