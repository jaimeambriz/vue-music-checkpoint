<template>
  <div class="iTunes">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <div class="row">
      <mytunes class="mytunes col-sm-6"></mytunes>
      <itunes class="itunes col-sm-6">
      </itunes>
    </div>
  </div>
</template>

<script>

  import itunes from './itunes'
  import mytunes from './mytunes'

  export default {
    components: {
      mytunes,
      itunes
    }
  }
</script>


<style>
  .mytunes {
    display: inline-block;
    min-height: 500px;
    min-width: 50%;
    background: green;
  }

  .itunes {
    background-image: url(http://theartmad.com/wp-content/uploads/2015/08/Cool-Music-Backgrounds-For-Twitter-1.gif);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    min-height: 500px;
    min-width: 50%;
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