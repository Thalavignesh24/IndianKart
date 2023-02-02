const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extends:true}));
app.use(bodyParser.json());

const CustomerRouter=require('./Customers/CustomerRouter');

app.use('/vigneshkart',CustomerRouter);

app.listen(2000,function(){
    console.log("Your Project Running On Port 2000....");
});
