const connection = require('../database/config');
const {request,response} = require('express');

const getMotivoBaja = async (req=request,res=response) => {
    try {
        const [row,fields] = (await connection.execute('SELECT * FROM motivo_baja;'));   
        res.status(200).json({referencias:row})
    } catch (error) {
        res.status(400).json({msg:'No se pudo obtener registros de la tabla motivo_baja'})
    } finally{
        connection.releaseConnection();
    }
}

module.exports = {
    getMotivoBaja
}