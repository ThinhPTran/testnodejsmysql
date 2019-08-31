const express = require('express'); 
const app = express(); 
const router = express.Router(); 
const path = __dirname + '/public/';
const port = 8080; 

router.use(function (req, res, next) {
  console.log('/' + req.method); 
  next(); 
}); 

router.get('/', function(req, res) {
  res.sendFile(path + 'index.html'); 
}); 

router.get('/sharks', function(req, res) {
  res.sendFile(path + 'sharks.html'); 
}); 

router.get('/initdb', function(req, res) {

  var mysql = require('mysql'); 

  var con = mysql.createConnection({
    host: "172.17.0.2",
    user: "root",
    password: "root",
    database: "mysql", 
    port: 3306
  }); 

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!"); 

    var sql = "DROP TABLE customers";
    //con.query(sql, function (err, result) {
    //  if (err) throw err;
    //  console.log("Table deleted");
    //});

    sql = "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))";
  
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

    
    sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
    ];

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows)
    });   

    con.end(function(err) {
      if (err) {
        return console.log('error:' + err.message);
      }
      console.log('Close the database connection.');
    });     
  });


 
}); 


router.get('/getdbdata', function(req, res) {
   
  var mysql = require('mysql'); 

  var con = mysql.createConnection({
    host: "172.17.0.2",
    user: "root",
    password: "root",
    database: "mysql",
    port: 3306
  }); 

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!"); 

    con.query("SELECT * FROM customers", function (err, result, fields) {
      if (err) throw err;
      console.log(result);

      res.send(result);
    });    

    
    con.end(function(err) {
      if (err) {
        return console.log('error:' + err.message);
      }
      console.log('Close the database connection.');
    });     
  }); 


});

app.use(express.static(path)); 
app.use('/', router); 

app.listen(port, function() {
console.log('Example app listening on port 8080!'); 
}); 


