const connection = require('../database/config');
const {request,response} = require('express');

const getEstadoPie = async (req=request,res=response) => {
    try {
        const [row,fields] = (await connection.execute('SELECT * FROM estado'));   
        res.status(200).json({estados_de_pie:row})
    } catch (error) {
        res.status(400).json({msg:'No se pudo obtener registros de la tabla estado_pie'})
    } finally{
        connection.releaseConnection();
    }
}

module.exports = {
    getEstadoPie
}