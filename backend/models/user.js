// Modèle utilisateur 

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema utilisateur 
const userSchema = mongoose.Schema({
    email: { type: string, required: true, unique: true },
    password: { type: string, required: true }

})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);