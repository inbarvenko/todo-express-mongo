const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
})

module.exports = mongoose.model('TodoTask', todoTaskSchema);