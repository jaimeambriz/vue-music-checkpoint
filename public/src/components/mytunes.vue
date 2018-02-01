<template>
    <div class="mytunes">
        <h1 class="text-center" style="font-family: fantasy; color: white">My Playlist</h1>
        <div v-if="myTunes.length > 0" v-for="song in myTunes" class="song container">
            <div class="row">
                <div class="col-sm-3 flex img-animation" id="my-tunes-img">
                    <div class="img">
                        <img :src="song.albumArt" alt="">
                        <button @click="removeFromPlaylist(song._id)" class="btn btn-danger">Remove Track</button>
                        <div class="row">
                            <div class="col-sm-12 promote-demote">
                                <i class="fa fa-arrow-up fa-lg" style="color: white;" @click="promoteTrack(song)"></i>
                                <h4>{{song.rank}}</h4>
                                <i class="fa fa-arrow-down fa-lg" style="color: white;" @click="demoteTrack(song)"></i>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="col-sm-9 info-animation" id="my-tunes-info">
                    <ul>
                        <li>
                            <h3>{{song.title}}</h3>

                        </li>
                        <li>
                            <h3>{{song.artist}}</h3>

                        </li>
                        <li>
                            <h4>{{song.album}}</h4>

                        </li>
                        <li>
                            <p>{{song.albumPrice}}</p>

                        </li>
                        <li>
                            <my-audio :song="song"></my-audio>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import MyAudio from './MyAudio'
    export default {
        name: 'mytunes',

        data() {
            return {
            }
        },
        mounted() {
            this.$store.dispatch('getMyTunes')

        },
        methods: {
            removeFromPlaylist(song) {
                this.$store.dispatch('removeTrack', song)
            },
            promoteTrack(song) {
                // $('#my-tunes-img').removeClass('img-animation'),
                //     $('#my-tunes-info').removeClass('info-animation'),
                this.$store.dispatch('promoteTrack', song)

            },
            demoteTrack(song) {
                // $('#my-tunes-img').removeClass('img-animation'),
                //     $('#my-tunes-info').removeClass('info-animation'),
                this.$store.dispatch('demoteTrack', song)
            }
        },
        computed: {
            myTunes() {
                return this.$store.state.myTunes
            },
        },
        components: {
            MyAudio
        }
    }
</script>
<style>
    i:hover {
        cursor: pointer;
    }

    .promote-demote {
        display: flex;
        justify-content: center;
        justify-content: space-around;
        align-items: baseline;
    }
</style>