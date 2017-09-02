var http = require('http');
var Hapi = require('hapi');

var server= new Hapi.Server();
var mysql = require('mysql');

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

//Display products
server.route({
  method:'GET',
  path:'/',
  handler:function(request,reply) {
      con.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        reply("Number of Rows Added: " + result);

      });
  }
});
// Add Product
server.route({
  method: 'GET',
  path: '/insert',
  handler: function (request, reply) {
   /* var a=req.body.productid;
    var b=req.body.productname;
    var c=req.body.productid;
    var d=req.body.rate;
    var e=req.body.gst;*/
    var a1=2;
    var b2='sathish';
    var c3='sa';
    var d4=5;
    var e5=4;
    var post={productid:a1,productname:b2,productdescription:c3,rate:d4,gst:e5}
    var sql = "INSERT INTO products SET ?" ;
      con.query(sql,post, function (err, result) {
        if (err) throw err;
        console.log("Number of Rows Added: " + result);
        reply("Number of Rows Added: " + result.affectedRows);
      });
  }
});

// Delete product
server.route({
  method: 'GET',
  path: '/delete/{id}',
  handler: function (request, reply) {
      var id=request.params.id;
      var sql = "DELETE FROM products WHERE productid =?";
      var query1=con.query(sql,id, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        reply('Hello ' + encodeURIComponent(request) + '!');
      });
      }
});

// Edit product
server.route({
  method: 'GET',
  path: '/update/{id}',
  handler: function (request, reply) {
    var id="sat";
    var id1=request.params.id;
    id1=parseInt(id1);
    var sql = 'UPDATE products SET productname=?  WHERE productid =?';
    var query1=con.query(sql,[id,id1], function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      reply('Hello ' + encodeURIComponent(request) + '!');
    });
  }
});

 //cart display


server.route({
  method:'GET',
  path:'/cart',
  handler:function(request,reply) {
    con.query("SELECT * FROM cart", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      reply("Number of Rows Added: " + result);

    });
  }
});
// cart add
server.route({
  method: 'GET',
  path: '/cart/add',
  handler: function (request, reply) {
    /* var a=req.body.productid;
     var b=req.body.productname;
     var c=req.body.productid;
     var d=req.body.rate;
     var e=req.body.gst;*/
    var a1=2;
    var b2='sathish';
    var c3='sa';
    var d4=5;
    var e5=4;
    var post={prdid:a1,prdname:b2,prdrate:d4,prdgst:e5}
    var sql = "INSERT INTO cart SET ?" ;
    con.query(sql,post, function (err, result) {
      if (err) throw err;
      console.log("Number of Rows Added: " + result);
      reply("Number of Rows Added: " + result.affectedRows);
    });
  }
});

//cart delete
server.route({
  method: 'GET',
  path: '/cart/delete/{id}',
  handler: function (request, reply) {
    var id=request.params.id;
    var sql = "DELETE FROM cart WHERE productid =?";
    var query1=con.query(sql,id, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      reply('Hello ' + encodeURIComponent(request) + '!');
    });
  }
});



server.start(function () {
  console.log('SERVER IS RUNNING',server.info.uri);

})

