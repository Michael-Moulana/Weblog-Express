const userRole = require('@models/user/userRole')

module.exports = (req, res, next) => {

    // if there is not 'user' key in session
    // ( if you are still not logged in, go to login page )
    if(!req.session.hasOwnProperty('user')) {
        return res.redirect('/auth/login')
    }
    next()
}