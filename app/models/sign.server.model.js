// Load the Mongoose module and Schema object
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define a new SignSchema
const SignSchema = new Schema({
    //
    pulseRate: String,
    bloodPressure: String,
    weight: String,
    temperature: String,
    respiratory: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
//
mongoose.model('Sign', SignSchema);
