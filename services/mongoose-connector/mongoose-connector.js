const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/infomat-fer-devices', {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
    useCreateIndex: true,
});