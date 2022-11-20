const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

require('./stuff/setup')

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

//MongoDB
mongoose.connect('mongodb://localhost:27017/fleetDB');
const Employee = mongoose.model('Employee');
const Car = mongoose.model('Car');
const Request = mongoose.model('Request')

var helper = require('./helper')




app.get('/', function(req, res){
    res.render('login')
})

let user = null;
let driver = null;
let hod = null;
let finance = null;
let logistics = null;
let requests = null;

app.get('/home', function(req, res){
    res.render('home')
})
  
app.get('/driver', function(req, res){
	let user_id = "6355b1cdb5d7755a91f37464"

	Employee.findOne({'id': user_id}, function (err, data) {
		err ? console.log(err) : driver = data
	})

    Request.find({'driver' : driver.name}, function(err,data){
        err ? console.log(err) : requests = data
    })

    res.render('driver', {requests : requests,
                        driver : driver,
                        helper : helper,
                        getUser : getUser})
})

app.get('/hod', function(req, res){
	let hod_id = "6355b1f8b5d7755a91f37465"

	Employee.findOne({'_id': hod_id}, function (err, data) {
        if(err){
            console.log(err);
        }else{
            hod = data
        }
    })

    Request.find({'HOD_approver' : hod.name}, function(err,data){
        err ? console.log(err) : requests = data
    })

    res.render('hod', {requests : requests,
                        hod : hod,
                        })
})

app.get('/finance', function(req, res){
	let finance_id = "6355b202b5d7755a91f37466"

	Employee.findOne({'_id': finance_id}, function (err, data) {
        if(err){
            console.log(err);
        }else{
            finance = data
            console.log(finance);
        }
    })

    Request.find({'finance_approver' : finance.name}, function(err,data){
        err ? console.log(err) : requests = data
    })

    res.render('finance', {requests : requests,
                        finance : finance,
                        getUser : getUser})
})

app.get('/logistics', function(req, res){
	let logistics_id = "6355b209b5d7755a91f37467"

	Employee.findOne({'_id': logistics_id}, function (err, data) {
        if(err){
            console.log(err);
        }else{
            logistics = data
            console.log(logistics);
        }
    })

    Request.find({'logistics_approver' : logistics.name}, function(err,data){
        err ? console.log(err) : requests = data
    })

    res.render('logistics', {requests : requests,
                            logistics : logistics,
                            })
})

app.get('/driver/requestcar', function(req, res){
    res.render('requestcar')
})

app.get('/hod/pendingrequest', function(req, res){
    let hod_id = "6355b1f8b5d7755a91f37465"

	Employee.findOne({'_id': hod_id}, function (err, data) {
        if(err){
            console.log(err);
        }else{
            hod = data
        }
    })

    Request.find({'status' : 'Pending HOD Approval'}, function(err,data){
        if (err){
            console.log(err);
        }else{
            requests = data
            console.log(hod.id);
            res.render('pendingrequest', {requests : requests,
                hod : hod})
        }
    })
})

app.post('/', function (req, res) {
    Employee.findOne({'employee_email': req.body.email}, function (err, data) {
        user = data;
    })

    // if (user.role == 'Driver'){
    //     res.redirect('/driver')
    // }else{
    //     res.redirect('/approver')
    // }

    res.redirect('/driver')
    
})

app.post('/requestcar', function(req, res){
    let employee_id = req.body.id
    let name = null;

    Employee.findOne({'employee_id' : employee_id.toUpperCase()}, async function(err, data){
        if (err){
            console.log(err);
        }else{
            name = await data.name
            const new_request = await Request.create({'driver' : name})
            await new_request.save()
            res.redirect('/driver')
        }
    })
})

app.listen(3000, function(){
    console.log('Server running on port 3000');
})



function getUser(user_id){
    Employee.findById(user_id, function(err, data){
        err ? console.log(err) : guy = data
    })

    return guy.name
}

Request.find({'driver' : 'Lenny Kibe', 'status' : 'Pending HOD Approval'}, function(err, data){
    err ? console.log(err) : console.log(data)
})