const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');
const md5 = require('md5'); 

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email, password: md5(password) })
    .then( user => {
      if (user) {
        const sessionId = uuid();
        const token = jwt.sign({ id: user._id.toString() }, sessionId);
        user.session.id = sessionId;
        user.session.token = token;
        user.save();
        res.send({
          token
        })
      } else {
        res.status(401).send({});
      }
      
    })
    .catch( err => res.send(err) );
});

module.exports = router;