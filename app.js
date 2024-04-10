const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');

app.use(express.static(path.join(__dirname,'/public')));
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(8080,()=>{
    console.log('server started');
})

app.get('/',(req,res)=>{
    res.send('working');
})

app.get('/login',(req,res)=>{
    res.render("login.ejs");
})

app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
})

app.get('/home',(req,res)=>{
    res.render('home/home.ejs');
})