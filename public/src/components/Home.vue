<template>
  <div class="iTunes scroll-container">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <div class="row insert">

      
      <mytunes class="mytunes col-sm-5 scroll"></mytunes>

      <div class="title col-sm-1">
        <h1 id="traks">T</h1>
        <h1 id="traks">R</h1>
        <h1 id="traks">A</h1>
        <h1 id="traks">K</h1>
        <h1 id="traks">§</h1>
      </div>


      <itunes class="itunes col-sm-5 scroll-1"></itunes>



    </div>
  </div>
</template>

<script>

  import itunes from './itunes'
  import mytunes from './mytunes'
  

  document: addEventListener('play', function (e) {
    var audios = document.getElementsByClassName('audio');
    for (var i = 0, len = audios.length; i < len; i++) {
      if (audios[i] != e.target) {
        audios[i].pause();
      }
    }
  }, true)

  export default {
    components: {
      mytunes,
      itunes
    },

  }
</script>

<style >
  /* * {
    outline: red solid 1px;
  } */

  .insert {
    margin-right: 0;
  }

  .iTunes {
    background: url(../assets/carbon-fiber-background.png);
    background-attachment: fixed;
    background-size: cover;
  }

  .mytunes {
    /* background-image:url(https://w-dog.net/wallpapers/13/11/328555144239797/background-headphones-wallpaper-dark.jpg);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
    display: inline-block;
    min-height: 500px;
    min-width: 47%;
    margin-top:8rem
  }

  #traks {
    font-size: 80px;
    color: rgba(247, 3, 3, 0.7);
    font-family: Arial, Helvetica, sans-serif
  }

  .itunes {
    /* background-image: url(http://theartmad.com/wp-content/uploads/2015/08/Cool-Music-Backgrounds-For-Twitter-1.gif);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
    display: inline-block;
    min-height: 500px;
    min-width: 47%;
    padding-left: 6%;
    margin-top:8rem
  }

  div.scroll-container {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;

  }

  div.scroll-container .scroll {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-y: scroll;
  }

  div.scroll-container .scroll-1 {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 35px;
    overflow-y: scroll;
  }

  .title {
    display: inline-block;
    min-height: 500px;
    min-width: 1%;
    position: fixed;
    top: 10%;
    right: 48%;

    /* border: 3px solid #73AD21; */
  }

  .flex {
    display: flex;
    justify-content: flex-end;
    margin-top: 3.5%;
  }
  .img-animation{
    animation: 1.1s cubic-bezier(0, 0.03, 0.15, 1.6) 0s 1 slideInFromTop;
  }

  .img {
    margin-top: 20px;
  }

  .info-animation {
    animation: 1.1s cubic-bezier(0, 0.03, 0.15, 1.6) 0s 1 slideInFromBottom;

  }

  /* div.scroll-container{
    height:100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
}

div.scroll-container .scroll {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
    overflow-y: scroll;
} */

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