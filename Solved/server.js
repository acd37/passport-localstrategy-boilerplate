var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set Static Directory
app.use(express.static(__dirname + '/public'));

//For passport
app.use(session({ secret: 'my secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Models
var db = require("./app/models");

// Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

//Load passport strategies
require('./app/config/passport.js')(passport, db.user);

// Views
app.set('views', './app/views');

//Sync Database
db.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
    app.listen(port, function (err) {

        if (!err)
            console.log(`App is running on localhost: ${port}...`);
        else console.log(err)
    });
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});