const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let validateEmail = function(email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

const userSchema = mongoose.Schema({
	email: {
		type: String,
		require: true,
		trim: true,
		unique: true,
		validate: [validateEmail],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
	},
	password: {
		type: String,
		require: true
	}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);