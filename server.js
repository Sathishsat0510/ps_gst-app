var http = require('http');
var Hapi = require('hapi');
var express= require('express');
var mongoose=require('mongoose');
var cors=require('cors');
var bodypaerser=require('body-parser');
var server= new Hapi.Server();
var app=express();
var mysql = require('mysql');
var path=require('path');
const route=require('./routes/route');
const Path = require('path');

server.connection({port:3000});




var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'store'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


server.use(cors());


server.use(bodypaerser.json());

server.use(express.static(path.join(__dirname,'src')));
server.route({
  method:'USE',
  path:'/api',
  handler:route
});

server.route({
  method:'GET',
  path:'/',
  handler:function(request,reply) {

      reply("1 record inserted");

  }
});

server.start(function () {
  console.log('SERVER IS RUNNING',server.info.uri);

})

