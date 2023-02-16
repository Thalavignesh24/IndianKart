
function CommonRoutes(){
    this.CustomerRoutes=require('../Routers/CustomerRoutes/CustomerRouter');
    this.AdminRoutes=require('../Routers/AdminRoutes/AdminRouter');
}
module.exports=new CommonRoutes();
