const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//Mongoose Models
const Employee = mongoose.model('Employee');
const Car = mongoose.model('Car');
const Request = mongoose.model('Request')

router.get('/', async function(req, res){
    let user_id = req.user.id;

    Employee.findById(user_id, async function(err, data){
        if(err){
            console.log(err);
        }else{
            user = await data;

            Employee.find(async function(err, data){
                if (err){
                    console.log(err);
                }else{
                    employees = data;
                    res.render('admin/admin',  {user : user,
                                                employees : employees})

                }
            })
        }
    })


})

//Register Car
router.get('/cars', async function(req, res){

    Car.find(async function(err,data){
        if(err){
            console.log(err);
        }else{
            cars = data
            res.render('admin/cars', {user : req.user,
                                     cars : cars})
        }
    })
})

router.post('/registercar', async function(req, res){
    try{
        const newCar = await Car.create({
        'number_plate' : req.body.number_plate,
        'type' : req.body.type
        })
        await newCar.save()
        res.redirect('/admin/cars')
    } catch{
        res.redirect('/admin/cars')
    }

})

//Register User

router.get('/registeruser', async  function(req, res){
    res.render('admin/registeruser', {user : req.user})
})


router.post('/registeruser', async (req, res) =>{
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

module.exports = router