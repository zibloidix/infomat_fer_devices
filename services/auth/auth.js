const { getAuthHeader, getToken, getUserByToken } = require('../../utils/get-user-token');
const hidePrivateFields = require('../../utils/hide-private-fields');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
  const authHeader = getAuthHeader(req);
  const token = getToken(authHeader);
  const user = await getUserByToken(token);
  const isValidToken = validateToken(token, user);
  return isValidToken 
    ? (req.user = hidePrivateFields(user), next()) 
    : res.status(401).send();
}

function validateToken(token, user) {
  if (user && token) {
    const tokenData = jwt.verify(token, user.session.id);
    const { id } = tokenData;
    return user._id.toString() === id;
  }
  return false;
}

module.exports = auth;
