const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//Mongoose Models
const Employee = mongoose.model('Employee');
const Car = mongoose.model('Car');
const Request = mongoose.model('Request')

router.get('/', async function(req, res){
	let driver_id = req.app.locals.user_id;

	Employee.findOne({'_id': driver_id}, async function (err, data) {
		if(err){
            console.log(err);
        }else{
            driver = await data;
            Request.find({'driver' : driver.name}, async function(err,data){
                if(err){
                    console.log(err);
                }else{
                    requests = await data
                    Car.find({status : 'Idle'},async function(err, data){
                        if (err){
                            console.log(err);
                        }else{
                            cars = data
                            res.render('driver', {requests : requests,
                                                 driver : driver,
                                                 cars : cars,
                            })
                        }
                    } )
                    
                }
            })
        
            
        }
	})

})

router.get('/requestcar', function(req, res){
    res.render('requestcar')
})

router.post('/requestcar', function(req, res){
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

module.exports = router