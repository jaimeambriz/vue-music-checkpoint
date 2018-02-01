<template>
    <audio controls class="audio" ref="player" v-if="song.preview">
        <source id="audio" :src="song.preview" type="audio/ogg">
        <source id="audio" :src="song.preview" type="audio/mpeg">
            Your browser does not support the audio element.
    </audio>
</template>


<script>
    export default {
        name: 'MyAudio',
        props: ['song'],
        watch: {
            song: function() {
                this.$refs.player.load()
            }
        },
        data() {
            return {
            }
        }
       
    }
</script>
<style>
</style>