const {request,response} = require('express');
const connection = require('../database/config');
const {formatearFecha} = require('../helpers/archivoDatos');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const postArchivoDatos = async (req=request,res=response) => {
  
  const {id_paciente} = req.params;

  const [row,fields] = await connection.execute('SELECT * FROM cita WHERE id_paciente = ?',[id_paciente]);

  row.forEach( cita => {
    const {fecha,peso,imc,sobrepeso,cc,pa_sistolica,pa_diastolica,gluc_ayuno,hba1c,fondo_de_ojo,id_estado} = cita;
    
    const newCita = {
      'Fecha': formatearFecha(fecha),
      'Peso kg': peso,
      'IMC': imc,
      'Sobrepeso': sobrepeso,
      'CC': cc,
      'PA Sistolica': pa_sistolica,
      'PA Diastolica': pa_diastolica,
      'Gluc. Ayuno': gluc_ayuno,
      'HA1c1': hba1c,
      'Fondo de ojo': fondo_de_ojo,
      'Revision de pies': id_estado 
    }

    console.log(newCita)
  })

  try{

    console.log(id_paciente)

  } catch(error){

    res.status(400).json({msg:`No se pudo crear archivo para el paciente con id ${id_paciente}`})

  } finally{
    console.log("finally")
  }
    // Datos para el archivo CSV (ejemplo)      Mango, fresaass, kiwii. leche condensada
    /*const data = [
      { name: 'Daniel', age: 22, email: 'daniel@ejemplo.com' },
      { name: 'Juanito', age: 18, email: 'juanito@ejemplo.com' },
      { name: 'BobEsponja', age: 32, email: 'bob_esponja@ejemplo.com' }
    ];
    
    // Ruta y nombre del archivo CSV a crear
    const csvFilePath = './controllers/mi_archivo.csv';
    
    // Crear el escritor de CSV con las opciones del encabezado
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'name', title: 'Nombre' },
        { id: 'age', title: 'Edad' },
        { id: 'email', title: 'Email' }
      ]
    });
    
    // Escribir los datos en el archivo CSV
    csvWriter
      .writeRecords(data)
      .then(() => {
        console.log('Archivo CSV creadodo coorrecatmentte');
      })
      .catch((error) => {
        console.error('Error al crear archivo CSV:  what the hellll', error);
      });*/
    
}

module.exports = {
    postArchivoDatos
}