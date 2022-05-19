/*/ Enregistrement du router dans l'application 

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Routes pour s'incrir et se connecter 

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;*/
