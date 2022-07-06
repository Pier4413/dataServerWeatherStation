const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	key: {type: String, required: true, default: null},
  methods: {type: Array, required: true, default: []}
},
{
    timestamps: true
})

const ApiKey = mongoose.model('ApiKey', schema);

module.exports = ApiKey;