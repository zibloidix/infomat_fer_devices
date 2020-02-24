const Device = require('../models/device');
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  const { activateCode } = req.body;
  Device.findOneAndUpdate({ activateCode }, { isActivated: true }, (err, device) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const { _id } = device;
      res.status(200).send(device);
    }
  })
});

module.exports = router;