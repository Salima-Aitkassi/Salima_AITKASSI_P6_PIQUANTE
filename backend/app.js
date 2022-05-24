const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const userRoutes = require('./routes/user');
const path = require('path');
//var sauceRoutes = require('./routes/sauce')

// Connexion BDD MongoDB

mongoose.connect(process.env.DATABASE_URL,

    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log(error, 'Connexion à MongoDB échouée !'));

/*Middleware Header pour contourner les erreurs en débloquant certains systèmes 
de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur */

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
})

app.use('/api/auth', userRoutes);
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));








module.exports = app;
