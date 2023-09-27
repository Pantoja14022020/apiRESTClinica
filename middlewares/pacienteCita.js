const connection = require('../database/config');
const {request,response} = require('express');


//Asegurar que existe el id de la cita a eliminar
const existeIDCita = async (req=request,res=response,next) => {
    const {id} = req.params;
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM cita WHERE id_cita = ?',[id]));
        
        row.length > 0 ? next() : res.status(500).json({msg:'El id de la cita al que se quiere acceder no existe'}) ;   
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existeIDCita'})
    } finally{
        connection.releaseConnection();
    }
}


//Asegurar que el id del paciente a relacionar con la tabla cita ... exista ...
const existeIDPaciente = async (req=request,res=response,next) => {
    const {id_paciente} = req.body;//Del json que estoy recibiendo ...  extraigo el campo id_paciente
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM paciente WHERE id_paciente = ?',[id_paciente]));
        
        row.length > 0 ? next() : res.status(500).json({msg:'El id_paciente no existe en la tabla paciente'}) ;   
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existeIDPaciente'})
    } finally{
        connection.releaseConnection();
    }
}

//Asegurar que se esta enviando todos los campos para crear cita de un paciente
const noHayCamposVacios = (req=request,res=response,next) => {
    const {fecha,peso,imc,sobrepeso,cc,pa_sistolica,pa_diastolica,gluc_ayuno,gluc_casual,hba1c,fondo_de_ojo,id_estado,colesterol_total_mg_dl,colesterol_ldl_mg_dl,colesterol_hdl_mg_dl,trigliceridos_mg_dl,microalbuminuria,creatinina,GAMEC,complicaciones,id_grado,id_referencia,id_motivo_baja,vacuna_antiinfluenza,dm,hta,obe,dlp,sm,id_paciente} = req.body;
    (fecha && peso >= 0 && imc >= 0 && sobrepeso >= 0 && cc >= 0 && pa_sistolica >= 0 && pa_diastolica >= 0 && gluc_ayuno >= 0 && gluc_casual >= 0 && hba1c >= 0 && fondo_de_ojo >= 0 && id_estado >= 0 && colesterol_total_mg_dl >= 0 && colesterol_ldl_mg_dl >= 0 && colesterol_hdl_mg_dl >= 0 && trigliceridos_mg_dl >= 0 && microalbuminuria >= 0 && creatinina >= 0 && GAMEC && (complicaciones == "" || complicaciones) && id_grado >= 0 && id_referencia >= 0 && id_motivo_baja >= 0 && vacuna_antiinfluenza >= 0 && (dm == "" || dm) && (hta == "" || hta) && (obe == "" || obe) && (dlp == "" || dlp) && (sm == "" || sm) && id_paciente >= 0) ? next() : res.status(500).json({msg:'Todos los campos son obligatorios'});
}







//Ver si existe el id_estado del estado de un pie
const existeIDEstadoPie = async(req=request,res=response,next) => {
    const {id_estado} = req.body;
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM estado_pie WHERE id_estado = ?',[id_estado]));
        
        row.length > 0 ? next() : res.status(500).json({msg:'El id_estado no existe en la tabla estado_pie'});
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existeIDEstadoPie'})
    } finally{
        connection.releaseConnection();
    }    
}


//Ver si existe el id_grado en la tabla grado_adiccion_tabaco
const existeIDGradoAdiccionTabaco = async(req=request,res=response,next) => {
    const {id_grado} = req.body;
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM grado_adiccion_tabaco WHERE id_grado = ?',[id_grado]));
        
        row.length > 0 ? next() : res.status(500).json({msg:'El id_grado no existe en la tabla grado_adiccion_tabaco'});   
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existeIDGradoAdiccionTabaco'})
    } finally{
        connection.releaseConnection();
    }
}

//Veri si existe el id_referencia en la tabla referencia
const existeIDReferencia = async (req=request,res=response,next) => {
    const {id_referencia} = req.body;
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM referencia WHERE id_referencia = ?',[id_referencia]));
        
        row.length > 0 ? next() : res.status(500).json({msg:'El id_referencia no existe en la tabla referencia'});    
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existeIDReferencia'})
    } finally{
        connection.releaseConnection();
    }    
}


//Ver si existe el id_motivo_baja en la tabla motivo_baja
const existeIDMotivoBaja = async(req=request,res=response,next) => {
    const {id_motivo_baja} = req.body;
    try {
        
        const [row,fields] = (await connection.execute('SELECT * FROM motivo_baja WHERE id_motivo_baja = ?',[id_motivo_baja]));
        
        row.length > 0 ? next() : res.status(500).json({msg:'El id_motivo_baja no existe en la tabla motivo_baja'});    
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existeIDMotivoBaja'})
    } finally{
        connection.releaseConnection();
    }
}

//Ver que exista las claves de sugerencias en la tabla sugerencia
const existeIDsSugerencias = async (req=request,res=response,next) => {
    const {no_farmacologico} = req.body; //Obtenemos el arreglo de sugerencias
    try {
        if(no_farmacologico.length > 0){ //Si el arreglo tiene valores
            let continua = true;
            
            const clavesEncontradas = no_farmacologico.map(async clave => {
                const [row,fields] = await connection.execute('SELECT * FROM sugerencia WHERE clave = ?',[clave]);
                if(row.length <= 0){
                    continua = false;
                }
            });
    
            await Promise.all(clavesEncontradas);
            
            continua ? next() : res.status(500).json({msg:'Clave de sugerencia invalida'});
    
        }else{//El arreglo esta vacio
            next();
        }   
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existeIDsSugerencias'})
    } finally{
        connection.releaseConnection();
    }
}

//Ver que exista las claves de la tabla medicamento
const existeIDsMedicamentos = async (req=request,res=response,next) => {
    const {farmacologicos} = req.body; //Obtenemos el arreglo de medicamentos
    try {
        if(farmacologicos.length > 0){ //Si el arreglo tiene valores
        
            let continua = true;
            
            const filasEncontradas = farmacologicos.map(async id_medicamento => {
                const [row,fields] = await connection.execute('SELECT * FROM medicamento WHERE id_medicamento = ?',[id_medicamento]);
                if(row.length <= 0){
                    continua = false;
                }
            });
    
            await Promise.all(filasEncontradas);
            
            continua ? next() : res.status(500).json({msg:'Id de medicamento invalida'});
    
        }else{//El arreglo esta vacio
            next();
        }   
    } catch (error) {
        
        res.status(500).json({msg:'Error en el middleware existeIDsMedicamentos'})
    } finally{
        connection.releaseConnection();
    }
}

module.exports = {
    existeIDPaciente,
    noHayCamposVacios,
    existeIDEstadoPie,
    existeIDGradoAdiccionTabaco,
    existeIDReferencia,
    existeIDMotivoBaja,
    existeIDCita,
    existeIDsSugerencias,
    existeIDsMedicamentos
}