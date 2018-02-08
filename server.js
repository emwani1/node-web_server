const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use(function (req,res,next) {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',function (err) {
        if(err){
            console.log("Errror");
        }

    });
    next();
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',function () {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',function (text) {
    return text.toUpperCase();
});

app.get('/',function (request,response) {
    response.render('home.hbs',{
        pageTitle: "Home page",
    });
});

app.get('/about',function (req,res) {
    res.render("about.hbs",{
        pageTitle:'About Page'
    });
});
app.get('/projects',function (req,res) {
    res.render("projects.hbs",{
        pageTitle:"List of Projects",
    })
});

app.get('/bad',function (req,res) {
    res.send({
        bad:"Unable to fullfill this request"
    });
});

app.listen(port,function () {
    console.log('Server is up and running on port 3000');
});