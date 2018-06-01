
// import the dependencies express body parser cors and mongoose and passport

const express = require('express');
const path =  require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const http = require('http');
const flash =require('flash');
const cookieParser =require('cookie-parser');
const expressvalidator =require('express-validator');
var app = express();
var cons = require('consolidate');


//body parsing middle ware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));


const route = require('./routes/route');
const database = require('./database/db');


//connect to database mongooseschema
mongoose.connect(database.db);

//connection to database 
mongoose.connection.on('connected',function()
{
    
    console.log('connect to database'+database.db);

});

mongoose.connection.on('error',(err)=>
{
    if(err)
    {
        console.log('error to database'+ err);
    }
    

});
//define port
const port = 3000;
app.use(cors());

// passport initialize
app.use(passport.initialize());
app.use(passport.session());

app.use('/', route);




//app.use(bodyparser.json());
//file path for html
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'images')));


// test server

app.get('/',function(rew,res)
{
res.send('He');
});

//bind the  port
app.listen(port,function()
{
    console.log('server is running :'+port);
});