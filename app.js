const express=require("express");
const path=require("path");
// const cookieParser=require("cookie-parser")
const session=require("express-session")
const app=express();

const homeRouter=require("./routes/home")
const apiRouter=require("./routes/api")

app.set("port",process.env.PORT || 3000);
app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))
// app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")));

app.use(session({
    secret:"alkemy_",
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:60*60*1000
    }
}))

app.use("/",homeRouter)
app.use("/api",apiRouter)

app.listen(app.get("port"),()=>{
    console.log("Conectado")
})