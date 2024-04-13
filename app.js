if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
const mongoose=require('mongoose');
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require("passport-local");
const flash=require('connect-flash');
const User=require('./models/user.js');

const loginsignupRouter=require("./router/loginsignup.js");

app.use(express.static(path.join(__dirname,'/public')));
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)


app.listen(8080,()=>{
    console.log('server started');
})

main()
.then(()=> console.log('Database Connected!'))
.catch((error)=> console.log(`DataBase not Connected error occured!  ${error}`));

async function main(){
   await mongoose.connect(process.env.dbUrl);
}

const sessionOption={
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
    }
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
})

app.use('/',loginsignupRouter);

app.get('/home',(req,res)=>{
    res.render('home/home.ejs');
})