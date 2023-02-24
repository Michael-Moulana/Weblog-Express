const userRole = require('@models/user/userRole')

module.exports = (req, res, next) => {

    if (req.session.hasOwnProperty('user')) {
        return res.redirect('/')
    }
    next()
    
    
}