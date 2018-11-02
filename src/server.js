const app = require('./config/express').express();
require('./config/data.global').sqlServer();
var sql = require("mssql");

/**
 * Rota default da api que apenas responde que o servidor está rodando
 */
app.get('/', function (req, res) {
  res.send('Server running');
});

/**
 * Api para retornar os dados de todos os clientes cadastrados no banco de dados
 */
app.get('/customers', function (req, res) {
  new sql.Request().query("SELECT * FROM CUSTOMERS", function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    response ? res.send(response.recordsets[0]) : response;
  });
});

/**
 * Api para retornar o dados de um cliente específico cadastrado no banco de dados.
 * A busca é feita através do id do cliente recebido na requisição.
 */
app.get('/customers/:id', function (req, res) {
  const id = req.params.id;
  new sql.Request().query("SELECT * FROM customers WHERE customer_id =" + id, function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    response ? res.send(response.recordsets[0]) : response;
  });
});

/**
 * Api para inserir um novo cliente no banco de dados conforme dados recebidos na requisição.
 */
app.post('/customers', function (req, res) {
  const id = req.body.id;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const favoriteWebsite = req.body.favoriteWebsite;

  var query = "INSERT INTO customers (customer_id, last_name, first_name, favorite_website) VALUES (" + id + ",'" + lastName + "','" + firstName + "','" + favoriteWebsite + "')";

  new sql.Request().query(query, function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    res.send("Customer " + firstName + " " + lastName + " adicionado com sucesso!");
  });
});

/**
 * Api para atualizar dados de um cliente já cadastrado no banco de dados conforme 
 * dados recebidos na requisição.
 */
app.put('/customers', function (req, res) {
  const id = req.body.id;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const favoriteWebsite = req.body.favoriteWebsite;

  var query = "UPDATE customers SET last_name = '" + lastName + "', first_name = '" + firstName + "', favorite_website = '" + favoriteWebsite + "' WHERE customer_id = " + id;
  new sql.Request().query(query, function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    res.send("Dados do customer " + firstName + " " + lastName + " alterado com sucesso!");
  });
});

/**
 * Api para deletar um cliente específico cadastrado no banco de dados.
 * A busca do cliente a ser deletado é feita através do id recebido na requisição.
 */
app.delete('/customers/:id', function (req, res) {
  const id = req.params.id;
  new sql.Request().query("DELETE FROM customers WHERE customer_id = " + id, function (error, response, fields) {
    sql.close();
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    res.send("Customer com id " + id + " removido com sucesso!");
  });
});
/**
 * Api para fazer pesquisa de um determinado termo nas colunas de uma entidade do banco de dados. 
 * A busca do termo na entidade é realizada conforme os dados recebidos na requisição. 
 */
app.get('/search', function (req, res) {
  const entity = req.query.entity;

  if (entity == undefined || entity == '')
    return res.send('Erro: Não foi informado o nome da entidade que deseja pesquisar.');

  if (!isValidEntityToSearch(entity.toLowerCase()))
    return res.send('Erro: A entidade informada não é valida para fazer buscas. Escolha uma das entidades: categories, customers, departments, employees, products ou suppliers.');

  const term = req.query.term;
  if (term == undefined || term == '')
    return res.send('Erro: Não foi informado o termo que deseja buscar na entidade ' + entity);

  new sql.Request().query('SELECT * FROM ' + entity + ' WHERE ' + getPredictedSearch(entity.toLowerCase(), term), function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      return res.send("Erro:  " + error.message);
    }
    return response ? res.send(response.recordsets[0]) : res.send(response);
  });
});

/**
 * Método para verificar se a entidade é válida para fazer buscas
 * @param {*} entity 
 */
function isValidEntityToSearch(entity) {
  return entity === 'categories' || entity === 'customers' || entity === 'departments' || entity === 'employees' || entity === 'products' || entity === 'suppliers';
}

/**
 * Método para montar o predicado de busca de acordo com a entidade e termo recebido
 * @param {*} entity 
 * @param {*} term 
 */
function getPredictedSearch(entity, term) {
  /**
   * Predicado para entidade Categories
   */
  if (entity === 'categories')
    return "category_name like '%" + term + "%'";
  /**
   * Predicado para entidade Customers
   */
  if (entity === 'customers')
    return "last_name like '%" + term + "%' " +
      "OR first_name like '%" + term + "%' " +
      "OR favorite_website like '%" + term + "%' ";
  /**
   * Predicado para entidade Departments
   */
  if (entity === 'departments')
    return "dept_name like '%" + term + "%'";
  /**
   * Predicado para entidade Employees
   */
  if (entity === 'employees')
    return "last_name like '%" + term + "%' " +
      "OR first_name like '%" + term + "%' " +
      "OR salary like '%" + term + "%' ";
  /**
     * Predicado para entidade Products
     */
  if (entity === 'products')
    return "product_name like '%" + term + "%'";
  /**
 * Predicado para entidade Suppliers
 */
  if (entity === 'suppliers')
    return "supplier_name like '%" + term + "%' " +
      "OR city like '%" + term + "%' " +
      "OR state like '%" + term + "%' ";
}