const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const md5 = require('md5');

const UserSchema = new Schema({
  lpu: { 
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Lpu'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(email) {
        return true;
      }, 
      message(props) {
        return `${props.value} - Не является адресом, допустимым для email`;
      }
    }
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  session: {
    id: String,
    token: String
  }
});

const User = model('User', UserSchema);

module.exports = User;