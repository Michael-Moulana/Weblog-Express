const userModel = require('@models/user')

const dateService = require('@services/dateService')
const langService = require('@services/langService')

const userValidator = require('@validators/user')

const userRole = require('@models/user/userRole')

// displaying the users
exports.index = async (req, res) => {
    // getting all users
    const users = await userModel.findAll()

    const presentedUser = users.map(user => {
        user.created_at_persian = langService.toPersianNumbers(dateService.toPersianDate(user.created_at))

        return user
    })

    res.adminRender('admin/users/index', {
        users: presentedUser
    })
}


// rendering users to create route to displaying them
// retrieving users to make them post's author
exports.create = async (req, res) => {
    res.adminRender('admin/users/create')
}

// getting post's data from the body and storing them to db
exports.store = async (req, res) => {
    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    const errors = userValidator.create(userData)

    if (errors.length > 0) {
        errors.forEach(error => {
            req.flash('errors', error);
        });

        return res.adminRender('admin/users/create', { userData, errors, hasError: errors.length > 0 })
    }

    const insertId = await userModel.create(userData)
    if (insertId) {
        req.flash('success', ['کاربر جدید با موقیت ثبت نام شد'])
        res.redirect('/admin/users')
    }
}

// deletes post by id
exports.remove = async (req, res) => {
    const userID = req.params.userID
    // postID is string. should converted to integer.
    if (parseInt(userID) !== 0) {
        const result = await userModel.delete(userID)
    }
    req.flash('success', ['کاربر با موقیت حذف شد'])
    res.redirect('/admin/users')
}

exports.edit = async (req, res) => {
    const userID = req.params.userID
    if (parseInt(userID) === 0) {
        res.redirect('/admin/users')
    }

    const user = await userModel.find(userID)

    res.adminRender('admin/users/edit', {
        user, userRole, helpers: {
            isSelectedRole: function (role, options) {
                return user.role === role ? options.fn(this) : options.inverse(this)
            }
        }
    })
}

exports.update = async (req, res) => {
    const userID = req.params.userID
    if (parseInt(userID) === 0) {
        res.redirect('/admin/users')
    }
    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        role: req.body.role
    }

    // if new password entered
    if (req.body.password !== '') {
        // push new key-value pair to the userData
        userData.password = req.body.password
    }

    console.log(userData)

    const result = await userModel.update(userID, userData)
    if (result) {
        req.flash('success', ['کاربر با موقیت ویرایش شد'])
    }
    return res.redirect('/admin/users')
}