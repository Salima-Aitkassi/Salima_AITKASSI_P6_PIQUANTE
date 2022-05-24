// Enregistrement du router dans l'application 

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Routes pour s'inscrire et se connecter 

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/:id', userCtrl.getUser);
module.exports = router;

/*module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/signup", userCtrl.signup);
}
*/