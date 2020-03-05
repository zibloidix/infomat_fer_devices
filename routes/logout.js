const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', logout);

async function logout(req, res, next) {
  const email = getEmail(req);
  const user = await getUserByEmail(email);
  if (!Object.is(user, null)) {
    dropUserSession(user, res);
  } else {
    res.status(404).send();
  }
}

function getEmail(req) {
  const { email } = req.body;
  return email;
}

function getUserByEmail(email) {
  return User.findOne({ email })
    .then( user => user );
}

function dropUserSession(user, res) {
  const { _id } = user;
  const session = { id: null, token: null }
  User.findByIdAndUpdate(_id, { session })
    .then( user => res.status(200).send() )
    .catch( err => res.status(500).send(err) );
}

module.exports = router;