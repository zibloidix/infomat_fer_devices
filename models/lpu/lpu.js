const mongoose = require('mongoose');
const { Schema } = mongoose;

const LpuSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: [true, 'Название ЛПУ не указано']
  },
  code: {
    type: Number,
    required: true,
    validate: {
      validator: function(codeValue) {
        return `${codeValue}`.match(/^65[0-9]{4}$/gi);
      },
      message: function(props) {
        return `Вы указали значение - ${props.value}. Ожидается значение вида: 651107`;
      }
    }
  }
});

const Lpu = mongoose.model('Lpu', LpuSchema);

module.exports = Lpu;