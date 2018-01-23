var express = require('express')
var port = 3000
var server = express()
var bp = require('body-parser')
var DBConnect = require('./config/mlab.js')
var musicRoutes = require('./routes/music-routes')
var cors = require('cors')



//middleWare
server.use(cors({}))
server.use(express.static(__dirname + '/../public/dist'))
server.use(bp.json())
server.use(bp.urlencoded({extended: true}))




//routes
server.use(musicRoutes)

//getMytunes (get)

//addSongToList(post)

//updateRank(put)

//deleteTrak(delete)

server.listen(port, function(){
    console.log('Server running on port: ', port)
})





