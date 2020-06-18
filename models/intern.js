const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
  name: `String`,
  number: 'String',
  provider: 'String',
  amount: 'String'
})

module.exports = mongoose.model('Intern', internSchema);