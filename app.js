const express = require("express");
const  path = require("path");
const app = express();
const mongoose = require('mongoose')



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}

const port = process.env.PORT || 80;

const contactSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  phonenumber: String,
  Message: String
});
var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())
app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    const params ={}
     res.render('home.pug');})
app.get('/about', (req, res) => {
    const params ={}
     res.render('about.pug');
  })
app.get('/services', (req, res) => {
    const params ={}
     res.render('services.pug');})
app.get('/classinfo', (req, res) => {
    const params ={}
     res.render('classinfo.pug');
  })
app.get('/contact', (req, res) => {
    const params ={}
     res.render('contact.pug');
  })
  app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.status(200).send("Your form has been submitted successfully")
    }).catch(()=>{
    res.status(400).send(" Your form is not submitted")
})
})

 
  
  


  app.listen(port,()=>{
    console.log(`this app is started successfully on port ${port}`)
});
