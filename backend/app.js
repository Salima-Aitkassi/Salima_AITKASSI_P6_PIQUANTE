const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const helmet = require('helmet');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');


// Connexion BDD MongoDB

mongoose.connect(process.env.DATABASE_URL,

    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log(error, 'Connexion à MongoDB échouée !'));

/*Middleware Header pour contourner les erreurs en débloquant certains systèmes 
de sécurité CORS */

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

app.use(express.json());
app.use(helmet());
app.use('/api/auth', userRoutes);
app.use('/api/auth', sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));


module.exports = app;
