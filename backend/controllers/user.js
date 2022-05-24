const bcrypt = require('bcrypt');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');


// Fonction d'inscription pour enregistrer utilisateur dans la BDD :

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)

        // Création du nouvel utilisateur

        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()

                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction de connexion de l'utilisateur :

// Vérification de l'existance du user dans la BDD 

exports.login = (req, res, next) => {
    user.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            // Comparaison  du mot de passe avec le hash enregistré dans la BDD
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getUser = (req, res, next) => {
    return res.status(200).json({ message: 'salut' })
}