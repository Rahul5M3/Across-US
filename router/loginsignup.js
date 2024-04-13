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
    req.flash('success',`Welcome to Across Us`);
    res.redirect('/home');
})

router.get('/signup',(req,res)=>{
    res.render('signup.ejs');
})

router.post('/signup', async (req,res)=>{
    try {
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registerUser=await User.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                console.log(err);
            }
            req.flash('success',`Welcome ${username}`);
            res.render('home/home.ejs');
        });
    }
    catch(e){
        req.flash('error',"Try again to signup!");
        res.redirect('/signup');
        // console.log(e);
    }
})


module.exports = router;