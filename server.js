const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));



app.use('/',(req,res)=>{
    res.render('index',{pageTitle:'Index',path:'/'});
    console.log("It's the homepage.");

})


app.listen(8000);