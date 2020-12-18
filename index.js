const express = require('express');
const app = express();
const port=9000;
const router=express.Router();
const mongoose=require('mongoose');
const ejs=require('ejs');
const path = require('path');
const mongo=require('mongodb');
const assert=require('assert');
const bodyParser = require('body-parser');
// app.use(express.bodyParser());
// const { Router } = require('express');
const { url } = require('inspector');
var User=require('./modles/user');
var History=require('./modles/transection');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.render('initial');
})
app.get('/succ', (req, res) => {
  res.render('succ');
})

app.get('/home', (req, res) => {
   User.find({},function(err,user){
     if(err)
     console.log(err);
     res.render('home',{user:user});
     //console.log(user); ya hai

    //  console.log(users);
     
   })
});
app.get('/history', (req, res) => {
  History.find({},(err,history)=>{
    if(err)
    console.log(err);
    res.render('history',{history: history});
    // console.log(history); //ya hai
    
  })
});
 
app.get('/user/:id',(req,res)=>{
  User.findById(req.params.id).exec(function(err,user){
    if(err || !user)
    console.log(err);
    res.render('user',{user:user})
  //  console.log(user);
  })
})
app.get('/tran/:id',(req,res)=>{
  User.find({_id:{$ne:req.params.id} }).exec((err,user)=>{
    if(err)
    console.log(err);
    res.render('contact',{user:user,current:req.params.id })
  // console.log(user);
  })
})

app.post('/tran/:id', (req, res) => {
  var balance = req.body.balance;
  var name = req.body.name;
  User.findById({ _id: req.params.id }, (err, user) => {
      if (err)
          console.log(err);
      else
      // console.log(user);
     
          User.findById({ _id: req.body.name }, (err, receipt) => {
              if (err)
                  console.log(err);
              else
              // console.log(receipt);
                 
              if (user.balance >= Number(balance)) {
                  user.balance -= Number(balance);
                  user.save();
                  // console.log(user);
                  receipt.Balance += Number(balance);
                  receipt.save();
                  // console.log(receipt);
                  History.create({ Creditor: user.name, Receipent: receipt.name, Amount: balance }, (err, transaction) => {
                      if (err)
                          console.log(err);
                      // console.log(transaction);
                  })
                  // res.redirect('/home');
                  res.redirect('/succ');
              
                }
          })
  })
})



app.listen(port,()=>console.log(`listen to port ${port}`));
