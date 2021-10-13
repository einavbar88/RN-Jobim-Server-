const Job = require('../models/JobsModel')
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/jobs', auth, async (req, res) => {

    const { name, job, description, ownerId, attachment, addressText } = req.body

    const coords = { lat: req.body.coords[0], lng: req.body.coords[1] }

    const jobPost = new Job({
        company: name.name,
        branch: name.branch,
        role: job,
        adTitle: description.title,
        jobDescription: description.description,
        coords,
        imageUrl: attachment,
        addressText,
        ownerId
    })

    try {
        await jobPost.save()
        res.status(201).send(jobPost._id)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find({})
        res.send(jobs)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.get('/jobs/locations', async (req, res) => {
    try {
        const jobs = await Job.find({})
        res.send(jobs.map(j => ({ _id: j._id, coords: j.coords })))
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.get('/jobs/near-me', async (req, res) => {
    const { _id, roles } = req.query
    const filters = {}
    filters._id = { $in: _id }
    if (roles)
        filters.role = { $in: roles }
    try {
        const jobs = await Job.find(filters)
        res.send(jobs)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.get('/jobs/favorites', async (req, res) => {
    const favoritesList = req.query.favoritesList

    try {
        const jobs = await Job.find({ _id: { $in: favoritesList } })
        res.send(jobs)
    }
    catch (err) {
        res.status(500).send(err)
    }
})


router.patch('/jobs/:id', auth, async (req, res) => {

})


router.delete('/jobs/:id', auth, async (req, res) => {

})




module.exports = router