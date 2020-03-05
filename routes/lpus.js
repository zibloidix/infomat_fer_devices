const express = require('express');
const router = express.Router();
const Lpu = require('../models/lpu');

router.post('/', create);
router.get('/', read);
router.get('/:id', readOne);
router.patch('/:id', update);
router.delete('/:id', _delete);

async function create(req, res, next) {
  const lpu = new Lpu(req.body);
  lpu.save()
    .then( lpu => res.status(201).send(lpu) )
    .catch( err => res.status(500).send(err) );
}

async function read(req, res, next) {
  Lpu.find({})
    .then( lpus => res.status(200).send(lpus) )
    .catch( err => res.status(500).send(err) )
}

async function readOne(req, res, next) {
  const { id: _id } = req.params;
  Lpu.find({ _id })
    .then( lpu => res.status(200).send(lpu) )
    .catch( err => res.status(404).send(err) )
}

async function update(req, res, next) {
  const { id } = req.params;
  Lpu.findByIdAndUpdate(id, req.body, { 
    new: true, 
    runValidators: true 
  })
    .then( lpu => res.status(200).send(lpu) )
    .catch( err => res.status(500).send(err) )
}

async function _delete(req, res, next) {
  const { id: _id } = req.params;
  Lpu.findByIdAndDelete({ _id })
    .then( lpu => res.status(200).send(lpu) )
    .catch( err => res.status(500).send(err) )
}

module.exports = router;
