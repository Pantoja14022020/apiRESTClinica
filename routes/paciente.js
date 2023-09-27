const {Router} = require('express');
const { getPaciente, postPaciente, putPaciente, deletePaciente, getPacienteId } = require('../controllers/paciente');
const { noDatosNulos, existenciaPaciente, existenciaUnidad, existenciaEstatus, existeID } = require('../middlewares/paciente');
const router = Router();

router.get('/',getPaciente);

router.get('/:id',[
    existeID
],getPacienteId)

router.post('/',[
    noDatosNulos,
    existenciaPaciente,
    existenciaUnidad,
    existenciaEstatus
],postPaciente);

router.put('/:id',[
    existeID,
    noDatosNulos
    //existenciaPaciente
],putPaciente);


router.delete('/:id',[
    existeID
],deletePaciente);

module.exports = router;