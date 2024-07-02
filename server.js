

const express=require('express');
const app=express();
const port=3000;

app.set(express.json());
app.get('/',(req,res)=>
{
    res.send("Hello World");
});


app.listen(port,()=>
{
    console.log("Server running at ${port}");
});

const mysql=require('mysql2');
const connection=mysql.createConnection({
    host:'sql12.freesqldatabase.com',
    user: 'sql12716904',
    password: 'lhk4n7sfPI',
    Port : 3306,
    Database: 'sql12716904'
});

connection.connect(err=>{
    if(err){
        console.error("ERROR CONNECTING:"+err.stack);
        return;
    }
    console.log('Connected as id'+Connection.threadId);
})