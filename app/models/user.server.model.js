// using the ref to reference another document
//
// Load the Mongoose module and Schema object
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define a new 'Schema'
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        // Set an email index
        index: true,
        // Validate the email format
        match: /.+\@.+\..+/
    },

    username: {
        type:String,
        index:true,
        unique:true
    },
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password.length >= 6,
            'Password Should Be Longer'
        ]
    },
    role: String
});

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Student' model out of the 'StudentSchema'
mongoose.model('User', UserSchema);
