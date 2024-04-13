const express=require('express');
const router=express.Router({mergeParams:true});
const passport = require('passport');
const User=require('../models/user.js');

router.get('/',(req,res)=>{
    res.redirect('/login');
})

router.get('/login',(req,res)=>{
    res.render("login.ejs");   
})

router.post('/login',passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),(req,res)=>{
    req.flash('success',`${req.user.username.toUpperCase()} , Welcome to Across Us`);
    res.redirect('/home');
})

router.get('/signup',(req,res)=>{
    res.render('signup.ejs');
})

router.post('/signup', async (req,res)=>{
    try {
        let {username,email,password}=req.body;
        const newUser=new User({email:email.toLowerCase(),username});
        const registerUser=await User.register(newUser,password);
        req.login(registerUser,(err)=>{
            if(err){
                 console.log('error in loginsignup.js');
            }
            res.render('home/home.ejs');
        });
    }
    catch(e){
        res.redirect('/signup');
        // console.log(e);
    }
})

router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log('error in loginsignup.js');
        }
        else{
            res.redirect('/login');
        }
    })
})


module.exports = router;