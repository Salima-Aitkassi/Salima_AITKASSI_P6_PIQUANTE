const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');

// ajout de multer pour enregistrer les images sur le server:
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauce');

/*/ Implémentation du CRUD pour les sauces :

router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

// route pour les likes des utilisateurs :

router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;*/

// Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers

// Route qui permet de créer "une sauce"
// Capture et enregistre l'image, analyse la sauce en utilisant une chaîne de caractères et l'enregistre dans la base de données, en définissant correctement son image URL. Remet les sauces aimées et celles détestées à 0, et les sauces usersliked et celles usersdisliked aux tableaux vides.
router.post('/', auth, multer, saucesCtrl.createSauce);

// Route qui permet de modifier "une sauce"
// Met à jour la sauce avec l'identifiant fourni. Si une image est téléchargée, capturez-la et mettez à jour l'imageURL des sauces. Si aucun fichier n'est fourni, les détails de la sauce figurent directement dans le corps de la demande(req.body.name,req.body.heat etc). Si un fichier est fourni, la sauce avec chaîne est en req.body.sauce.
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

// Route qui permet de supprimer "une sauce"
// Supprime la sauce avec l'ID fourni.
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// Route qui permet de cliquer sur une des sauces précise
// Renvoie la sauce avec l'ID fourni
router.get('/:id', auth, saucesCtrl.getOneSauce);

// Route qui permet de récupérer toutes les sauces
// Renvoie le tableau de toutes les sauces dans la base de données
router.get('/', auth, saucesCtrl.getAllSauce);

// Route qui permet de gérer les likes des sauces
// Définit le statut "j'aime" pour userID fourni. Si j'aime = 1,l'utilisateur aime la sauce. Si j'aime = 0,l'utilisateur annule ce qu'il aime ou ce qu'il n'aime pas. Si j'aime =-1, l'utilisateur n'aime pas la sauce.L'identifiant de l'utilisateur doit être ajouté ou supprimé du tableau approprié, engardant une trace de ses préférences et en l'empêchant d'aimer ou de ne pas aimer la même sauce plusieurs fois. Nombre total de "j'aime" et de "je n'aime pas" à mettre à jour avec chaque "j'aime".
router.post('/:id/like', auth, saucesCtrl.likeDislike)

module.exports = router;