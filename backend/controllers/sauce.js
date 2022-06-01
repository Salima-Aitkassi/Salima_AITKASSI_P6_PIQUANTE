const Sauce = require('../models/sauce');
const fs = require('fs');


// Création de la sauce : 

exports.createSauce = (req, res, next) => {

    const sauceObject = (req.body.sauce);

    delete sauceObject._id;

    const sauce = new Sauce({
        ...sauceObject,

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    });
    // Sauvegarder   la sauce dans la BDD : 
    sauce.save()

        .then(() => res.status(201).json({
            message: 'Sauce enregistrée !'
        }))

        .catch(error => res.status(400).json({
            error
        }));


};

// Modifier la sauce : 

exports.modifySauce = (req, res, next) => {
    let sauceObject = {};
    req.file ? (

        Sauce.findOne({
            _id: req.params.id
        }).then((sauce) => {

            const filename = sauce.imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`)
        }),
        sauceObject = {

            ...(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename
                }`,
        }
    ) : (
        sauceObject = {
            ...req.body
        }
    )
    Sauce.updateOne(

        {
            _id: req.params.id
        }, {
        ...sauceObject,
        _id: req.params.id
    }
    )
        .then(() => res.status(200).json({
            message: 'Sauce modifiée !'
        }))
        .catch((error) => res.status(400).json({
            error
        }))
}

// Supprimer la sauce :

exports.deleteSauce = (req, res, next) => {

    Sauce.findOne({
        _id: req.params.id
    })
        .then(sauce => {

            const filename = sauce.imageUrl.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {

                Sauce.deleteOne({
                    _id: req.params.id
                })
                    .then(() => res.status(200).json({
                        message: 'Sauce supprimée !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            });
        })
        .catch(error => res.status(500).json({
            error
        }));
};

//  Récupérer une seule sauce, avec son id depuis la BDD

exports.getOneSauce = (req, res, next) => {

    Sauce.findOne({
        _id: req.params.id
    })

        .then(sauce => res.status(200).json(sauce))

        .catch(error => res.status(404).json({
            error
        }));
};

// Récupérer toutes les sauces depuis la BDD : 

exports.getAllSauce = (req, res, next) => {

    Sauce.find()

        .then(sauces => res.status(200).json(sauces))

        .catch(error => res.status(400).json({
            error
        }));
};
