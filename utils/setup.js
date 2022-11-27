require('../app.js')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const bcrypt = require('bcrypt')


    const employeeSchema = new mongoose.Schema({
        employee_id : {
            type : String,
        },
        name : {
            type : String,
        },
        role : {
            type : String,
        },
        employee_email : {
            type : String,
        },
        password : {
            type: String
        }

    });

    employeeSchema.plugin(passportLocalMongoose);

    employeeSchema.methods.isValidPassword = async function(password){
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            console.log(err);
            throw err
        }
    }

    const Employee = mongoose.model('Employee', employeeSchema)
    module.exports.Employee = Employee;


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
