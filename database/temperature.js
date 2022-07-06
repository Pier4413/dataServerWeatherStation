const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	current: {type: Number, required: true, default: 0},
    feels_like: {type: Number, required: true, default: 0}
},
{
    timestamps: true
})

const Temperature = mongoose.model('Temperature', schema);

module.exports = Temperature;