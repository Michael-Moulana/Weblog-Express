const userRole = require('@models/user/userRole')

module.exports = (req, res, next) => {
    // if the user's role is not ADMIN
    // go to the homepage ( will be not allowed )

    if((req.session.user.role !== userRole.ADMIN)) {
        return res.redirect('/')
    }
    next()
    
}