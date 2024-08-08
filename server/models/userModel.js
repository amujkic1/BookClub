const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') 
const validator = require('validator')

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
});

// static signup model
userSchema.statics.signup = async function (username, email, password) {
    
    if(!username || !email || !password){
        throw Error('All fields must be filled!')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })
    
    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user

}

userSchema.statics.login = async function(username, email, password) {
    if(!username || !email || !password){
        throw Error('All fields must be filled!')
    }

    const user = await this.findOne({ email })
    
    if(!user) {
        throw Error('Email does not exist')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return user
    
} 

module.exports = mongoose.model('User', userSchema);











