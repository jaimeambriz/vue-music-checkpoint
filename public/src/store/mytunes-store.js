import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    myTunes: [],
    results: [],
    exampleList: [
      { Item: "hello1" }, 
      { Item: "hello2" }, 
      { Item: "hello3" }, 
      { Item: "hello4" }

    ]
  },

  mutations: {
    setResults(state, results) {
      vue.set(state, 'results', results.results)
    },
    setMyTunes(state, songs) {
      songs.sort(function (a, b) {
        return a.rank - b.rank;
      })
      state.myTunes = songs
      console.log("my tunes:", state.myTunes)
    }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, artist) {
      var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      var apiUrl = url + encodeURIComponent(url2);
      $.getJSON(url2).then(data => {
        commit('setResults', data)
        console.log('search results:', data)
      })
    },
    getMyTunes({ commit, dispatch }) {
      //this should send a get request to your server to return the list of saved tunes
      $.getJSON('http://localhost:3000/music/songs')
        .then(songs => {
          commit('setMyTunes', songs)
        })

    },
    addToMyTunes({ commit, dispatch }, song) {
      //this will post to your server adding a new track to your tunes
      var url = 'http://localhost:3000/music/songs'
      var track = {
        title: song.trackName,
        albumArt: song.artworkUrl100,
        artist: song.artistName,
        album: song.collectionName,
        albumPrice: song.collectionPrice,
        preview: song.previewUrl,
        genre: song.primaryGenreName,
        trackId: song.trackId,
        rank: song.rank
      }
      console.log('added song:', track)
      $.post(url, track)
        .then(res => {
          console.log('addToMyTunes response: ', res)
          dispatch('getMyTunes')
        })
    },
    removeTrack({ commit, dispatch }, song) {
      //Removes track from the database with delete
      $.ajax({
        // url:`http://localhost:3000/music/songs/${song}`,
        url: "http://localhost:3000/music/songs/" + song,
        method: 'DELETE'
      })
        .then(res => {
          console.log("removed track:", res)
          dispatch('getMyTunes')
        })
    },
    promoteTrack({ commit, dispatch }, song) {
      //this should increase the position / upvotes and downvotes on the track
      var myTunes = store.state.myTunes
      var nextSong = {}
      if (song.rank > 1) {
        song.rank--
        for (let i = 0; i < myTunes.length; i++) {
          const conflictingSong = myTunes[i]
          if (song.rank == conflictingSong.rank && song._id !== conflictingSong._id) {
            nextSong = conflictingSong
            nextSong.rank++
          }
        }
        $.ajax({
          // url:`http://localhost:3000/music/songs/${song}`,
          url: "http://localhost:3000/music/songs/" + nextSong._id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(nextSong)
        })
          .then(res => {
            console.log("Updated Next Song:", res)
          })
        $.ajax({
          // url:`http://localhost:3000/music/songs/${song}`,
          url: "http://localhost:3000/music/songs/" + song._id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(song)
        })
          .then(res => {
            console.log("Updated track:", res)
            dispatch('getMyTunes')
          })
      } else {
        console.log("Can't do that, alrady at the top!")
      }
    },
    demoteTrack({ commit, dispatch }, song) {
      //this should decrease the position / upvotes and downvotes on the
      var myTunes = store.state.myTunes
      var nextSong = {}
      if (song.rank < myTunes.length) {
        song.rank++
        for (let i = 0; i < myTunes.length; i++) {
          const conflictingSong = myTunes[i]
          if (song.rank == conflictingSong.rank && song._id !== conflictingSong._id) {
            nextSong = conflictingSong
            nextSong.rank--
          }
        }
        $.ajax({
          // url:`http://localhost:3000/music/songs/${song}`,
          url: "http://localhost:3000/music/songs/" + nextSong._id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(nextSong)
        })
          .then(res => {
            console.log("Updated Next Song:", res)
          })
        $.ajax({
          // url:`http://localhost:3000/music/songs/${song}`,
          url: "http://localhost:3000/music/songs/" + song._id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(song)

        })
          .then(res => {
            console.log("Updated track:", res)
            dispatch('getMyTunes')
          })

      } else {
        console.log("can't do that, already at lowest rank!")
      }
    }

  }
})

export default store

