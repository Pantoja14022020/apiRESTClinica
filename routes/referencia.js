const {Router} = require('express');
const { getReferencia } = require('../controllers/referencia');
const router = Router();

router.get('/',getReferencia);

module.exports = router;