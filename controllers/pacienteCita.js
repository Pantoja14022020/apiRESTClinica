const {request,response} = require('express');
const connection = require('../database/config');

//Obtener todas las citas de un paciente
const getPacienteCitas = async (req=request,res=response) => {
    const {id} = req.params;
    try {
        
        const [row,fields] = (await connection.execute('SELECT c.id_cita,c.fecha, c.peso, c.imc, c.sobrepeso, c.cc, c.pa_sistolica, c.pa_diastolica, c.gluc_ayuno, c.gluc_casual, c.hba1c, c.fondo_de_ojo, ep.descripcion AS revision_pie, c.colesterol_total_mg_dl, c.colesterol_ldl_mg_dl, c.colesterol_hdl_mg_dl, c.trigliceridos_mg_dl, c.microalbuminuria, c.creatinina, c.no_farmacologico, c.farmacologicos ,c.GAMEC, c.complicaciones, gat.descripcion AS grado_adiccion_al_tabaco, r.descripcion AS referencia, mb.descripcion AS motivo_baja, c.vacuna_antiinfluenza, c.dm, c.hta, c.obe, c.dlp, c.sm, c.id_paciente FROM cita c JOIN estado_pie ep ON c.id_estado = ep.id_estado JOIN grado_adiccion_tabaco gat ON c.id_grado = gat.id_grado JOIN referencia r ON c.id_referencia = r.id_referencia JOIN motivo_baja mb ON c.id_motivo_baja = mb.id_motivo_baja WHERE id_paciente = ?;',[id]));
        
        res.status(200).json({citas:row})
    } catch (error) {
        
        res.status(400).json({msg:`No se pudo obtener citas del paciente con el id: ${id}`})
    } finally{
        connection.releaseConnection();
    }
}

//Obtener una cita determinada de un paciente
const getPacienteCita = async (req=request,res=response) => {
    const {id} = req.params;
    try {
        
        const [row,fields] = (await connection.execute('SELECT c.fecha, c.peso, c.imc, c.sobrepeso, c.cc, c.pa_sistolica, c.pa_diastolica, c.gluc_ayuno, c.gluc_casual, c.hba1c, c.fondo_de_ojo, ep.descripcion AS revision_pie, c.colesterol_total_mg_dl, c.colesterol_ldl_mg_dl, c.colesterol_hdl_mg_dl, c.trigliceridos_mg_dl, c.microalbuminuria, c.creatinina, c.no_farmacologico, c.farmacologicos, c.GAMEC, c.complicaciones, gat.descripcion AS grado_adiccion_al_tabaco, r.descripcion AS referencia, mb.descripcion AS motivo_baja, c.vacuna_antiinfluenza, c.dm, c.hta, c.obe, c.dlp, c.sm FROM cita c JOIN estado_pie ep ON c.id_estado = ep.id_estado JOIN grado_adiccion_tabaco gat ON c.id_grado = gat.id_grado JOIN referencia r ON c.id_referencia = r.id_referencia JOIN motivo_baja mb ON c.id_motivo_baja = mb.id_motivo_baja WHERE id_cita = ?;',[id]));
        
        res.status(200).json({cita:row})
    } catch (error) {
        
        res.status(400).json({msg:`No se pudo obtener cita con el id: ${id}`})
    } finally{
        connection.releaseConnection();
    }
}

//Crear una cita para un determinado paciente
const postPacienteCita = async (req=request,res=response) => {
    try {

        const {fecha,peso,imc,sobrepeso,cc,pa_sistolica,pa_diastolica,gluc_ayuno,gluc_casual,hba1c,fondo_de_ojo,id_estado,colesterol_total_mg_dl,colesterol_ldl_mg_dl,colesterol_hdl_mg_dl,trigliceridos_mg_dl,microalbuminuria,creatinina,no_farmacologico,farmacologicos,GAMEC,complicaciones,id_grado,id_referencia,id_motivo_baja,vacuna_antiinfluenza,dm,hta,obe,dlp,sm,id_paciente} = req.body;
        let medicamentos = '';
        let sugerencias = '';

        

        const get_medicamentos = farmacologicos.map( async id_medicamento => {
            const [row,fields] = (await connection.execute('SELECT * FROM medicamento WHERE id_medicamento = ?',[id_medicamento]));
            medicamentos += `${row[0].descripcion}-`;
        });

        await Promise.all(get_medicamentos);

        const get_sugerencias = no_farmacologico.map( async clave => {
            const [row,fields] = (await connection.execute('SELECT * FROM sugerencia WHERE clave = ?',[clave]));
            sugerencias += `${row[0].descripcion}-`;
        });

        await Promise.all(get_sugerencias);

        const [row,fields] = (await connection.execute('INSERT INTO cita(fecha,peso,imc,sobrepeso,cc,pa_sistolica,pa_diastolica,gluc_ayuno,gluc_casual,hba1c,fondo_de_ojo,id_estado,colesterol_total_mg_dl,colesterol_ldl_mg_dl,colesterol_hdl_mg_dl,trigliceridos_mg_dl,microalbuminuria,creatinina,no_farmacologico,farmacologicos,GAMEC,complicaciones,id_grado,id_referencia,id_motivo_baja,vacuna_antiinfluenza,dm,hta,obe,dlp,sm,id_paciente) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[fecha,peso,imc,sobrepeso,cc,pa_sistolica,pa_diastolica,gluc_ayuno,gluc_casual,hba1c,fondo_de_ojo,id_estado,colesterol_total_mg_dl,colesterol_ldl_mg_dl,colesterol_hdl_mg_dl,trigliceridos_mg_dl,microalbuminuria,creatinina,sugerencias,medicamentos,GAMEC,complicaciones,id_grado,id_referencia,id_motivo_baja,vacuna_antiinfluenza,dm,hta,obe,dlp,sm,id_paciente]));
        
        

        res.status(200).json({added:true});
    } catch (error) {
        console.log(error)
        res.status(400).json({added:false})
    } finally {
        connection.releaseConnection();
    }
}

//Editar una cita determinada de un paciente determinado
const putPacienteCita = async (req=request,res=response) => {
    const {id} = req.params;
    const {fecha,peso,imc,sobrepeso,cc,pa_sistolica,pa_diastolica,gluc_ayuno,gluc_casual,hba1c,fondo_de_ojo,id_estado,colesterol_total_mg_dl,colesterol_ldl_mg_dl,colesterol_hdl_mg_dl,trigliceridos_mg_dl,microalbuminuria,creatinina,no_farmacologico,farmacologicos,GAMEC,complicaciones,id_grado,id_referencia,id_motivo_baja,vacuna_antiinfluenza,dm,hta,obe,dlp,sm,id_paciente} = req.body;
    try {

        let medicamentos = '';
        let sugerencias = '';

        

        const get_medicamentos = farmacologicos.map( async id_medicamento => {
            const [row,fields] = (await connection.execute('SELECT * FROM medicamento WHERE id_medicamento = ?',[id_medicamento]));
            medicamentos += `${row[0].descripcion}-`;
        });

        await Promise.all(get_medicamentos);

        const get_sugerencias = no_farmacologico.map( async clave => {
            const [row,fields] = (await connection.execute('SELECT * FROM sugerencia WHERE clave = ?',[clave]));
            sugerencias += `${row[0].descripcion}-`;
        });

        await Promise.all(get_sugerencias);

        const [row,fields] = (await connection.execute('UPDATE cita set fecha = ?, peso = ?, imc = ? , sobrepeso = ?, cc = ?, pa_sistolica = ?, pa_diastolica = ?, gluc_ayuno = ?, gluc_casual = ?, hba1c = ?, fondo_de_ojo = ?, id_estado = ?, colesterol_total_mg_dl = ?, colesterol_ldl_mg_dl = ?, colesterol_hdl_mg_dl = ?, trigliceridos_mg_dl = ?, microalbuminuria = ?, creatinina = ?, no_farmacologico = ?, farmacologicos = ?, GAMEC = ?, complicaciones = ?, id_grado = ?, id_referencia = ?, id_motivo_baja = ?, vacuna_antiinfluenza = ?, dm = ?, hta = ?, obe = ?, dlp = ?, sm = ?, id_paciente = ? WHERE id_cita = ?',[fecha,peso,imc,sobrepeso,cc,pa_sistolica,pa_diastolica,gluc_ayuno,gluc_casual,hba1c,fondo_de_ojo,id_estado,colesterol_total_mg_dl,colesterol_ldl_mg_dl,colesterol_hdl_mg_dl,trigliceridos_mg_dl,microalbuminuria,creatinina,sugerencias,medicamentos,GAMEC,complicaciones,id_grado,id_referencia,id_motivo_baja,vacuna_antiinfluenza,dm,hta,obe,dlp,sm,id_paciente,id]));
        
        
        
        res.status(200).json({edited:true});
    } catch (error) {
        
        res.status(400).json({edited:false})
    } finally{
        connection.releaseConnection();
    }
}


//Eliminar una determinada cita de un paciente determinado
const deletePacienteCita = async (req=request,res=response) => {
    const {id} = req.params;
    try {
        
        const [row,fields] = (await connection.execute('DELETE FROM cita WHERE id_cita = ?',[id]));
        
        res.status(200).json({deleted: true});
    } catch (error) {
        
        res.status(400).json({deleted: false})
    } finally{
        connection.releaseConnection();
    }
}

module.exports = {
    getPacienteCitas,
    getPacienteCita,
    postPacienteCita,
    putPacienteCita,
    deletePacienteCita
}