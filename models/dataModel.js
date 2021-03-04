const pool=require("../bd")

const getCurrentBalance=async(id_user)=>{
    const query="SELECT balance from User WHERE id=?"
    const balance=pool.query(query,[id_user])
    return balance
}

const getRegister=async(id_data,id_user)=>{
    const query="SELECT *, DATE_FORMAT(date,'%Y-%m-%d') AS date FROM Register WHERE id=? AND id_user=?"
    const register=pool.query(query,[id_data,id_user])
    return register
}

const allData=async(id_user)=>{
    const query="SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS date FROM Register INNER JOIN Type ON Type.code=Register.id_type WHERE id_user=? ORDER BY id DESC"
    const dataList=pool.query(query,[id_user])
    return dataList
}

const createRegister=async(data)=>{
    const query="INSERT INTO Register SET ?"
    const create=pool.query(query,[data])
    return create
}

const modifyRegister=async(id_user,id_data,data)=>{
    const query="UPDATE Register SET concept=?, amount=?, date=? WHERE id=? AND id_user=?"
    const modify=pool.query(query,[data.concept,data.amount,data.date,id_data,id_user])
    return modify
}

const updateBalance=async (id_user,newBalance)=>{
    const query=`UPDATE User SET balance=? WHERE id=?`
    const register=pool.query(query,[newBalance,id_user])
    return register
}

const deleteRegister=async (id_data,id_user)=>{
    const query="DELETE FROM Register WHERE id=? AND id_user=?"
    const deletedata=pool.query(query,[id_data,id_user])
    return deletedata
}

module.exports={
    updateBalance, getRegister, allData, getCurrentBalance, createRegister, modifyRegister, deleteRegister
}