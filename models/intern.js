const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
  name: { type: String, require: true},
  number: { type: String, require: true, unique: true },
  provider: { type: String, require: true},
  amount: { type: String, require: true}
})
 

module.exports = mongoose.model('Intern', internSchema);