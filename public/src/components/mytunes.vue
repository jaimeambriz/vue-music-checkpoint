<template>
    <div class="mytunes">
        <h1 class="text-center my-playlist" style="font-family: fantasy; color: white; position:fixed">My Playlist</h1>
        <div class="container">
            <draggable v-model="myTunes">
                <transition-group name="list-complete">
                    
                    <!-- ********** WITH WATCHER ********** -->
                    <div v-for="song in myTunes" :key="song._id" class="song">

                        <!-- ********** USE i TO KEEP TRACK OF SONGS WITHOUT A WATCHER, OTHERWISE YOU WILL NEED A WATCHER CURRENTLY USING WATCHER FOR EXAMPLE*********
                        <div v-for="(song, i) in myTunes" :key="song._id" class="song"> -->

                        <div class="row" :id="song._id">
                            <div class="col-sm-3 flex img-animation" id="my-tunes-img">
                                <div class="img" style="padding-left: 14%;">
                                    <img :src="song.albumArt" alt="album art">
                                    <button @click="removeFromPlaylist(song)" class="btn btn-danger">Remove Track</button>
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
                                        <!-- ********** WITH WATCHER ********** -->
                                        <my-audio :song="song"></my-audio>

                                        <!-- ********** WITHOUT WATCHER **********
                                        <audio controls class="audio" ref="player" v-if="song.preview">
                                            <source id="audio" :src="song.preview" type="audio/ogg">
                                            <source id="audio" :src="song.preview" type="audio/mpeg"> 
                                                Your browser does not support the audio element.
                                        </audio> -->
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>


<script>
    import MyAudio from './MyAudio'
    import Draggable from 'vuedraggable'
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
                var myTunes = this.$store.state.myTunes
                this.$store.dispatch('removeTrack', song)
                song = myTunes[song.rank - 1]
                $(`#${song._id}`).addClass('animated zoomOutLeft').one('animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd', function () {
                    $(this).removeClass('animated zoomOutLeft')
                })
            },
            promoteTrack(song) {
                var myTunes = this.$store.state.myTunes
                if (song.rank != 1) {
                    this.$store.dispatch('promoteTrack', song)
                    // song = myTunes[song.rank]
                    // $(`#${song._id}`).addClass('animated slideInUp').one('animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd', function () {
                    //     $(this).removeClass('animated slideInUp')
                    // })
                    // song = myTunes[song.rank - 2]
                    // $(`#${song._id}`).addClass('animated slideInDown').one('animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd', function () {
                    //     $(this).removeClass('animated slideInDown')
                    // })
                } else {
                    song = myTunes[song.rank - 1]
                    $(`#${song._id}`).addClass('animated tada').one('animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd', function () {
                        $(this).removeClass('animated tada')
                    })
                }
            },
            demoteTrack(song) {
                var myTunes = this.$store.state.myTunes
                if (song.rank != myTunes.length) {
                    this.$store.dispatch('demoteTrack', song)
                    // song = myTunes[song.rank - 2]
                    // $(`#${song._id}`).addClass('animated slideInDown').one('animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd', function () {
                    //     $(this).removeClass('animated slideInDown')
                    // })
                    // song = myTunes[song.rank]
                    // $(`#${song._id}`).addClass('animated slideInUp').one('animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd', function () {
                    //     $(this).removeClass('animated slideInUp')
                    // })
                } else {
                    song = myTunes[song.rank - 1]
                    $(`#${song._id}`).addClass('animated tada').one('animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd', function () {
                        $(this).removeClass('animated tada')
                    })
                }
            }
        },
        computed: {
            myTunes: {
                get() {
                    setTimeout(function () { $(".img-animation ").removeClass('img-animation'); }, 2000)
                    setTimeout(function () { $(".info-animation ").removeClass('info-animation'); }, 2000)
                    return this.$store.state.myTunes

                },
                set(myTunes) {
                    this.$store.dispatch('dragUpdateTracks', myTunes)
                }

            }
        },
        components: {
            MyAudio,
            Draggable

        }
    }
</script>
<style scoped>
    i:hover {
        cursor: pointer;
    }

    .promote-demote {
        display: flex;
        justify-content: center;
        justify-content: space-around;
        align-items: baseline;
        max-width: 138px;
    }

    .song {
        transition: all .5s;
    }

    .list-complete-enter,
    .list-complete-leave-active {
        opacity: 0;
    }

    .my-playlist {
        left: 10%;
        top: 1%;
        z-index: 4
    }
</style>