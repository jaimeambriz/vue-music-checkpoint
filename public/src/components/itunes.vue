<template>
    <div class="itunes">
        <form @submit.prevent="getMusicByArtist" class="form text-center" style="position:fixed">
            <input type="text" class="text-center" placeholder="Artist/Song" v-model="searchArtist">
            <button type="submit" id="get-music-button" >Get Trak§</button>
        </form>
        <div class="container">
            <div v-for="song in results" class="song">
                <div class="row">
                    <div class="col-sm-3 flex img-animation">
                        <div class="img">
                            <img :src="song.artworkUrl100" alt="">
                            <button @click="addToMyTunes(song)" class="btn btn-success">add to playlist</button>
                        </div>

                    </div>
                    <div class="col-sm-9 info-animation">
                        <ul>
                            <li>
                                <h3>{{song.trackName}}</h3>

                            </li>
                            <li>
                                <h3>{{song.artistName}}</h3>

                            </li>
                            <li>
                                <h4>{{song.collectionName}}</h4>

                            </li>
                            <li>
                                <p>{{song.collectionPrice}}</p>

                            </li>
                            <li>
                                <audio controls class="audio">
                                    <source :src="song.previewUrl" type="audio/ogg">
                                    <source :src="song.previewUrl" type="audio/mpeg">
                                </audio>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import swal from'sweetalert2'
    import tag from '../assets/check-mark.png'
    export default {
        name: 'itunes',
        data() {
            return {
                searchArtist: ''

            }
        },

        methods: {
            getMusicByArtist() {
                $('#get-music-button').text('Loading....')
                this.$store.dispatch('getMusicByArtist', this.searchArtist)
                this.searchArtist = ''
            },
            addToMyTunes(song) {
                var x = '../src/assets/check-mark.png'
                song.rank = this.$store.state.myTunes.length + 1
                this.$store.dispatch('addToMyTunes', song)
                swal({
                    position: 'center',
                    imageUrl: tag,
                    imageHeight: 100,
                    imageAlt: 'A Check Mark',
                    title: 'Successfuly added to your library',
                    showConfirmButton: false,
                    timer: 1000
                })

            }
        },
        computed: {
            results() {
                setTimeout(function () { $("#get-music-button").text('Get Trak§'); }, 1500)
                return this.$store.state.results
            }
        },

    }
</script>

<style>
    h3,
    h4,
    p {
        color: white;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    ul {
        padding-left: 0px
    }

    img {
        width: 108px;
        height: auto;
    }

    .btn {
        margin-top: 10px;
        max-width: 108px;
    }

    .form {
        right:15%;
        top: 3%;
        z-index: 5
        /* margin-top: 52px; */
        /* text-align: center; */
    }

    .container {
        max-width: 100%;
    }
</style>