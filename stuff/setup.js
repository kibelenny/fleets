require('../app.js')
const mongoose = require('mongoose')

    const employeeSchema = new mongoose.Schema({
        employee_id : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        role : {
            type : String,
            required : true
        },
        employee_email : {
            type : String,
            required : true
        }

    });

    const Employee = mongoose.model('Employee', employeeSchema)

    const carSchema = new mongoose.Schema({
        number_plate : {
            type : String,
            required : true
        },
        type : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true,
            default : 'Idle'
        }

    });

    const Car = mongoose.model('Car', carSchema)

    const requestsSchema = new mongoose.Schema ({
        driver : {
            type : String,
            required : true
        },
        car : {
            type : String,
        },
        status : {
            type : String,
            required : true,
            default : 'Pending HOD Approval'
        },
        HOD_approver : {
            type : String,
        },
        HOD_comments : {
            type : String,
        },
        finance_approver : {
            type : String,
        },
        finance_comments : {
            type : String,
        },
        logistics_approver : {
            type : String,
        },
        logistics_comments : {
            type : String,
        },
    })

    const Request = mongoose.model('Request', requestsSchema);


// const borrowlistSchema = new mongoose.Schema({
//     driver : [
//         {type: Schema.Types.ObjectId, ref: 'employee'}
//       ],

//     car : [
//         {type: Schema.Types.ObjectId, ref: 'car'}
//       ],
    
//     destination : {
//         type : String,
//         required : true,
//     },

//     approved : {
//         type : String,
//         required : true,
//     }

// })

// const Borrowlist = mongoose.model('Borrowlist', borrowlistSchema)

// const approversSchema = new mongoose.Schema({
//     employee : [
//         {type: Schema.Types.ObjectId, ref: 'employee'}
//       ],
    
//     approved_req : [
//         {type: Schema.Types.ObjectId, ref: 'borrowlist'}
//       ],
    
//     driver_approved : [
//         {type: Schema.Types.ObjectId, ref: 'employee'}
//       ]
// })

// const Approvers = mongoose.model('Approvers', approversSchema)