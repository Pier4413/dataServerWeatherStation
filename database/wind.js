const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	speed: {type: Number, required: true, default: 0},
    direction: {type: Number, required: true, default: 0}
},
{
    timestamps: true
})

const Wind = mongoose.model('Wind', schema);

module.exports = Wind;