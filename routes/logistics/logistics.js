const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//Mongoose Models
const Employee = mongoose.model('Employee');
const Car = mongoose.model('Car');
const Request = mongoose.model('Request')

//Routes
router.get('/', async function(req, res){
	let logistics_id = req.app.locals.user_id;

	Employee.findOne({'_id': logistics_id}, async function (err, data) {
        if(err){
            console.log(err);
        }else{
            logistics = await data

            Request.find({'logistics_approver' : logistics.name}, async function(err,data){
            err ? console.log(err) : requests = await data

            res.render('logistics',  {requests : requests,
                                logistics : logistics,
                                })
        })

        
            }
        })
})

//Display pending Logistics requests
router.get('/pendingrequest', function(req, res){
    let logistics_id = req.app.locals.user_id

	Employee.findOne({'_id': logistics_id}, function (err, data) {
        if(err){
            console.log(err);
        }else{
            logistics = data
        }
    })

    Request.find({'status' : 'Pending Logistics Approval'}, function(err,data){
        if (err){
            console.log(err);
        }else{
            requests = data
            res.render('pendingrequest', {requests : requests,
                user : logistics})
        }
    })
})

//Display individual Requests
router.get('/pendingrequest/:id', async function(req, res){
    let request = null;
    Request.findById(req.params.id, (err, data) => {
        if(err){
            console.log(err);
        }else{
            request = data;
            res.render('singlerequest', {request : request,
                                        user : req.user})
        }
    })
})

router.post('/pendingrequest', function(req, res){
    let url = '/logistics/pendingrequest/' + req.body.request_id
    res.redirect(url)
})

//Upon Logistics approval/denial
router.post('/singlerequest', async (req, res) =>{
    if(req.body.approve ==='Approve'){
        Request.findByIdAndUpdate(req.body.request_id, {$set :{
            status : 'Approved',
            logistics_comments : req.body.commment,
            logistics_approver : req.user.name,
            }}, (err, doc) =>{
                if(err){
                    console.log(err);
                }else{
                    console.log(doc);
                }})
        
    }else{
        Request.updateOne({'id' : req.body.request_id}, {
            status : 'Denied',
            logistics_comments : req.body.commment,
            logistics_approver : req.user.name,
        }, (err, doc) =>{
            if(err){
                console.log(err);
            }else{
                console.log(doc);
            }
        })
    }

    res.redirect('/logistics')
})



module.exports = router;