const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	latitude: {type: Number, required: true, default: 0},
    longitude: {type: Number, required: true, default: 0}
},
{
    timestamps: true
})

const Position = mongoose.model('Position', schema);

module.exports = Position;