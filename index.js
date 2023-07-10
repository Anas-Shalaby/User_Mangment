require('dotenv').config();

const express = require('express');
const expressEjsLayout = require('express-ejs-layouts');
const { flash } = require('express-flash-message');
const session = require('express-session'); 
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');

const app = express();

const port = process.env.PORT || 2000;
// Connect DB
connectDB();


// Retrive data from page to another page
app.use(express.urlencoded({extended : true}));
app.use(express.json());
// To deal with forms
app.use(methodOverride('_method'));

// express session
app.use(
    session({
    secret : process.env.SESSION_SECRET,
    resave : false ,
    saveUninitialized : true,
    cookie : {maxAge : 1000 * 60 * 60 * 24 * 7}
}))


// flash
app.use(flash({ sessionKeyName: 'flashMessage' }));

// To allow using images and css 
app.use(express.static("public"));

// To use ejs layout
app.use(expressEjsLayout);
app.set('layout' , './layouts/main');
app.set('view engine' , 'ejs');


// Routes of the project
app.use('/',require('./server/routes/main'));


// For wrong routes
app.get('*' , (req ,res)=> {
    res.status(404).render('404');
});


app.listen(port , ()=>{
    console.log(`This app is running on port ${port}`);
});