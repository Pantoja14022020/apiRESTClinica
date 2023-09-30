const connection = require('../database/config');
const {request,response} = require('express');

const getGradoAdiccion = async (req=request,res=response) => {
    try {
        const [row,fields] = (await connection.execute('SELECT * FROM grado_adiccion_tabaco'));   
        res.status(200).json({grados_de_adiccion:row})
    } catch (error) {
        res.status(400).json({msg:'No se pudo obtener registros de la tabla grado_adiccion_tabaco'})
    } finally{
        connection.releaseConnection();
    }
}

module.exports = {
    getGradoAdiccion
}