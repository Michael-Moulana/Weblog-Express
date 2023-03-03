const userRole = require('@models/user/userRole')

module.exports = (req, res, next) => {

    // if already logged in, do not show login page and redirect to '/'
    if (req.session.hasOwnProperty('user')) {
        return res.redirect('/')
    }
    next()
    
    
}