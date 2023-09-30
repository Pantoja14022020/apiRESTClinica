const express = require('express');
const cors = require('cors');
const connection = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        
        this.pacientePath = '/api/paciente';
        this.pacienteCitaPath= '/api/paciente-cita'
        this.pacienteArchivoHistorial = '/api/generarArchivo'

        //Obtener los diferentes estados de pie
        this.estadoPie = '/api/estado_pie'

        //Obtener grado de adiccion al tabaco
        this.gradoAdiccion = '/api/grado_adiccion_tabaco'

        //Obtener referencia
        this.referencia = '/api/referencia';

        //Obtener motivo de baja
        this.motivoBaja = '/api/motivo_baja';

        this.databaseConnect();

        this.middleware();
        
        this.route();
    }

    databaseConnect(){
        if(connection){
            console.log('DB Connected!')
        }else{
            console.log("Could not connected DB")
        }
    }

    middleware(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    route(){
        this.app.use(this.pacientePath,require('../routes/paciente'));
        this.app.use(this.pacienteCitaPath, require('../routes/pacienteCita'));
        this.app.use(this.pacienteArchivoHistorial,require('../routes/archivoDatos'));
        this.app.use(this.estadoPie, require('../routes/estadoPie'));
        this.app.use(this.gradoAdiccion, require('../routes/gradoAdiccion'));
        this.app.use(this.referencia, require('../routes/referencia'));
        this.app.use(this.motivoBaja, require('../routes/motivoBaja'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Escuchando en el puerto ${this.port}`)
        })
    }
}

module.exports = Server;