const connection = require('../database/config');
const {request,response} = require('express');





//Verificar que no haya datos nulos en el json que se esta enviando
const noDatosNulos = (req=request,res=response,next) => {
    const {nombre,a_paterno,a_materno,edad,sexo,id_estatus,id_unidad,dm,hta,ob,dis,sm} = req.body;
    (nombre.length > 0 && a_paterno.length > 0 && a_materno.length > 0 && sexo.length > 0 && edad && id_estatus && id_unidad && dm >= 0 && hta >= 0 && ob >= 0 && dis >= 0 && sm >= 0) ? next() : res.status(500).json({msg:'Los campos son obligatorios!'});
}

//Verificar que el paciente que vamos a crear o editar... no exista en la base de datos
const existenciaPaciente = async (req=request,res=response,next) => {
    const {nombre,a_paterno,a_materno} = req.body;
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM paciente WHERE nombre = ? AND a_paterno = ? AND a_materno = ?',[nombre,a_paterno,a_materno]));
        
        row.length > 0 ? res.status(500).json({msg:'El paciente ya existe'}) : next();     
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existenciaPaciente'});
    } finally{
        connection.releaseConnection();
    }
}

//Verificar que el id de la unidad exista en la tabla unidad en la base de datos
const existenciaUnidad = async (req=request,res=response,next) => {
    const {id_unidad} = req.body;
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM unidad WHERE id_unidad = ?',[id_unidad]));
        
        row.length > 0 ? next() : res.status(500).json({msg:'El id_unidad de unidad salud no existe'}) ;   
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existenciaUnidad'});
    } finally{
        connection.releaseConnection();
    }
}

//Verificar que el id de estatus exista en la tabla estatus en la base de datos
const existenciaEstatus = async (req=request,res=response,next) => {
    const {id_estatus} = req.body;
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM estatus WHERE id_estatus = ?',[id_estatus]));
        
        row.length > 0 ? next() : res.status(500).json({msg:'El id_estatus de estatus no existe'}) ;   
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existenciaEstatus'});
    } finally{
        connection.releaseConnection();
    }
}




//Asegurar que el id del paciente a editar o eliminar... existe
const existeID = async (req=request,res=response,next) => {
    const {id} = req.params;
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM paciente WHERE id_paciente = ?',[id]));
        
        row.length > 0 ? next() : res.status(500).json({msg:'Ese id no existe en la tabla paciente'}) ;   
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existeID'});
    } finally{
        connection.releaseConnection();
    }
}

module.exports = {
    noDatosNulos,
    existenciaPaciente,
    existenciaUnidad,
    existenciaEstatus,
    existeID
}