const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', (req, res, next) => {
  const { _id } = req.body;
  const session = {
    id: null,
    token: null
  }

  User.findByIdAndUpdate(_id, { session })
    .then( user => res.status(200).send() )
    .catch( err => res.status(500).send(err) );

});

module.exports = router;