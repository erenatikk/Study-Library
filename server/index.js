const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { Connection } = require("tedious");
const bcrypt = require("bcrypt");


const app = express();

app.use(express.json());
app.use(cors());


const db = mysql.createPool({
    user:"root",
    host:"localhost",
    password:"password",
    database:"se_db"
});
db.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)
 })

app.post("/register", async (req,res)=>{

const username = req.body.username;
const hashedPassword = await bcrypt.hash(req.body.password,10);
const email = req.body.email;


    db.getConnection( async (err,connection) => {
        const sqlSearch = "SELECT * FROM usertb WHERE email = ?"
        const search_query = mysql.format(sqlSearch,[email])

        const sqlInsert ="INSERT INTO usertb (name, password , email) VALUES (?,?,?)"
        const insert_query = mysql.format(sqlInsert,[username,hashedPassword,email])

        await connection.query(search_query,async (err,result)=>{
            if(err) throw (err)
            console.log("---> Search Results")
            console.log(result.length)

            if(result.length !=0){
                connection.release()
                console.log("----> User already exists")
                res.sendStatus(404)
            }
            else{
                await connection.query(insert_query,(err,result)=>{
                    connection.release()
                    if(err) throw (err)
                    console.log("---->Created new User")
                    res.sendStatus(201)
                })
            }
        })
    }
        


        
        
    );
});

app.post("/login" ,  (req,res) =>{
const password = req.body.password;
const email = req.body.email;

db.getConnection(async (err,connection)=>{
    if(err) throw (err)
    const sqlSearch = "SELECT * FROM usertb WHERE email = ?"
    const search_query = mysql.format(sqlSearch,[email])


    await connection.query (search_query, async (err, result) =>{
        if(result.length==0){
            console.log("---> User does not exist");
            res.sendStatus(404)
        }
    
        else{
            const hashedPassword = result[0].password
    
            if(await bcrypt.compare(password , hashedPassword)){
                console.log("----> Login Successful")
                res.send('${username} is logged in')
            }
            else{
                console.log("----> Password Inccorect");
                res.send("Password incorrect!")
            }
        }
    })
    })
})

app.listen(3001,()=>{
    console.log("running server");
})

module.exports= db;