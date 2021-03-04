const express=require("express")
const router=express.Router()

const dataModel=require("../models/dataModel")

const id_user=1

router.post("/save",async (req,res)=>{
    const data=req.body
    data.id_user=id_user
    const register=await dataModel.createRegister(data)
    const balance=await getCurrentBalance(data.id_user)
    const amount=parseFloat(data.amount)
    const type=data.id_type
    let transaction
    if(type==1)
        transaction=balance+amount
    else
        transaction=balance-amount
    const updateBalance=await dataModel.updateBalance(data.id_user,transaction)
    res.json({status:"Ok"})
})

router.get("/data",async (req,res)=>{
    const id=id_user
    const balanceList=await dataModel.allData(id)
    res.json(balanceList)
})

router.get("/data/:id",async(req,res)=>{
    const register=await dataModel.getRegister(req.params.id,id_user)
    res.json(register[0])
})

router.put("/modify/:id",async (req,res)=>{
    const data=req.body
    const register=await dataModel.getRegister(req.params.id,id_user)
    const modify=await dataModel.modifyRegister(id_user,req.params.id,data)
    const balance=await getCurrentBalance(id_user)
    const lastAmount=register[0].amount
    const newAmount=parseFloat(data.amount)
    if(lastAmount!=newAmount){
        const type=register[0].id_type
        let transaction
        if(type==1)
            transaction=balance-lastAmount+newAmount
        else
            transaction=balance+lastAmount-newAmount
        const updateBalance=await dataModel.updateBalance(id_user,transaction)
    }
    res.json({status:"Ok"})
})

router.delete("/delete/:id", async (req,res)=>{
    const register=await dataModel.getRegister(req.params.id,id_user)
    const deleteRegister=await dataModel.deleteRegister(req.params.id,id_user)
    const balance=await getCurrentBalance(id_user)
    const amount=register[0].amount
    const type=register[0].id_type
    let transaction
    if(type==1)
        transaction=balance-amount
    else
        transaction=balance+amount
    const updateBalance=await dataModel.updateBalance(id_user,transaction)
    res.json({status:"Ok"})
})

router.get("/balance",async(req,res)=>{
    const id=id_user
    const balance=await getCurrentBalance(id)
    res.json(balance)
})

const getCurrentBalance=async id=>{
    const balance=await dataModel.getCurrentBalance(id)
    return balance[0].balance
}

module.exports=router