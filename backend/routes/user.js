// Enregistrement du router dans l'application 

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/password');

// Routes pour s'inscrire et se connecter 

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/:id', userCtrl.getUser);
module.exports = router;

