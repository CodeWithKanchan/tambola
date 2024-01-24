const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (userData) => {
    return jwt.sign({ user:userData},process.env.ACCESS_TOKEN , {
        expiresIn: maxAge
    })
}

const userRegister = async(req ,res)=>{
    const { fullname , email , password } = req.body
    const userData = await User.findOne({email:email})
    if(userData){
        res.json({userExist:true})
    }else{
        try{
            const salt = await bcrypt.genSalt(10);
            
            const hashedPassword = await bcrypt.hash(password,salt);

            const newUser = new User({
                fullname : fullname,
                email : email,
                password : hashedPassword,
                number:req.body.number
            }) 
            const user =await newUser.save();
            res.status(200).json(user)
    } catch(err){
        console.log(err.message)
        res.status(500).json(err)
    }  
    }
}

const userLogin = async(req,res)=>{
    const { email , password } = req.body
    try{     
        const user = await User.findOne({email:email})
       
        if(!user){
           return res.json("Email is not registered")
        }
       
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
           return  res.json("Enter a valid password"); 

        }

        const {password,...others} = user._doc
        console.log(others)
     
        const token = createToken(others);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(200).json({jwt:token})

    } catch(err){
        console.log(err.message)
        res.status(500).json(err)    
    } 
}

const userLogout = (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json("Logout successfully")
}

module.exports = {
    userRegister, userLogin, userLogout
}