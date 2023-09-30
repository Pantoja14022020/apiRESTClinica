const {Router} = require('express');
const { getMotivoBaja } = require('../controllers/motivoBaja');
const router = Router();

router.get('/',getMotivoBaja);

module.exports = router;