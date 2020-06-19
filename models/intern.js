const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
  name: { type: String, require: true},
  number: { type: String, require: true, unique: true },
  track: { type: String, require: true },
  provider: { type: String, require: true},
  amount: { type: String, require: true},
  date: {type : Date, default: Date.now}
})
 

module.exports = mongoose.model('Intern', internSchema);