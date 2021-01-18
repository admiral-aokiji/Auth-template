const PORT = process.env.PORT || 3000,
    express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    flash = require('connect-flash'),
    session = require("express-session"),
    moRide = require('method-override')

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(moRide("_method"))
app.use(session({
    secret: "WORK IN PROGRESS",
    resave: false,
    saveUninitialized: false
}));

require('./config/passport')(passport);
require('./config/dbconfig')
const User = require("./models/user");

User.deleteMany({ $nor: [{ email: "rooohitsaxena@gmail.com" }, { email: "a@a" }] }, (err) => {
    if (err) console.log(err)
    else console.log("Users deleted")
});

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/u', require('./routes/userRoute.js'));
app.get("*", function (req, res) {
    res.send("ERROR 404: PAGE NOT FOUND!!");
});

app.listen(PORT, console.log(`Server running on ${PORT}`));