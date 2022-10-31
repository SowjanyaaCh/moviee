const express = require('express')
const app = express()
const port = 3000
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();


app.set("view engine", "ejs");
app.get('/', (req, res) => {
  res.render('MOVIE')
})
app.get('/Login', (req, res) => {
  res.render('Login')
})
app.get('/SignUp', (req, res) => {
  res.render('SignUp')
})
app.get('/Action', (req, res) => {
  res.render('Action')
})
app.get('/Animation', (req, res) => {
  res.render('Animation')
})
app.get('/Apocalypse', (req, res) => {
  res.render('Apocalypse')
})
app.get('/Comedy', (req, res) => {
  res.render('Comedy')
})
app.get('/Drama', (req, res) => {
  res.render('Drama')
})
app.get('/genres', (req, res) => {
  res.render('genres')
})
app.get('/Horror', (req, res) => {
  res.render('Horror')
})
app.get('/Romance', (req, res) => {
  res.render('Romance')
})
app.get('/Science_fiction', (req, res) => {
  res.render('Science_fiction')
})
app.get('/Thriller', (req, res) => {
  res.render('Thriller')
})

app.get('/loginsubmit',(req,res) => {
  const email=req.query.email;
  const password=req.query.password;
  db.collection('users')
  .where("email","==",email)
  .where("password","==",password)
  .get()
  .then((docs)=>{
    if(docs.size>0){
      res.render('MOVIE');
    }else{
      res.send("<h1> Login Failed use valid credentials.</h1>");
    }
  })
})
app.get('/Signupsubmit',(req,res) => {
  const firstname=req.query.Firstname;
  const lastname=req.query.Lastname;
  const email=req.query.email;
  const number=req.query.number;
  const password=req.query.password;
  db.collection('users').add({
    name: firstname + lastname,
    email:email,
    number:number,
    password: password,
}).then(()=>{
  res.render("signed");
});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})