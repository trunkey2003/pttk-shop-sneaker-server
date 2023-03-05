
var ProductController = require('../controllers/product.controller')
module.exports = (app) => {
    app.get('/', ProductController.getProduct);
    app.get('/detail/:id', ProductController.getProductDetail)
    app.post('/add', ProductController.addProduct);
    app.delete('/delete/:id', ProductController.deleteProduct);
    app.put('/update/:id', ProductController.updateProduct);

}
// module.exports = product_router;

