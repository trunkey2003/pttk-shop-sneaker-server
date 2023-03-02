const product_router=require('./product.routes')
const user_router=require('./user.routes')
const auth_router=require('./auth.routes')
function route(app){
    app.get('/api/product',product_router);
    app.get('/api/user',user_router);
    app.get('/api/auth',auth_router);
}