const pool=require("../bd")

const obtenerSaldoActual=async(id_usuario)=>{
    const query="SELECT saldo from Usuario WHERE id=?"
    const saldo=pool.query(query,[id_usuario])
    return saldo
}

const obtenerRegistro=async(id,id_usuario)=>{
    const query="SELECT * FROM Registro WHERE id=? AND id_usuario=?"
    const registro=pool.query(query,[id,id_usuario])
    return registro
}

const todosLosRegistros=async(id_usuario)=>{
    const query="SELECT * FROM Registro WHERE id_usuario=? ORDER BY id DESC"
    const registros=pool.query(query,[id_usuario])
    return registros
}

const crearRegistro=async(datos)=>{
    const query="INSERT INTO Registro SET ?"
    const crear=pool.query(query,[datos])
    return crear
}

const modificarRegistro=async(usuario,id,datos)=>{
    const query="UPDATE Registro SET concepto=?, monto=?, fecha=?, id_categoria=?, id_tipo=? WHERE id=? AND id_usuario=?"
    const modificar=pool.query(query,[datos.concepto,datos.monto,datos.fecha,datos.id_categoria,datos.id_tipo,id,usuario])
    return modificar
}

const actualizarSaldo=async (id_usuario,saldoAnterior,monto,tipo)=>{
    let operacion
    if(tipo==1)
        operacion=saldoAnterior+monto
    else
        operacion=saldoAnterior-monto
    const query=`UPDATE Usuario SET saldo=? WHERE id=?`
    const registro=pool.query(query,[operacion,id_usuario])
    return registro
}

const eliminarRegistro=async (usuario,id)=>{
    const query="DELETE FROM Registro WHERE id=? AND id_usuario=?"
    const eliminar=pool.query(query,[id,usuario])
    return eliminar
}

module.exports={
    actualizarSaldo, obtenerRegistro, todosLosRegistros, obtenerSaldoActual, crearRegistro, modificarRegistro, eliminarRegistro
}