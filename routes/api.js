const express=require("express")
const router=express.Router()

const registrosModel=require("../models/registrosModel")

router.get("/registros/:id",async (req,res)=>{
    const id=req.params.id
    const registros=await registrosModel.todosLosRegistros(id)
    res.json(registros)
})

module.exports=router