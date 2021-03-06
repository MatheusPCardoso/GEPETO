require('dotenv').config();
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express()
const port = process.env.PORT || 3001;

const authenticate = require('./authenticate');
const exames = require('./exam');
const turmas = require('./turma')
const professores = require('./professores.js');
const alunos = require('./alunos.js');
const respostas = require('./respostas');
const Alunos = require('./models/alunos');
const Professores = require('./models/professores');
const Turmas = require('./models/turmas');
const { verifyJWT } = require('./auth.service');

const connect = mongoose.connect(process.env.DB_URL);

connect.then((db) => {
  console.log("Conectado ao banco");
}, (err) => { console.log(err); });

app.use(express.json());
app.use(cors());
app.use(cookieParser())


app.use('/', authenticate);
app.use('/exames', verifyJWT, exames);
app.use('/turmas', verifyJWT, turmas);
app.use('/professores', verifyJWT, professores);
app.use('/alunos', verifyJWT, alunos)
app.use('/respostas', verifyJWT, respostas);

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
}) 