const bcrypt = require('bcrypt');
const user = require('../models/user')

// Fonction d'inscription pour enregistrer utilisateur dans la BDD

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