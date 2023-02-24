const authService = require('@services/authService')
const userRole = require('@models/user/userRole')

exports.showLogin = (req, res) => {
    res.newRender('auth/login', { layout: 'auth'})
}

exports.doLogin = async (req, res) => {
    const {email, password} = req.body
    const user = await authService.login(email, password)

    if (!user) {
        req.flash('errors', ['وجود ندارد'])
        return res.redirect('/auth/login')
    }
    req.session.user = user
    const pathToRedirect = user.role === userRole.ADMIN ? '/admin/dashboard' : '/'
    return res.redirect(pathToRedirect)
}

exports.showRegister = (req, res) => {
    res.newRender('auth/register', { layout: 'auth'})
}

exports.doRegister = async (req, res) => {
    const { email, password, password_confirmation} = req.body

    //validation

    //validation

    const newUserId = await authService.register(email, password)
    if (!newUserId) {
        req.flash('errors', 'در حال حاضر امکان ثبت نام شما وجود ندارد.')
        return res.redirect('/auth/register')
    }
    return res.redirect('/auth/login')

}