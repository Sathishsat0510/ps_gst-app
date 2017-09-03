var http = require('http');
var Hapi = require('hapi');
var Joi=require('joi');
var server= new Hapi.Server();
var mysql = require('mysql');
var Vision = require('vision');
var Handlebars = require('handlebars');
var fs=require('fs');


// creating connection
server.connection({port:3000});
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'store'
});

// connect to database
con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});


// register vision to your server instance
server.register(require('inert'), function (err) {
  if (err) {
    console.log('Cannot register vision')
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      con.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        reply.file('placement/src/index.html');
      });
    }
  });

//Display products
  server.route({
    method: 'GET',
    path: '/display',
    handler: function (request, reply) {
      con.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        reply(results);

      });
    }
  });
// Add Product


  server.route({
    method: 'POST',
    path: '/api/insert',
    handler: function (request, reply) {
      var cope = req.body.params;
      var sql = "INSERT INTO products SET ?";
      con.query(sql, cope, function (err, result) {
        if (err) throw err;
        reply(results);
      });
    }
  });

// Delete product
  server.route({
    method: 'GET',
    path: '/delete/{id}',
    handler: function (request, reply) {
      var id = request.params.id;
      var sql = "DELETE FROM products WHERE productid =?";
      var query1 = con.query(sql, id, function (err, result) {
        if (err) throw err;
        if (result.affectedRows) {
          reply(true);
        } else {
          reply(false);
        }
      });
    }
  });

// Edit product
  server.route({
    method: 'POST',
    path: '/update/{id}',
    handler: function (request, reply) {
      const a1 = request.payload.productid;
      const b2 = request.payload.productname;
      const c3 = request.payload.productdescription;
      const d4 = request.payload.productrate;
      const e5 = request.payload.productgst;
      var sql = 'UPDATE products SET productname=?,productdescription=?,productdescription:=?,rate=?,gst=?  WHERE productid =?';
      var query1 = con.query(sql, [a1, b2, c3, d4, e5, a1], function (err, result) {
        if (err) throw err;
        reply(results);
      });
    }
  });

  //cart display

  server.route({
    method: 'GET',
    path: '/cart',
    handler: function (request, reply) {
      con.query("SELECT * FROM cart", function (err, result, fields) {
        if (err) throw err;
        reply(results);
      });
    }
  });
// cart add
  server.route({
    method: 'POST',
    path: '/cart/add',
    handler: function (request, reply) {
      const a1 = request.payload.productid;
      const b2 = request.payload.productname;
      const d4 = request.payload.productrate;
      const e5 = request.payload.productgst;
      var post = {prdid: a1, prdname: b2, prdrate: d4, prdgst: e5}
      var sql = "INSERT INTO cart SET ?";
      con.query(sql, post, function (err, result) {
        if (err) throw err;
        reply(results);
      });
    }
  });
//cart delete
  server.route({
    method: 'GET',
    path: '/cart/delete/{id}',
    handler: function (request, reply) {
      var id = request.params.id;
      var sql = "DELETE FROM cart WHERE productid =?";
      var query1 = con.query(sql, id, function (err, result) {
        if (err) throw err;
        if (result.affectedRows) {
          reply(true);
        } else {
          reply(false);
        }
      });
    }
  });


  server.start(function () {

    console.log('SERVER IS RUNNING', server.info.uri);
  })
})

