const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//Mongoose Models
const Employee = mongoose.model('Employee');
const Car = mongoose.model('Car');
const Request = mongoose.model('Request')

//Routes
router.get('/', async function(req, res){
	let hod_id = req.app.locals.user_id;

	Employee.findOne({'_id': hod_id}, async function (err, data) {
        if(err){
            console.log(err);
        }else{
            hod = await data

            Request.find({'HOD_approver' : hod.name}, async function(err,data){
            err ? console.log(err) : requests = await data

            res.render('hod',  {requests : requests,
                                hod : hod,
                                })
        })

        
            }
        })
})

//Display pending HOD requests
router.get('/pendingrequest', function(req, res){
    let hod_id = req.app.locals.user_id

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
            res.render('pendingrequest', {requests : requests,
                hod : hod})
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
            res.render('singlerequest', {request : request})
        }
    })
})

router.post('/pendingrequest', function(req, res){
    let url = '/hod/pendingrequest/' + req.body.request_id
    res.redirect(url)
})

//Upon HOD approval/denial
router.post('/singlerequest', async (req, res) =>{
    if(req.body.approve ==='Approve'){
        Request.findByIdAndUpdate(req.body.request_id, {$set :{
            status : 'Pending Finance Approval',
            HOD_comments : req.body.commment,
            HOD_approver : req.user.name,
            }}, (err, doc) =>{
                if(err){
                    console.log(err);
                }else{
                    console.log(doc);
                }})
        
    }else{
        Request.updateOne({'id' : req.body.request_id}, {
            status : 'Denied',
            HOD_comments : req.body.commment,
            HOD_approver : req.user.name,
            "finance_approver" : 'Null',
            "finance_comments" : 'Null',
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

    res.redirect('/hod')
})



module.exports = router;