const productRoute = require('./productRoute')
function route(app){
    app.use('/api/product',productRoute);
}

module.exports=route;