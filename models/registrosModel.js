const pool=require("../bd")

const ultimosRegistros=async(id_usuario)=>{
    const query="select * from Registro where id_usuario=? order by fecha desc limit 10"
    const registros=pool.query(query,[id_usuario])
    return registros
}

const todosLosRegistros=async(id_usuario)=>{
    const query="SELECT * FROM Registro WHERE id_usuario=? ORDER BY fecha DESC"
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

const eliminarRegistro=async (usuario,id)=>{
    const query="DELETE FROM Registro WHERE id=? AND id_usuario=?"
    const eliminar=pool.query(query,[id,usuario])
    return eliminar
}

module.exports={
    ultimosRegistros, todosLosRegistros, crearRegistro, modificarRegistro, eliminarRegistro
}