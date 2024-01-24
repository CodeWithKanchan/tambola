const router = require('express').Router()
const { userRegister, userLogin, userLogout} = require('../controllers/authController')
const registerValidation = require('../middlewares/registerValidator')
const loginValidator = require('../middlewares/loginValidator')
const {body, validationResult} = require('express-validator')


router.post('/register', 
    body('fullname').isLength({min: 3, max: 15}),
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 6 }),
    registerValidation , 
    userRegister)


router.post('/login', 
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 6 }), 
    loginValidator,  
    userLogin)

router.get('/logout', userLogout)


module.exports = router