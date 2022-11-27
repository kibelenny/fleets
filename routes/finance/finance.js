const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//Mongoose Models
const Employee = mongoose.model('Employee');
const Car = mongoose.model('Car');
const Request = mongoose.model('Request')

//Routes
router.get('/', async function(req, res){
	let finance_id = req.app.locals.user_id;

	Employee.findOne({'_id': finance_id}, async function (err, data) {
        if(err){
            console.log(err);
        }else{
            finance = await data

            Request.find({'finance_approver' : finance.name}, async function(err,data){
            err ? console.log(err) : requests = await data

            res.render('finance',  {requests : requests,
                                finance : finance,
                                })
        })

        
            }
        })
})

//Display pending Finance requests
router.get('/pendingrequest', function(req, res){
    let finance_id = req.app.locals.user_id

	Employee.findOne({'_id': finance_id}, function (err, data) {
        if(err){
            console.log(err);
        }else{
            finance = data
        }
    })

    Request.find({'status' : 'Pending Finance Approval'}, function(err,data){
        if (err){
            console.log(err);
        }else{
            requests = data
            res.render('pendingrequest', {requests : requests,
                user : finance})
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
    let url = '/finance/pendingrequest/' + req.body.request_id
    res.redirect(url)
})

//Upon Finance approval/denial
router.post('/singlerequest', async (req, res) =>{
    if(req.body.approve ==='Approve'){
        Request.findByIdAndUpdate(req.body.request_id, {$set :{
            status : 'Pending Logistics Approval',
            finance_comments : req.body.commment,
            finance_approver : req.user.name,
            }}, (err, doc) =>{
                if(err){
                    console.log(err);
                }else{
                    console.log(doc);
                }})
        
    }else{
        Request.updateOne({'id' : req.body.request_id}, {
            status : 'Denied',
            finance_comments : req.body.commment,
            finance_approver : req.user.name,
            "logistics_approver" : 'Null',
            "logistics_comments" : 'Null',
        }, (err, doc) =>{
            if(err){
                console.log(err);
            }else{
                console.log(doc);
            }
        })
    }

    res.redirect('/finance')
})



module.exports = router;