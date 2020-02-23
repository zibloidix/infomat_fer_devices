const Device = require('../models/device');
const express = require('express');
const router = express.Router();

router.post('/', create);
router.get('/', read);
router.get('/:id', readOne);
router.patch('/:id', update);
router.delete('/:id', _delete);

function create(req, res, next) {
  const device = new Device(req.body);
  device.save()
    .then( device => res.status(201).send(device) )
    .catch( err => res.status(500).send(err) );
}

function read(req, res, next) {
  Device.find({})
    .populate('lpu')
    .exec( (err, devices) => { 
      res.status(200).send(devices) 
    });
}

function readOne(req, res, next) {
  const { id: _id } = req.params; 
  Device.findOne({ _id })
    .populate('lpu')
    .exec((err, device) => { 
      res.status(200).send(device);
    });
}

function update(req, res, next) {
  const { id: _id } = req.params;
  Device.findByIdAndUpdate(_id, req.body)
    .then( device => res.status(200).send(device) )
    .catch( err => res.status(500).send(err) );
}

function _delete(req, res, next) {
  const { id: _id } = req.params;
  Device.findByIdAndDelete({ _id })
    .then( device => res.status(200).send(device) )
    .catch( err => res.status(500).send(device) );
}

module.exports = router;
