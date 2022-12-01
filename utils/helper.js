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