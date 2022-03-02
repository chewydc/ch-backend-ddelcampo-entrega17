//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------

import mongoose from 'mongoose';
import config from '../../config.js';
import passportLocalMongoose from 'passport-local-mongoose';

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

// Connecting Mongoose
mongoose.connect(config.mongodb.url, advancedOptions)

// Setting up the schema
const User = new mongoose.Schema({
    username: String,
    password: String,
});


// Setting up the passport plugin
User.plugin(passportLocalMongoose);
let userModel =  mongoose.model('User', User);

export default userModel;