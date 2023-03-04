const products = require('../../integration/product');
var {ProductList,ProductDetail} = require('../../middlewares/productService')

class ProductController{
    getProduct(req,res){
        var products=ProductList();
        products.then(product=>{
            res.status(200).send(product);
        })
    }
    getProductDetail(req,res){
        var product=ProductDetail(req.params.id);
        product.then(b=>{
            res.status(200).send(b);
        })
    }
    addProduct(req,res){
        const newProduct = new products(req.body);
        newProduct.save()
    }
    async deleteProduct(req,res){
        try{
            var result =await products.deleteOne({_id:req.params.id})
        } catch(error){
            console.log(error)
        }
    }
    async updateProduct(req,res){
        try{
          var result=await products.findOneAndUpdate({_id:req.params.id},req.body)
        } catch(error){
            console.log(error)
        }
    }
}


module.exports=new ProductController;