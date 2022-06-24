const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const helmet = require('helmet');
const expressRateLimit = require('express-rate-limit');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');


/*Middleware Header pour contourner les erreurs en débloquant certains systèmes 
de sécurité CORS */

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// Implémentation de express-rate-limit (sécurité supplémentaire) : 

const limiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 100, // nombre de requêtes maximales pour une adresse IP 

})

// Connexion BDD MongoDB

mongoose.connect(process.env.DATABASE_URL,

    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log(error, 'Connexion à MongoDB échouée !'));


app.use(express.json());
app.use(limiter);
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));


module.exports = app;
