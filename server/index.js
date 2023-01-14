const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"se_db"
});
db.connect(function(error){
    if(!!error){
        console.log(error);
    }
        else{
            console.log("connected")
        }

    }
)

app.post("/register", (req,res)=>{

const username = req.body.username;
const password = req.body.password;
const email = req.body.email;


    db.query(
        "INSERT INTO users (name, password , email) VALUES (?,?,?)",
        [username,password,email],
        (err,result)=>{
            //console.log(err);
            //console.log(result)
        }
    );
});

app.post("/login" ,  (req,res) =>{
const password = req.body.password;
const email = req.body.email;
console.log("2");

    db.query(
        "SELECT email , password FROM users WHERE email = ? AND password = ?",
        [email,password],
        (err,result)=>{
            
            if (err){
                res.send({err:err})
            }
            else{
                if(result){
                    res.send(result);
                }

            else{
                    res.send({message:"Wrong email/password combination"});
                }
            }
            
        }
        
    )
})

app.listen(3001,()=>{
    console.log("running server");
})

module.exports= db;