<template>
    <div class="mytunes">
        <h1 class="text-center" style="font-family: fantasy; color: white">My Playlist</h1>
        <div v-for="song in myTunes" class="song container">
            <div class="row">
                <div class="col-sm-3 flex">
                    <div class="img">
                        <img :src="song.albumArt" alt="">
                        <button @click="removeFromPlaylist(song._id)" class="btn btn-danger">Remove Track</button>
                    </div>

                </div>
                <div class="col-sm-9 info">
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
                            <i class="glyphicon glyphicon-chevron-up" style="color: white;" @click="promoteTrack(song)"></i>
                            <p>{{song.rank}}</p>
                        </li>
                        <i class="glyphicon glyphicon-chevron-down" style="color: white;" @click="demoteTrack(song)"></i>
                        <li>
                            <audio controls class="audio">
                                <source :src="song.preview" type="audio/ogg">
                                <source :src="song.preview" type="audio/mpeg">
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
                song.rank++
                this.$store.dispatch('promoteTrack', song)
            },
            demoteTrack(song) {
                song.rank--
                this.$store.dispatch('demoteTrack', song)
            }
        },
        computed: {
            myTunes() {
                return this.$store.state.myTunes
            }
        }
    }
</script>
<style>
i:hover{
    cursor:pointer;
}



</style>