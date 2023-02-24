exports.create = (request) => {
    const errors = []

    if (request.full_name === '') {
        errors.push('نام نمی تواند خالی باشد.')
    }
    
    if (request.email === '') {
        errors.push('ایمیل نمی تواند خالی باشد.')
    }

    if (request.password === '') {
        errors.push('کلمه عبور نمی تواند خالی باشد.')
    }
    
    return errors
}