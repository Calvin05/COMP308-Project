// Load the Mongoose module and Schema object
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define a new SignSchema
const TipSchema = new Schema({
    //
    tip:String
});
//
mongoose.model('Tip', TipSchema);