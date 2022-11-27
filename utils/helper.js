// const mongoose = require('mongoose')
// require('./app')

// const Employee = mongoose.model('Employee');
// const Car = mongoose.model('Car');
// const Request = mongoose.model('Request')

// let car = null;
// let guy = null;

// module.exports.getCar = getCar

// function getCar(car_id){
//     Car.findById(car_id, function(err, data){
//         if (err){
//             console.log(err);
//         }else{
//             car = data
//             return car
//         }
//     })
// }

// module.exports.getUser = getUser

// function getUser(user_id){
//     Employee.findById(user_id, function(err, data){
//         if (err){
//             console.log(err);
//         }else{
//             guy = data
//             console.log(guy);
//             return data
//         }
//     })
// }

module.exports.isAuthenticated = isAuthenticated

function isAuthenticated(req, res, next){
    if(req.user){
        return next()
    }
    res.redirect('/')
}

module.exports.isNotAuthenticated = isNotAuthenticated

function isNotAuthenticated(req, res, next){
    if(req.user){
        res.redirect('/')
    }
    return next();
}