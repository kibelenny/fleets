const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const db = require('./setup')
const Employee = db.Employee;

passport.use(
    new localStrategy({
        usernameField : 'employee_email',
    }, async(email, password, done) =>{
        try{
            const employee = await Employee.findOne({'employee_email' : email});
            //Email does not exist
            if(!employee){
                return done(null, false, {message : "Email not registered"})
            }
            //Email Exists. Verufy Password
            const isMatch = await employee.isValidPassword(password)
            if (isMatch){
                //Passwords Match
                return done(null, employee)
            }else{
                return done(null, false, {message : "Incorrect Password"})
            }
        } catch(error) {
            done(error)
        }
    })
)

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
    Employee.findById(id, (err, user) =>{
        done(err, user);
    });
});
