const express=require('express');
const router=express.Router();

const Products=require('../models/Products');

router.get('/product',function (req,res,next) {
 Products.find(function(err,Products){
   res.json(Products);
 })

});


router.post('/product',function (req,res,next) {
   newProduct=new Products({
     productid:req.body.productid,
     productname:req.body.productname,
     productdescription:req.body.productid,
     rate:req.body.rate,
     gst:req.body.gst

     var sql = "INSERT INTO products (productid,productname,prdouctdescription,rate,gst) VALUES ('1','RED','Colored cool','200','20')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Connected!");

  });

   newProduct.save

});

router.delete('/product/:id',function (req,res,next) {


});

module.exports=router;
