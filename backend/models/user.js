const mongoose = require('mongoose');
const { stringify } = require('querystring');

const userSchema = mongoose.Schema({
    email: { type: string, required: true, unique: true },
    password: { type: string, required: true }

})

module.exports = mongoose.model('user', userSchema);