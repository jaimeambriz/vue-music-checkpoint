import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'
let base = window.location.host.indexOf('localhost') > -1 ? '//localhost:3000/' : 'https://my-vue-music.herokuapp.com/'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    myTunes: [],
    results: [],
  },

  mutations: {
    setResults(state, payload) {
      vue.set(state, 'results', payload)
    },
    setMyTunes(state, songs) {
      songs.sort(function (a, b) {
        return a.rank - b.rank;
      })
      state.myTunes = songs
      // console.log("my tunes:", state.myTunes)
    }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, artist) {
      commit('setResults', [])
      var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      var apiUrl = url + encodeURIComponent(url2);
      $.getJSON(url2).then(data => {
        commit('setResults', data.results)
        // console.log('search results:', data)
      })
    },
    getMyTunes({ commit, dispatch }) {
      //this should send a get request to your server to return the list of saved tunes
      $.getJSON(base + 'music/songs')
        .then(songs => {
          commit('setMyTunes', songs)
        })

    },
    addToMyTunes({ commit, dispatch }, song) {
      //this will post to your server adding a new track to your tunes
      var url = base + 'music/songs'
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
        url: base + "music/songs/" + song._id,
        method: 'DELETE'
      })
        .then(res => {
          console.log("removed track:", res)
          // dispatch('getMyTunes')
          dispatch('updateTracks', song)
        })
    },
    dragUpdateTracks({commit,dispatch}, songs){
      for (var i = 0; i < songs.length; i++){
        var song = songs[i]
        song.rank = i+1
      }
      commit('setMyTunes', songs)
    },
    updateTracks({ commit, dispatch }, song) {
      var myTunes = store.state.myTunes
      myTunes.splice(song.rank-1,1)
      for (var i = song.rank-1; i < myTunes.length; i++) {
        var song = myTunes[i];
        song.rank--
        $.ajax({
          // url:`http://localhost:3000/music/songs/${song}`,
          url: base + "music/songs/" + song._id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(song)
        })
          .then(res => {
            console.log("Updated track:", res)
          })
      }
        commit('setMyTunes', myTunes)
    },
    promoteTrack({ commit, dispatch }, song) {
      //this should increase the position / upvotes and downvotes on the track
      var myTunes = store.state.myTunes
      var nextSong = {}
      if (song.rank > 1) {
        song.rank--
        // myTunes.splice(5,1,song)
        for (var i = 0; i < myTunes.length; i++) {
          var conflictingSong = myTunes[i]
          if (song.rank == conflictingSong.rank && song._id !== conflictingSong._id) {
            nextSong = conflictingSong
            nextSong.rank++
            break;
            // myTunes.splice(i,1, nextSong)
          }
        }
        commit("setMyTunes", myTunes)
        $.ajax({
          // url:`http://localhost:3000/music/songs/${song}`,
          url: base + "music/songs/" + nextSong._id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(nextSong)
        })
          .then(res => {
            // console.log("Updated Next Song:", res)
          })
        $.ajax({
          // url:`http://localhost:3000/music/songs/${song}`,
          url: base + "music/songs/" + song._id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(song)
        })
          .then(res => {
            console.log("Updated track:", res)
          })
      } else {
        commit("setMyTunes", myTunes)
        console.log("Can't do that, alrady at the top!")
      }
    },
    demoteTrack({ commit, dispatch }, song) {
      //this should decrease the position / upvotes and downvotes on the
      var myTunes = store.state.myTunes
      var nextSong = {}
      if (song.rank < myTunes.length) {
        song.rank++
        for (var i = 0; i < myTunes.length; i++) {
          var conflictingSong = myTunes[i]
          if (song.rank == conflictingSong.rank && song._id !== conflictingSong._id) {
            nextSong = conflictingSong
            nextSong.rank--
            break;
          }
        }
        commit("setMyTunes", myTunes)
        $.ajax({
          // url:`http://localhost:3000/music/songs/${song}`,
          url: base + "music/songs/" + nextSong._id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(nextSong)
        })
          .then(res => {
            // console.log("Updated Next Song:", res)
          })
        $.ajax({
          // url:`http://localhost:3000/music/songs/${song}`,
          url: base + "music/songs/" + song._id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(song)

        })
          .then(res => {
            console.log("Updated track:", res)
          })

      } else {
        commit("setMyTunes", myTunes)
        console.log("can't do that, already at lowest rank!")
      }
    }

  }
})

export default store

