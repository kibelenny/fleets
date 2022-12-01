const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const flash = require('express-flash')

const helper = require('./utils/helper')
const isAuthenticated = helper.isAuthenticated;
const isNotAuthenticated = helper.isNotAuthenticated;

//Setup the main app and middelware
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.use(flash())
app.use(session({
    secret : 'Password Secret',
    resave : false,
    saveUninitialized : false,
}))

app.use(passport.initialize());
app.use(passport.session())
require('./utils/passportConfig')

//MongoDB configuration
// mongoose.connect('mongodb://localhost:27017/fleetDB');
mongoose.connect('mongodb+srv://kibe:lennykibe@cluster0.odumznx.mongodb.net/fleetDB')
require('./utils/setup')
const Employee = mongoose.model('Employee');
const Car = mongoose.model('Car');
const Request = mongoose.model('Request')

//Routes and respective imports
const hod_router = require('./routes/hod/hod')
const finance_router = require('./routes/finance/finance')
const logistics_router = require('./routes/logistics/logistics')
const driver_router = require('./routes/driver/driver')

app.use('/hod', isAuthenticated, hod_router)
app.use('/finance', isAuthenticated, finance_router)
app.use('/logistics',isAuthenticated, logistics_router)
app.use('/driver', isAuthenticated, driver_router)

//GET requests
app.get('/',function(req, res){
    if(req.user){
        let link = '/' + req.user.role;
        app.locals.user_id = req.user.id
        res.redirect(link)
    }else{
        res.redirect('/login')
    }
})

app.get('/login', isNotAuthenticated, function(req, res){
    res.render('login')
})

app.get('/register', (req, res) =>{
    res.render('register')
})

app.get('/logout',isAuthenticated, (req, res) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})


//POST requests
app.post('/register', async (req, res) =>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newEmployee = await Employee.create({
        'employee_id' : req.body.employee_id,
        'name' : req.body.name,
        'role' : req.body.role,
        'employee_email' : req.body.email,
        'password' : hashedPassword
    })
    await newEmployee.save()
    res.redirect('/')
  } catch{
    res.redirect('/register')
  }
})

app.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash: true
}))

app.listen(3000, function(){
    console.log('Server running on port 3000');
})
