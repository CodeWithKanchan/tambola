const { validationResult } = require('express-validator')

const loginValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty() && errors.errors[0].path === 'email') {
        console.log("mail error")
        return res.status(400).json('Please enter a valid mail id')
    }

    if (!errors.isEmpty() && errors.errors[0].path === 'password') {
        return res.status(400).json('Password must contain atleast 4 characters and no longer than 6.')
    }
    next()
}

module.exports = loginValidation