const validator = require('validator')

const signupValidation = (req) => {

    const {firstName,lastName,email,password,}= req.body

    if(!firstName || !lastName){
        throw new Error('FirstName or LastName is not Valid');
    }
    else if(!validator.isEmail(email)){
        throw new Error('Email is not Valid')
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error('Enter a strong password')
    }
}

const profileEditValidation = (req) => {

    const allowedEditVal = [
        "firstName",       
        "lastName",     
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ]

    const isAllowedVal = Object.keys(req.body).every(keys=> allowedEditVal.includes(keys))
    return isAllowedVal;
}

module.exports = {signupValidation, profileEditValidation}