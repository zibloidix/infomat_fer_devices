const hidePrivateFields = require('../utils/hide-private-fields');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', create);
router.get('/', read);
router.get('/:id', readOne);
router.patch('/:id', update);
router.delete('/:id', _delete);

function create(req, res, next) {
  const user = new User(req.body);
  this.password = md5(this.password);
  user.save()
    .then( user => res.status(201).send(user) )
    .catch( err => res.status(500).send(err) );
}

function read(req, res, next) {
  User.find({})
    .populate('lpu')
    .exec( (err, users) => {
      res.status(200).send(users)
    });
}

function readOne(req, res, next) {
  const { id: _id } = req.params;
  User.findOne({ _id })
    .populate('lpu')
    .exec( (err, user) => {
      res.status(200).send(hidePrivateFields(user));
    }); 
}

function update(req, res, next) {
  const { id: _id } = req.params;
  User.findByIdAndUpdate(_id, req.body)
    .then( user => res.status(200).send(user) )
    .catch( err => req.status(500).send(err) )
}

function _delete(req, res, next) {
  const { id: _id } = req.params;
  User.findByIdAndDelete(_id)
    .then( user => res.status(200).send(user) )
    .catch( err => res.status(500).send(err) );
}



module.exports = router;
