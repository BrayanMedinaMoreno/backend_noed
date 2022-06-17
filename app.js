const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000 || process.env.PORT;

// create connection to database

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'base_datos_backend',
    port: 3306
    });
// se prueba la base de datos
db.getConnection((err, connection) => {
     if (err) throw err;
    console.log('Connected to database');
});

// llama carpeta vistas
app.set("views", __dirname + "/views");
// la carpeta de archivos estaticos public
app.use(express.static(__dirname + '/public'));
// parcea la informacion del request a un json leible
app.use(bodyParser.urlencoded({ extended: false }));
// 
app.get ("/",(req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post("/",(req,res) => {
    console.log(req.body);
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let cc = req.body.cc;
    let email = req.body.email;
    let clave = req.body.clave;
    let comand = `INSERT INTO datos (cc,nombre,apellido,email,clave) VALUES(${cc},"${nombre}","${apellido}","${email}","${clave}")`;
    db.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(comand, (err, result) => { 
            if (err) throw err;
            console.log("listo")

        })
    });   
    res.sendFile(__dirname + '/public/index.html');
    console.log (req.body);
    console.log (nombre)
});

app.listen(port, () => {
    console.log("Server running on port "+port);
});
