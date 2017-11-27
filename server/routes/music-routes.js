var router = require('express').Router()
var Songs = require('../models/music')
var Playlists = require('../models/playlist')

//get all songs
router.get('/music/songs', (req, res, next) => {
    Songs.find({})
        .then(songs => {
            res.send(songs)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})


router.get('/music/songs/:sid', (req, res, next) => {
    Songs.findById(req.params.sid)
        .then(songs => {
            res.send(songs)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('/music/playlists', (req, res, next) => {
    Playlists.find({})
        .then(playlists => {
            res.send(playlists)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})


router.get('/music/playlists/:pid/songs', (req, res, next) => {
    var test = {}
    Playlists.findById(req.params.pid)
        .then(playlist => {
            test.playlist = playlist
            Songs.find({ playlistId: req.params.pid })
                .then(songs => {
                    test.songs = songs
                    res.send(test)
                })
                .catch(err => {
                    res.status(400).send({ Error: err })
                })
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

// save song
router.post('/music/songs', (req, res, next) => {
    Songs.create(req.body)
        .then(song => {
            var response = {
                data: song,
                message: 'Successfully added a song!'
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})
// add playlist
router.post('/music/playlists', (req, res, next) => {
    Playlists.create(req.body)
        .then(playlist => {
            var response = {
                data: playlist,
                message: 'Successfully created a playlist!'
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})


// add new song to playlist
router.post('/music/playlists/:pid/songs', (req, res, next) => {
    req.body.playlistId = req.params.pid
    Songs.create(req.body)
        .then(song => {
            var response = {
                data: song,
                message: 'Successfully added song to playlist!'
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

//update songs
router.put('/music/playlists/:pid/songs/:id', (req, res, next) => {
    Songs.findByIdAndUpdate(req.params.id, req.body)
        .then(song => {
            res.send('Song was updated successfully!')
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.put('/music/songs/:id', (req, res, next) => {
    console.log(req.body)
    Songs.findByIdAndUpdate(req.params.id, req.body)
    .then(song => {
        var response = {
            data: song,
            message: 'Successfully updated song!'
        }
        res.send(response)
    })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})


router.delete('/music/songs/:id', (req, res, next) => {
    Songs.findByIdAndRemove(req.params.id)
        .then(song => {
            var response = {
                data: song,
                message: 'So much for that song'
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})




module.exports = router