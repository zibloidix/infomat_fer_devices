const User = require('../../models/user');

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

module.exports = {
  getAuthHeader, 
  getToken,
  getUserByToken,
};

