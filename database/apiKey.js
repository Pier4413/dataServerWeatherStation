const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	key: {type: String},
  methods: {type: Array}
},
{
    timestamps: true
})

const ApiKey = mongoose.model('Keys', schema);

module.exports = ApiKey;