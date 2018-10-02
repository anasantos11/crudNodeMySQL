const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log('Servidor local rodando na porta 3000!');
});

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tomcat",
  database: "nodejs"
});

database.connect(function (error) {
  if (error) {
    console.error("Erro:  " + error.message);
  }
  console.info("Conectado com o banco de dados.")
});

app.get('/', function (req, res) {
  res.send('Servidor local rodando na porta 3000!');
});

app.get('/customers', function (req, res) {
  database.query("SELECT * FROM CUSTOMERS", function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.error("Erro:  " + error.message);
    }
    res.send(response);
  });
});