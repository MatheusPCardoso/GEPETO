const express = require('express');
const Prova = require('./models/exam');
const router = express.Router();


router.post('/', (req, res) => {
    if(req.body){
      Prova.create(req.body).then(value => {
        res.status(201).json({_id: value._id, msg: 'Prova criada com sucesso'});
      }).catch(err => console.log(err));
    }
    else{
        res.status(400).send('Requisição mal-formulada');
    }
});

router.get('/', async (req, res) => {
  try {
    const provas = await Prova.find();
    res.status(200).json(provas);
  }
  catch(err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const provas = await Prova.findById(req.params.id);
    res.status(200).json(provas);
  }
  catch(err) {
    res.status(500).send(err);
  }
});

router.put('/:id', (req, res) => {
  if(req.body && req.params.id) {
    Prova.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
      .then(response => {
        res.status(200).json({msg: 'Prova alterada com sucesso', response});
      })
      .catch(err => {
        res.status(400).json({msg: 'Id não encontrado', erro: err})
      })
  }
  else {
    res.status(400).send('Requisição mal-formulada');
  }
});

module.exports = router;