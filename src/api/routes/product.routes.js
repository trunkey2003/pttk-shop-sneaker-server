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
    app.get('/', ProductController.getProduct);
    app.get('/detail/:id', ProductController.getProductDetail)
    app.post('/api/add', [isAdmin], ProductController.addProduct);
    app.delete('/delete/:id', [isAdmin], ProductController.deleteProduct);
    app.put('/update/:id', [isAdmin], ProductController.updateProduct);
}
// module.exports = product_router;

