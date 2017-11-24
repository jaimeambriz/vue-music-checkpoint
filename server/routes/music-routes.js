let router = require('express').Router()
var Songs = require('../models/music')

router.getJSON('/music/mymusic', (req, res, next) => {
    Songs.find({})
        .then(songs => {
            res.send(songs)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})


router.post('/music/mymusic/song', (req, res, next) => {
    Songs.create(req.body)
        .then(song => {
            let response = {
                data: song,
                message: 'Successfully added a song!'
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.put('/music/mymusic/song/:id', (req, res, next) => {
    Songs.findByIdAndUpdate(req.params.id, req.body)
        .then(song => {
            post.update()
            res.send({
                message: 'You\'ve updated your post!'
            })
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})


router.delete('/music/mymusic/:id', (req, res, next) => {
    Songs.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send({ message: 'So much for that song' })
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})



module.exports = router