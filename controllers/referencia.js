const connection = require('../database/config');
const {request,response} = require('express');

const getReferencia = async (req=request,res=response) => {
    try {
        const [row,fields] = (await connection.execute('SELECT * FROM referencia'));   
        res.status(200).json({referencias:row})
    } catch (error) {
        res.status(400).json({msg:'No se pudo obtener registros de la tabla referencias'})
    } finally{
        connection.releaseConnection();
    }
}

module.exports = {
    getReferencia
}