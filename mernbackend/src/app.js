const express= require("express");
const app = express();
require("./db/conn");

const Register = require("./models/registers");

const path = require("path")
const hbs = require("hbs");
const port = process.env.PORT || 3000

const static_path = path.join(__dirname, "../public" )
const temp_path = path.join(__dirname, "../templates/views" )
const partials_path = path.join(__dirname, "../templates/partials" )

app.use(express.urlencoded({extended: false}))
app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", temp_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    // res.send("Hello")
    res.render("index")
});

app.get("/register",(req,res)=>{
    res.render("register");
});
//create new user in db
app.post("/register", async(req,res)=>{
    try {
        const pwd = req.body.password;
        const cpwd= req.body.confirmpwd;
        if(pwd === cpwd){
            const registerUser = new Register({
                name: req.body.name,
                email: req.body.email,
                password: pwd,
                confirmpwd: cpwd
            })
            const saved = await registerUser.save();
            res.status(201).render("success");
        } else {
            res.send("Password doesn't match")
        }   
    } catch (error) {
        res.status(400).send(error);        
    }
});
app.get("/login",(req,res)=>{
    res.render("login");
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});