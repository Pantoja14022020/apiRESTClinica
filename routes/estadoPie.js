const {Router} = require('express');
const { getEstadoPie } = require('../controllers/estadoPie');
const router = Router();

router.get('/',getEstadoPie);

module.exports = router;