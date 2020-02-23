const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const DeviceSchema = new Schema({
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
  os: {
    type: String,
    required: true,
    trim: true
  },
  screenWidth: {
    type: Number,
    required: true
  },
  screenHeight: {
    type: Number,
    required: true
  },
  keyboard: {
    type: Boolean,
    required: true
  },
  webCamera: {
    type: Boolean,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  activatedCode: {
    type: Number,
    required: false,
    default: () => `${ Math.random() }`.slice(3, 9)
  },
  isActivated: {
    type: Boolean,
    required: true,
    default: () => false
  }
});

const Device = model('Device', DeviceSchema);

module.exports = Device;