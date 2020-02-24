function hidePrivateFields(user) {
  const userClone = JSON.parse(JSON.stringify(user));
  delete userClone.password;
  delete userClone.session;
  return userClone;
}

module.exports = hidePrivateFields;