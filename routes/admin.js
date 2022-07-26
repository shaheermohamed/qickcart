var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // let products= [
  //   {
  //     name:"IPHONE 13",
  //     category:'Mobile',
  //     description:"this is iphone",
  //     image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS7nwkvDY9n_r56swlI_2-gEy5xWJfOOk3Jr6BtCMYo1PuzMtNTpLP_d-7RsWye2GNvzC6WwPuuQA&usqp=CAc"
  //   },
  //   {
  //     name:"IPHONE 12",
  //     category:'Mobile',
  //     description:"this is iphone",
  //     image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT6kOaAfWcdCVR8GkakDJjPBaPOAcHwRNCTWqU661JolFzCVV3WlI62-EWjhbdcuEC86M2Mkylcug&usqp=CAc"
  //   },
  //   {
  //     name:"IPHONE 11",
  //     category:'Mobile',
  //     description:"this is iphone",
  //     image:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSSLeEKXHuEjwwCipLedpvHqy_Ivo7rWw7PwToPI4XikObU9JGzIL-GYV5skXLMz7Amj2LiPwqEK7w&usqp=CAc"
  //   },{
  //     name:"IPHONE 10",
  //     category:'Mobile',
  //     description:"this is iphone",
  //     image:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSqXfRdFgi93axiy0CKAdJyvFh6HU1sDt2iWGs1HmKqtddiyYFEZT6uQ0eagprvXxPxqduBwXInJQ&usqp=CAc"
  //   }
  // ]
  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{admin:true,products});
  })
 
});
router.get('/add-product',(req,res) => {
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.Image)
  productHelper.addProduct(req.body,(id)=>{
    let image=req.files.Image
    console.log(id)
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-product')
      }else{
        console.log(err)
      }
    })
    res.render('admin/add-product')
  })});
  
module.exports = router;
