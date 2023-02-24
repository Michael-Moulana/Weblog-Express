const userModel = require('@models/user')
const hashService = require('@services/hashService')
const userRole = require('@models/user/userRole')

exports.login = async (email, plainPassword) => {
    const user = await userModel.findByEmail(email)
    if (!user) {
        return false
    }
    
    const isMatch = hashService.comparePassword(plainPassword, user.password)
    if (!isMatch) {
        return false
    }

    return user
}

exports.register = async (email, password) => {
    const insertId = await userModel.create({
        full_name: 'کاربر ناشناس',
        email,
        password,
        role: userRole.USER

    })
    
    return insertId
}