const express=require("express")
const router=express.Router()

router.get("/",(req,res)=>{
    req.session.id_usuario=1
    res.json({status:"Ok"})
})

module.exports=router