
function CommonRoutes() {
    this.CustomerRoutes = require('../Routers/CustomerRoutes/CustomerRouter');
    this.AdminRoutes = require('../Routers/AdminRoutes/AdminRouter');
    this.ProductRoutes=require('../Routers/AdminRoutes/ProductRouter');
}
module.exports = new CommonRoutes();
