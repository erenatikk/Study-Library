const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { Connection } = require("tedious");
const bcrypt = require("bcrypt");


const app = express();

app.use(express.json());
app.use(cors());


const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "password",
    database: "se_db"
});
db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connected successful: " + connection.threadId)
})

app.post("/register", async (req, res) => {

    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;


    db.getConnection(async (err, connection) => {
        const sqlSearch = "SELECT * FROM usertb WHERE email = ?"
        const search_query = mysql.format(sqlSearch, [email])

        const sqlInsert = "INSERT INTO usertb (name, password , email) VALUES (?,?,?)"
        const insert_query = mysql.format(sqlInsert, [username, hashedPassword, email])

        await connection.query(search_query, async (err, result) => {
            if (err) throw (err)
            console.log("---> Search Results")
            console.log(result.length)

            if (result.length != 0) {
                connection.release()
                console.log("----> User already exists")
                res.sendStatus(404)
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)
                    console.log("---->Created new User")
                    res.sendStatus(201)
                })
            }
        })
    }





    );
});

app.post("/login", (req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM usertb WHERE email = ?"
        const search_query = mysql.format(sqlSearch, [email])


        await connection.query(search_query, async (err, result) => {
            if (result.length == 0) {
                console.log("---> User does not exist");
                res.sendStatus(404)
            }

            else {
                const hashedPassword = result[0].password

                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("----> Login Successful")
                    res.json({ usr: true })

                }
                else {
                    console.log("----> Password Inccorect");
                    res.json({ usr: false })
                }
            }
        })
    })
})

app.get("/db-book", (req, res) => {
    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlBook = "SELECT  book_name,author,publication_date,language_code,count  FROM booktbl ";
        await connection.query(sqlBook, async (err, result) => {
            if (result.length == 0) {
                console.log("---> Book does not exist");
                res.sendStatus(404);
                res.json({ tmpdata: false })
            }
            else {
                console.log(result);
                console.log("query başarılı")
                // res.json({tmpdata : true})
                console.log(JSON.stringify(result));
                res.json({ result })

            }
        })
    })
})

app.post("/dbdate", (req, res) => {
    const emailDate = req.body.email
    const seat_date = req.body.seat_date
  

    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        db.getConnection(async (err, connection) => {               
            const sqlSearch = "SELECT * FROM dates WHERE email = ?"
            const search_query = mysql.format(sqlSearch, [emailDate])

            const sqlInsert = "INSERT INTO dates (email, seat_date ) VALUES (?,?)"
            const insert_query = mysql.format(sqlInsert, [emailDate, seat_date])
            


            await connection.query(search_query, async (err, result) => {
                if (err) throw (err)
                console.log("---> Search Results")
                console.log(result.length)

                if (result.length != 0) {
                    connection.release()
                    console.log("----> Seat already exists")
                    res.sendStatus(404)
                }
                else {
                        const currentDate =  new Date().toISOString().slice(0, 19).replace('T', ' ');
                        console.log(currentDate)
                        if(seat_date < currentDate) {
                            console.log('The selected datetime is in the past. Data will not be inserted.');
                            res.send("The selected datetime is in the past.")
                            
                            return;
                            
                        }
                        else{
                         connection.query(insert_query, (err, result) => {
                            connection.release()
                            if (err) throw (err)
                            console.log("---->Created new date")
                            res.send("Created new Date.")
                            res.sendStatus(201)
                        })
                    }}
                    
                
            })
        }





        );
    })
})

app.listen(3001, () => {
    console.log("running server");
})

module.exports = db;