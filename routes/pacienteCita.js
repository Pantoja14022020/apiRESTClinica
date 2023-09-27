const {Router} = require('express');
const { getPacienteCitas, getPacienteCita, postPacienteCita, putPacienteCita, deletePacienteCita } = require('../controllers/pacienteCita');
const { existeID } = require('../middlewares/paciente');
const { existeIDPaciente, noHayCamposVacios, existeIDEstadoPie, existeIDGradoAdiccionTabaco, existeIDReferencia, existeIDMotivoBaja, existeIDCita, existeIDsSugerencias, existeIDsMedicamentos } = require('../middlewares/pacienteCita');
const router = Router();

//Obtener todas las citas de un paciente, el :id es el id del paciente
router.get('/citas/paciente/:id',[
    existeID
],getPacienteCitas);

//Obtener una cita determinada de todas las citas del paciente, el :id es el id de la cita
router.get('/citas/paciente/cita/:id',[
    existeIDCita
],getPacienteCita);


//Crear una cita para un determinado paciente
router.post('/citas/paciente/cita',[
    noHayCamposVacios,
    existeIDPaciente,
    existeIDEstadoPie,
    existeIDGradoAdiccionTabaco,
    existeIDReferencia,
    existeIDMotivoBaja,
    existeIDsSugerencias,
    existeIDsMedicamentos
],postPacienteCita);


//Editar una cita determinada del paciente, el :id es el id de la cita a editar
router.put('/citas/paciente/cita/:id',[
    noHayCamposVacios,
    existeIDEstadoPie,
    existeIDGradoAdiccionTabaco,
    existeIDReferencia,
    existeIDMotivoBaja,
    existeIDPaciente,
    existeIDCita,
    existeIDsSugerencias,
    existeIDsMedicamentos
],putPacienteCita);


//Eliminar una cita determinada del paciente, el :id es el id de la cita a eliminar
router.delete('/citas/paciente/cita/:id',[
    existeIDCita
],deletePacienteCita);

module.exports = router;