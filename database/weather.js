const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	wind: {type: mongoose.Schema.Types.ObjectId, ref: "Wind"},
    temperature: {type: mongoose.Schema.Types.ObjectId, ref: "Temperature"},
    position: {type: mongoose.Schema.Types.ObjectId, ref: "Position"},
    misc: {type: mongoose.Schema.Types.ObjectId, ref: "Miscellaneous"}
},
{
    timestamps: true
})

const Weather = mongoose.model('Weather', schema);

module.exports = Weather;