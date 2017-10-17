const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view_engine', 'hbs');

/*middleware*/

app.use((req, res, next) => {
    const now = new Date().toUTCString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) =>{
       if(error)
           console.log('unable to append to server.log');
    });
    next();
});

/*app.use((req, res, next) =>{
    res.render('maintenance.hbs');
});*/

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: "welcome"
    });
});
app.use(express.static(__dirname + '/public'));
app.get('/maintenance', (request, response) => {
    response.render('home.hbs', {
        pageTitle: "Maintenance Page",
        welcomeMessage: "We will be right back"
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: "About Page"
    });
});

app.get('/bad', (request, response) => {
    /*response.send('<h1>Hello Express!</h1>');*/
    response.send({
        status: 'errorMessage',
        likes: 'Unable to get request'
    })
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});