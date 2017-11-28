<template>
    <div class="itunes">
        <form @submit.prevent="getMusicByArtist" class="form text-center">
            <input type="text" class="text-center" placeholder="Artist/Song" v-model="searchArtist">
            <button type="submit">Get Trak§</button>
        </form>


        <div v-for="song in results" class="song container">
            <div class="row">
                <div class="col-sm-3 flex">
                    <div class="img">
                        <img :src="song.artworkUrl100" alt="">
                        <button @click="addToMyTunes(song)" class="btn btn-success">add to playlist</button>
                    </div>

                </div>
                <div class="col-sm-9 info">
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
</template>


<script>
    export default {
        name: 'itunes',
        data() {
            return {
                searchArtist: ''

            }
        },

        methods: {
            getMusicByArtist() {
                this.$store.dispatch('getMusicByArtist', this.searchArtist)
                this.searchArtist = ''
            },
            addToMyTunes(song) {
                song.rank = this.$store.state.myTunes.length+1
                this.$store.dispatch('addToMyTunes', song )

            }
        },
        computed: {
            results() {
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
        text-align: center;
    }

    .container {
        max-width: 100%;
    }

    .flex {
        display: flex;
        justify-content: flex-end;
        margin-top: 3.5%;
        animation: 1.1s cubic-bezier(0, 0.03, 0.15, 1.6) 0s 1 slideInFromTop;
    }

    .img {
        margin-top: 20px;
    }

    .info {
        animation: 1.1s cubic-bezier(0, 0.03, 0.15, 1.6) 0s 1 slideInFromBottom;

    }

    @keyframes slideInFromBottom {
        0% {
            transform: translateY(300%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes slideInFromTop {
        0% {
            transform: translateY(-400%);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>