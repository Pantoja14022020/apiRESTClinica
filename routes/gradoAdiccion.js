const {Router} = require('express');
const { getGradoAdiccion } = require('../controllers/gradoAdiccion');
const router = Router();

router.get('/',getGradoAdiccion);

module.exports = router;