const {Router} = require('express');
const { postArchivoDatos } = require('../controllers/archivoDatos');
const router = Router();

router.post('/:id_paciente',postArchivoDatos);

module.exports = router;