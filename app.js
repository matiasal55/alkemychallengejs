const express=require("express");
const path=require("path");
const app=express();

const apiRouter=require("./routes/api")

app.set("port",process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))
app.use(express.static(path.join(__dirname,"public")));

app.use("/api",apiRouter)

app.listen(app.get("port"),()=>{
    console.log("Connected")
})