const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Sequelize = require('sequelize')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))

// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     database : 'fleetDB',
// });

// db.connect((err) =>{
//     if (err){
//         throw err
//     }else{
//         console.log("Connection to Database Successful");
//     }
// })

const db = new Sequelize('fleetDB', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });

//Test DB
db.authenticate()
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('Error: ' + err))


// Get Requests
app.get('/', function(req, res){
    res.render('login')
})

let requests = null;
app.get('/driver', function(req, res){
    let sql = 'SELECT * FROM requests'

    let query= db.query(sql, (err, results) =>{
        if (err) console.log(err)
        requests = results
        res.render('driver', {requests : requests})
    })
})


// Post Requests
app.post('/', function(req, res){
    res.redirect('/driver')
})


app.listen(3000, () =>{
    console.log('Server running on port 3000');
})