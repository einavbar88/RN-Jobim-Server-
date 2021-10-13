const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    branch: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        required: true,
    },
    adTitle: {
        type: String,
        required: true,
        trim: true
    },
    jobDescription: {
        type: String,
        trim: true
    },
    coords: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    addressText: {
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        }
    },
    imageUrl: {
        type: String
    },
    isTeenagerAvail: {
        type: Boolean,
        default: false
    },
    ownerId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Job = mongoose.model('Job', jobsSchema)

module.exports = Job

