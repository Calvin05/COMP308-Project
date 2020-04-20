// Load the Mongoose module and Schema object
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define a new SignSchema
const ResponseSchema = new Schema({
    //
    name: String,
    email: String,
    phone: String,
    address: String,
    relationship: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
//
mongoose.model('Response', ResponseSchema);