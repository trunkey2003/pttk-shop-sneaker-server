const { isAdmin } = require('../../middlewares/authJwt')
const ProductController = require('../controllers/product.controller')
module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/api/product', ProductController.getProduct);
    app.get('/api/product/detail/:id', ProductController.getProductDetail)
    app.post('/api/product/add', [isAdmin], ProductController.addProduct);
    app.delete('/api/product/delete/:id', [isAdmin], ProductController.deleteProduct);
    app.put('/api/product/update/:id', [isAdmin], ProductController.updateProduct);
}
// module.exports = product_router;

