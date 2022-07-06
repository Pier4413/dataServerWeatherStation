const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	pressure: {type: Number, required: true, default: 0},
    humidity: {type: Number, required: true, default: 0}
},
{
    timestamps: true
})

const Miscellaneous = mongoose.model('Miscellaneous', schema);

module.exports = Miscellaneous;