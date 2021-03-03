const express=require("express")
const router=express.Router()

const registrosModel=require("../models/registrosModel")

router.get("/",async (req,res)=>{
    req.session.idUsuario=1
    res.render("template")
})

router.post("/registrar",async (req,res)=>{
    const datos=req.body
    datos.id_usuario=req.session.idUsuario
    const registrar=await registrosModel.crearRegistro(datos)
    console.log(registrar)

})

router.post("/modificar/:id",async (req,res)=>{
    const datos=req.body
    const modificar=await registrosModel.modificarRegistro(req.session.idUsuario,req.params.id,datos)
    console.log(modificar)
})

router.delete("/eliminar/:id", async (req,res)=>{
    const eliminar=await registrosModel.eliminarRegistro(req.session.idUsuario,req.params.id)
    console.log(eliminar)
})

module.exports=router