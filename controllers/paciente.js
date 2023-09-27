const connection = require('../database/config');
const {request,response} = require('express');

const getPaciente = async (req=request,res=response) => {
    try {
        

        const [row,fields] = (await connection.execute('SELECT p.id_paciente,p.nombre,p.a_paterno,p.a_materno,p.edad,p.sexo,e.descripcion AS estatus,u.nombre AS unidad,p.dm,p.hta,p.ob,p.dis,p.sm FROM paciente p JOIN estatus e ON p.id_estatus = e.id_estatus JOIN unidad u ON p.id_unidad = u.id_unidad'));   
        

        res.status(200).json({pacientes:row})
    } catch (error) {
        
        res.status(400).json({msg:'No se pudo obtener pacientes'})
    } finally{
        connection.releaseConnection();
    }
}

const getPacienteId = async (req=request,res=response) => {
    const {id} = req.params;
    try {
        
        const [row,fields] = (await connection.execute('SELECT p.id_paciente,p.nombre,p.a_paterno,p.a_materno,p.edad,p.sexo,e.descripcion AS estatus,u.nombre AS unidad,p.dm,p.hta,p.ob,p.dis,p.sm FROM paciente p JOIN estatus e ON p.id_estatus = e.id_estatus JOIN unidad u ON p.id_unidad = u.id_unidad WHERE p.id_paciente = ?',[id]));   

        res.status(200).json({paciente:row})
    } catch (error) {
        
        res.status(400).json({msg:'No se pudo obtener paciente'})
    } finally{
        connection.releaseConnection();
    }
}

const postPaciente = async (req=request,res=response) => {
    const {nombre,a_paterno,a_materno,edad,sexo,id_estatus,id_unidad,dm,hta,ob,dis,sm} = req.body;
    try {
        
        const [row,fields] = (await connection.execute('INSERT INTO paciente(nombre,a_paterno,a_materno,edad,sexo,id_estatus,id_unidad,dm,hta,ob,dis,sm) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',[nombre,a_paterno,a_materno,edad,sexo,id_estatus,id_unidad,dm,hta,ob,dis,sm])); 

        res.status(200).json({added:true})
    } catch (error) {
        
        res.status(400).json({added:false})
    } finally{
        connection.releaseConnection();
    }
}


const putPaciente = async (req=request,res=response) => {
    const {id} = req.params;
    const {nombre,a_paterno,a_materno,edad,sexo,id_estatus,id_unidad,dm,hta,ob,dis,sm} = req.body;
    try {
        
        const [row,fields] = (await connection.execute('UPDATE paciente set nombre= ?, a_paterno = ?, a_materno = ?, edad = ? , sexo = ?, id_estatus = ? , id_unidad = ? , dm = ? , hta = ? , ob = ? , dis = ? , sm = ? WHERE id_paciente = ?',[nombre,a_paterno,a_materno,edad,sexo,id_estatus,id_unidad,dm,hta,ob,dis,sm,id])); 

        res.status(200).json({edited:true})
    } catch (error) {
        
        res.status(400).json({edited:false})
    } finally{
        connection.releaseConnection();
    }
}


const deletePaciente = async (req=request,res=response) => {
    const {id} = req.params;
    try {
        
        const [row,fields] = (await connection.execute('DELETE FROM paciente WHERE id_paciente = ?',[id]));

        res.status(200).json({deleted:true});
    } catch (error) {
        
        res.status(400).json({deleted:false})
    } finally{
        connection.releaseConnection();
    }
}

module.exports = {
    getPaciente,
    getPacienteId,
    postPaciente,
    putPaciente,
    deletePaciente
}







//post - body - JSON
/*{
    "nombre": "Leonor",
    "a_paterno": "Serrano",
    "a_materno": "Martinez",
    "edad": 69,
    "sexo": "M",
    "id_estatus": 1,
    "id_unidad": 1,
    "dm": 0,
    "hta": 1,
    "ob": 1,
    "dis": 0,
    "sm": 0
}*/