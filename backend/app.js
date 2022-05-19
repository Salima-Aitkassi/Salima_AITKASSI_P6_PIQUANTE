const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL,

    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

module.exports = app;