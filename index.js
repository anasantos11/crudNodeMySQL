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
      res.send("Erro:  " + error.message);
    }
    res.send(response);
  });
});

app.get('/customers/:id', function (req, res) {
  const id = req.params.id;
  database.query("SELECT * FROM customers WHERE customer_id =" + id, function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    res.send(response);
  });
});

app.post('/customer', function (req, res) {
  const id = req.body.id;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const favoriteWebsite = req.body.favoriteWebsite;

  var query = "INSERT INTO customers (customer_id, last_name, first_name, favorite_website) VALUES (" + id + ",'" + lastName + "','" + firstName + "','" + favoriteWebsite + "')";

  database.query(query, function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    res.send("Customer " + firstName + " " + lastName + " adicionado com sucesso!");
  });
});

app.put('/customer', function (req, res) {
  const id = req.body.id;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const favoriteWebsite = req.body.favoriteWebsite;

  var query = "UPDATE customers SET last_name = '" + lastName + "', first_name = '" + firstName + "', favorite_website = '" + favoriteWebsite + "' WHERE customer_id = " + id;
  database.query(query, function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    res.send("Dados do customer " + firstName + " " + lastName + " alterado com sucesso!");
  });
});

