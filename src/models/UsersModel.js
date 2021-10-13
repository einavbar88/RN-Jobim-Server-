const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email is invalid')
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value, { minSymbols: 0, minLowercase: 0 }))
                throw new Error('Invalid Password')
        }
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: ''
    },
    birthYear: {
        type: Number,
        required: true
    },
    favorites: {
        type: Array
    },
    avatar: {
        type: String,
        default: ''
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})
//hide pass and tokens
usersSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//token
usersSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//login
usersSchema.statics.findByCredentials = async (email, pass) => {
    const user = await User.findOne({ email })
    if (!user)
        throw new Error('Unable to login')

    const isMatch = await bcrypt.compare(pass, user.password)

    if (!isMatch)
        throw new Error('Unable to login')

    return user
}
//hash password
usersSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)

    next()
})

//find by token
usersSchema.statics.findByToken = async (token) => {
    const user = await User.findOne({ "tokens": { $elemMatch: { token: token.token } } })
    return user
}

const User = mongoose.model('User', usersSchema)

module.exports = User

