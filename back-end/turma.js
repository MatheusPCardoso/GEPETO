const express = require('express');
const router = express.Router();
const Turmas = require('./models/turmas');


router.get('/', async (req, res, next) => {
  try {
    const turmasBanco = await Turmas.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(turmasBanco);
  } catch (err) {
    res.status(500).json({ messege: 'Erro no servidor' });
  }
})
router.post('/', (req, res, next) => {
  Turmas.create(req.body)
    .then((turma) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(turma);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.delete('/:id', async (req, res, next) => {
  Turmas.findByIdAndRemove(req.params.id)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.put('/addAluno/:id', (req, res) => {
  const updateAluno = {
    $push: {
      alunos: [req.body.alunos]
    }
  }
  const setProfessor = {
    $set: {
      professor: req.body.professor
    }
  }
  console.log('entrou no put')
  if (req.body.who == 'aluno') {
    console.log('entrou no aluno')
    Turmas.findByIdAndUpdate(req.body.id, updateAluno).then(response => {
      res.status(200).json({ msg: `${req.body.who} inserido com sucesso`, response });
    })
      .catch(err => res.status(400).json({ msg: 'Id não encontrado', erro: err }))
  }
  else if (req.body.who == 'professor') {
    console.log('entrou no professor')
    Turmas.findByIdAndUpdate(req.body.id, setProfessor).then(response => {
      res.status(200).json({ msg: `${req.body.who} inserido com sucesso`, response });
    })
      .catch(err => res.status(400).json({ msg: 'Id não encontrado', erro: err }))
  }
})


module.exports = router;