const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extends:true}));
app.use(bodyParser.json());

const CommonRoutes=require('./Helpers/CommonRoutes');

app.use('/IndianKart',CommonRoutes.CustomerRouter);

app.listen(3000,(message)=>{
    console.log("Server Connected To Port 3000...");
});
