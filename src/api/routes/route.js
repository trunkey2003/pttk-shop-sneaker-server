const product_router = require('./product.routes')
const user_router=require('./user.routes')
const auth_router=require('./auth.routes')
function route(app){
    app.use('/api/product',product_router);
    app.use('/api/user',user_router);
    app.use('/api/auth',auth_router);
}

module.exports = route;