const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;
const path = require('path');
const staticPath = path.join(__dirname,'../public');
const templatePath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.use(express.static(staticPath));
app.set('view engine','hbs');
app.set('views',templatePath);
hbs.registerPartials(partialsPath);
app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/weather',(req,res)=>{
    res.render("weather");
})

app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})