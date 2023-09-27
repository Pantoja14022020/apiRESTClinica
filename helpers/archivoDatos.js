const formatearFecha = (fecha) => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); 
    const dia = String(fecha.getDate()).padStart(2, '0');
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;
}

module.exports = {
    formatearFecha
}