var http = require('http');
var Hapi = require('hapi');
var Joi=require('joi');
var server= new Hapi.Server();
var mysql = require('mysql');
var Vision = require('vision');
var Handlebars = require('handlebars');
var fs=require('fs');
var addcorsHeaders = require('hapi-cors-headers');


// creating connection
server.connection({port:3000});
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database:'store'
});
server.ext('onPreResponse', addcorsHeaders)
// connect to database
con.connect(function(err) {
  if (err) {
    console.log(err);
  }
  else{
    console.log('Connected');
  }

});


// register vision to your server instance
server.register(require('inert'), function (err) {
  if (err) {
    console.log('Cannot register vision')
  }

  server.route({
    method: 'GET',
    path: '/api',
    handler: function (request, reply, next) {
      con.query("SELECT * FROM products ORDER BY productid", function (err, result, fields) {
        var string=JSON.stringify(result);
        if (err) throw err;
        reply(string);
      });
    }
  });
  server.route({
    method: 'POST',
    path: '/api/insert',
    handler: function (request, reply) {
      var id = request.payload;
      var json =  JSON.parse(id);
      const productname = json.productname;
      const productdescription = json.productdescription;
      const rate = json.productrate;
      const gst = json.productgst;
      var sql = "INSERT INTO products (productname,productdescription,productrate,productgst) values('"+productname+"','"+productdescription+"','"+rate+"','"+gst+"')";
      con.query(sql, function (err, result) {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              reply(false);
          }
          else{
              reply(false);
            }
        }
        else{
          reply(true);
        }

      });
    },

  });

// Delete product
  server.route({
    method: 'DELETE',
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
        reply(result);
      });
    }
  });
  //cart display
  server.route({
    method: 'GET',
    path: '/cart/display',
    handler: function (request, reply) {
      con.query("SELECT * FROM cart ORDER BY cartid", function (err, result, fields) {
        var string=JSON.stringify(result);
        if (err) throw err;
        reply(string);
      });
    }
  });
// cart add
  server.route({
    method: 'GET',
    path: '/cart/add/{id}',
    handler: function (request, reply) {
      var id = request.params.id;
      var sql = "SELECT * FROM products where productid=?";
      var query1 = con.query(sql, id, function (err, result){
        var str=JSON.stringify(result);
        var json = JSON.parse(str);
        if (err) {
          reply(false);
        }else {
          var values = [];
          for(var i=0; i< json.length; i++){
            values.push([json[i].productid,json[i].productdescription,json[i].productname,json[i].productrate,json[i].productgst]);
          }
          var sql = "INSERT INTO cart (productid,productname,productdescription,productrate,productgst) values ?";
          con.query(sql, [values], function (err, result) {
            if (err) {
              throw err;
              reply({msg: 'Could Not add to Cart'});
            }else{
              reply(true);
            } });
        }
      });
    }
  });
//cart delete
  server.route({
    method: 'DELETE',
    path: '/cart/delete/{id}',
    handler: function (request, reply) {
      var id = request.params.id;
      var sql = "DELETE FROM cart WHERE cartid =?";
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

