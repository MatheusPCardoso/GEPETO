const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const reqString = {
    type: String,
    require: true
}

const turmaSchema = new Schema({
    id: reqString,
    nome: reqString,
    codTurma: reqString,
    professor: reqString,
    dataInicio:reqString,
    dataFim: reqString,
    alunos: [String]
})

turmaSchema.plugin(normalize);

var Turmas = mongoose.model('Turma', turmaSchema);


module.exports = Turmas;