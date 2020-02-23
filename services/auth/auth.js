const User = require('../../models/user');
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
  const authHeader = getAuthHeader(req);
  const token = getToken(authHeader);
  const user = await getUserByToken(token);
  const isValidToken = validateToken(token, user);
  return isValidToken ? next() : res.status(401).send();
}

function getAuthHeader(req) {
  const { authorization } = req.headers;
  return authorization;
}

function getToken(auth = '') {
  const authRegExpMatch = auth.match(/^(Bearer)\s{1}(.+)/i);
  if (authRegExpMatch) {
    return authRegExpMatch[2];
  }
}

function getUserByToken(token) {
  return User.findOne({ 'session.token': token })
    .then( user => user );
}

function validateToken(token, user) {
  if (user) {
    const tokenData = jwt.verify(token, user.session.id);
    const { id } = tokenData;
    return user._id.toString() === id;
  }
  return false;
  
}

module.exports = auth;
