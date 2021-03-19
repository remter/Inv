const express = require ('express');
const mysql = require ('mysql');

//Creating a connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Inventory'
})

//connect to MySql
db.connect(err =>{
    if(err){
        throw err;
    }
    console.log("MySql Connected");

});

const app = express();

// Create Database

app.get('/createdb', (req,res) =>{
    let sql = "CREATE DATABASE Inventory"
    db.query(sql, (err) =>{
        if(err){
            throw err;
        }
        res.send("Databse Created");
    });
});

// Create table
app.get('/createusers', (req, res) =>{
    let sql = 'CREATE TABLE user( id int AUTO_INCREMENT, name VARCHAR(255), role VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, err =>{
        if(err){
            throw err;
        }
        res.send('User table created');
    });
})

app.get('/createuser1', (req, res) =>{
    let post = {name: 'Billy Smith', role: 'Admin'};
    let sql = 'INSERT INTO user SET ?';
    let query = db.query(sql, post, err => {
        if (err){
            throw err;
        }
        res.send('User Added');
    });
});

app.listen('3000',() =>{
    console.log('Server started on port 3000 ')
});