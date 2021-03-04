const express=require("express")
const router=express.Router()

const registrosModel=require("../models/registrosModel")

router.post("/registrar",async (req,res)=>{
    const datos=req.body
    datos.id_usuario=1
    const registrar=await registrosModel.crearRegistro(datos)
    const saldoActual=await registrosModel.obtenerSaldoActual(datos.id_usuario)
    const actualizarSaldo=await registrosModel.actualizarSaldo(datos.id_usuario,saldoActual[0].saldo,parseFloat(datos.monto),datos.id_tipo)
    res.json({estado:"Ok"})
})

router.get("/registros/:id",async (req,res)=>{
    const id=req.params.id
    const registros=await registrosModel.todosLosRegistros(id)
    res.json(registros)
})

router.post("/modificar/:id",async (req,res)=>{
    const datos=req.body
    const modificar=await registrosModel.modificarRegistro(req.session.idUsuario,req.params.id,datos)
    console.log(modificar)
})

router.delete("/eliminar/:id", async (req,res)=>{
    const registro=await registrosModel.obtenerRegistro(req.params.id,1)
    const eliminar=await registrosModel.eliminarRegistro(1,req.params.id)
    const saldoActual=await registrosModel.obtenerSaldoActual(1)
    let tipo
    if(registro[0].id_tipo==1)
        tipo=2
    else
        tipo=1
    const actualizarSaldo=await registrosModel.actualizarSaldo(1,saldoActual[0].saldo,registro[0].monto,tipo)
    res.json({estado:"Ok"})
})

router.get("/saldo/:id",async(req,res)=>{
    const id=req.params.id
    console.log(req.session.id_usuario)
    const saldo=await registrosModel.obtenerSaldoActual(id)
    res.json(saldo[0].saldo)
})

module.exports=router