webpackJsonp([0],[,,function(t,e,a){"use strict";var n=a(10),s=a.n(n),i=a(1),r=a(31),o=a(18),c=a.n(o),u=window.location.host.indexOf("localhost")>-1?"//localhost:3000/":"https://my-vue-music.herokuapp.com/";i.a.use(r.a);var l=new r.a.Store({state:{myTunes:[],results:[],error:{}},mutations:{setResults:function(t,e){i.a.set(t,"results",e)},setMyTunes:function(t,e){e.sort(function(t,e){return t.rank-e.rank}),t.myTunes=e},handleError:function(t,e){t.error=e}},actions:{getMusicByArtist:function(t,e){var a=t.commit;t.dispatch;a("setResults",[]);var n="https://itunes.apple.com/search?term="+e;encodeURIComponent(n);c.a.getJSON(n).then(function(t){a("setResults",t.results)}).catch(function(t){a("handleError",t)})},getMyTunes:function(t){var e=t.commit;t.dispatch;c.a.getJSON(u+"music/songs").then(function(t){e("setMyTunes",t)}).catch(function(t){e("handleError",t)})},addToMyTunes:function(t,e){var a=t.commit,n=t.dispatch,s=u+"music/songs",i={title:e.trackName,albumArt:e.artworkUrl100,artist:e.artistName,album:e.collectionName,albumPrice:e.collectionPrice,preview:e.previewUrl,genre:e.primaryGenreName,trackId:e.trackId,rank:e.rank};c.a.post(s,i).then(function(t){n("getMyTunes")}).catch(function(t){a("handleError",t)})},removeTrack:function(t,e){var a=t.commit,n=t.dispatch;c.a.ajax({url:u+"music/songs/"+e._id,method:"DELETE"}).then(function(t){n("updateTracks",e)}).catch(function(t){a("handleError",t)})},dragUpdateTracks:function(t,e){for(var a=t.commit,n=(t.dispatch,l.state.myTunes),i=0;i<e.length;i++){var r=e[i];r.rank=i+1,r._id!==n[i]._id&&c.a.ajax({url:u+"music/songs/"+r._id,method:"PUT",contentType:"application/json",data:s()(r)}).then(function(t){}).catch(function(t){a("handleError",t)})}a("setMyTunes",e)},updateTracks:function(t,e){var a=t.commit,n=(t.dispatch,l.state.myTunes);n.splice(e.rank-1,1);for(var i=e.rank-1;i<n.length;i++){var e=n[i];e.rank--,c.a.ajax({url:u+"music/songs/"+e._id,method:"PUT",contentType:"application/json",data:s()(e)}).then(function(t){}).catch(function(t){a("handleError",t)})}a("setMyTunes",n)},promoteTrack:function(t,e){var a=t.commit,n=(t.dispatch,l.state.myTunes),i={};if(e.rank>1){e.rank--;for(var r=0;r<n.length;r++){var o=n[r];if(e.rank==o.rank&&e._id!==o._id){i=o,i.rank++;break}}a("setMyTunes",n),c.a.ajax({url:u+"music/songs/"+i._id,method:"PUT",contentType:"application/json",data:s()(i)}).then(function(t){}).catch(function(t){a("handleError",t)}),c.a.ajax({url:u+"music/songs/"+e._id,method:"PUT",contentType:"application/json",data:s()(e)}).then(function(t){}).catch(function(t){a("handleError",t)})}else a("setMyTunes",n)},demoteTrack:function(t,e){var a=t.commit,n=(t.dispatch,l.state.myTunes),i={};if(e.rank<n.length){e.rank++;for(var r=0;r<n.length;r++){var o=n[r];if(e.rank==o.rank&&e._id!==o._id){i=o,i.rank--;break}}a("setMyTunes",n),c.a.ajax({url:u+"music/songs/"+i._id,method:"PUT",contentType:"application/json",data:s()(i)}).then(function(t){}).catch(function(t){a("handleError",t)}),c.a.ajax({url:u+"music/songs/"+e._id,method:"PUT",contentType:"application/json",data:s()(e)}).then(function(t){}).catch(function(t){a("handleError",t)})}else a("setMyTunes",n)}}});e.a=l},function(t,e,a){a(15);var n=a(0)(a(4),a(26),null,null);t.exports=n.exports},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(20),s=a.n(n);e.default={name:"app",components:{Home:s.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(22),s=a.n(n),i=a(23),r=a.n(i);addEventListener("play",function(t){for(var e=document.getElementsByClassName("audio"),a=0,n=e.length;a<n;a++)e[a]!=t.target&&e[a].pause()},!0),e.default={components:{mytunes:r.a,itunes:s.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"MyAudio",props:["song"],watch:{song:function(){this.$refs.player.load()}},data:function(){return{}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"itunes",data:function(){return{searchArtist:""}},methods:{getMusicByArtist:function(){this.$store.dispatch("getMusicByArtist",this.searchArtist),this.searchArtist=""},addToMyTunes:function(t){t.rank=this.$store.state.myTunes.length+1,this.$store.dispatch("addToMyTunes",t)}},computed:{results:function(){return this.$store.state.results}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(21),s=a.n(n),i=a(30),r=a.n(i);e.default={name:"mytunes",data:function(){return{drag:!1}},mounted:function(){this.$store.dispatch("getMyTunes")},methods:{enableDrag:function(){this.drag=!this.drag,this.drag?$("#draggable").removeClass("active").addClass("inactive"):$("#draggable").removeClass("inactive").addClass("active")},removeFromPlaylist:function(t){var e=this.$store.state.myTunes;this.$store.dispatch("removeTrack",t),t=e[t.rank-1],$("#"+t._id).addClass("animated zoomOutLeft").one("animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd",function(){$(this).removeClass("animated zoomOutLeft")})},promoteTrack:function(t){var e=this.$store.state.myTunes;1!=t.rank?this.$store.dispatch("promoteTrack",t):(t=e[t.rank-1],$("#"+t._id).addClass("animated tada").one("animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd",function(){$(this).removeClass("animated tada")}))},demoteTrack:function(t){var e=this.$store.state.myTunes;t.rank!=e.length?this.$store.dispatch("demoteTrack",t):(t=e[t.rank-1],$("#"+t._id).addClass("animated tada").one("animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd",function(){$(this).removeClass("animated tada")}))}},computed:{myTunes:{get:function(){return setTimeout(function(){$(".img-animation ").removeClass("img-animation")},2e3),setTimeout(function(){$(".info-animation ").removeClass("info-animation")},2e3),this.$store.state.myTunes},set:function(t){this.$store.dispatch("dragUpdateTracks",t)}}},components:{MyAudio:s.a,Draggable:r.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(1),s=a(3),i=a.n(s),r=a(2);new n.a({el:"#app",template:"<App/>",store:r.a,components:{App:i.a}})},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e,a){a(17);var n=a(0)(a(5),a(28),null,null);t.exports=n.exports},function(t,e,a){a(13);var n=a(0)(a(6),a(24),null,null);t.exports=n.exports},function(t,e,a){a(16);var n=a(0)(a(7),a(27),null,null);t.exports=n.exports},function(t,e,a){a(14);var n=a(0)(a(8),a(25),"data-v-3112f5a9",null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.song.preview?a("audio",{ref:"player",staticClass:"audio",attrs:{controls:""}},[a("source",{attrs:{id:"audio",src:t.song.preview,type:"audio/ogg"}}),t._v(" "),a("source",{attrs:{id:"audio",src:t.song.preview,type:"audio/mpeg"}}),t._v("\n        Your browser does not support the audio element.\n")]):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mytunes"},[a("img",{staticClass:"drag-enable active",attrs:{src:"http://www.enochsystems.com/intl/wp-content/uploads/2015/05/1-drag-flick.png",alt:"drag icon",id:"draggable"},on:{click:t.enableDrag}}),t._v(" "),a("h1",{staticClass:"text-center my-playlist",staticStyle:{"font-family":"fantasy",color:"white",position:"fixed"}},[t._v("My Playlist")]),t._v(" "),a("div",{staticClass:"container"},[a("draggable",{attrs:{options:{disabled:t.drag}},model:{value:t.myTunes,callback:function(e){t.myTunes=e},expression:"myTunes"}},[a("transition-group",{attrs:{name:"list-complete"}},t._l(t.myTunes,function(e){return a("div",{key:e._id,staticClass:"song"},[a("div",{staticClass:"row",attrs:{id:e._id}},[a("div",{staticClass:"col-sm-3 flex img-animation sortable-drag",attrs:{id:"my-tunes-img"}},[a("div",{staticClass:"img",staticStyle:{"padding-left":"14%"}},[a("img",{attrs:{src:e.albumArt,alt:"album art"}}),t._v(" "),a("button",{staticClass:"btn btn-danger",on:{click:function(a){t.removeFromPlaylist(e)}}},[t._v("Remove Track")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12 promote-demote"},[a("i",{staticClass:"fa fa-arrow-up fa-lg",staticStyle:{color:"white"},on:{click:function(a){t.promoteTrack(e)}}}),t._v(" "),a("h4",[t._v(t._s(e.rank))]),t._v(" "),a("i",{staticClass:"fa fa-arrow-down fa-lg",staticStyle:{color:"white"},on:{click:function(a){t.demoteTrack(e)}}})])])])]),t._v(" "),a("div",{staticClass:"col-sm-9 info-animation",attrs:{id:"my-tunes-info"}},[a("ul",[a("li",[a("h3",[t._v(t._s(e.title))])]),t._v(" "),a("li",[a("h3",[t._v(t._s(e.artist))])]),t._v(" "),a("li",[a("h4",[t._v(t._s(e.album))])]),t._v(" "),a("li",[a("p",[t._v(t._s(e.albumPrice))])]),t._v(" "),a("li",[a("my-audio",{attrs:{song:e}})],1)])])])])}))],1)],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("home")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"itunes"},[a("form",{staticClass:"form text-center",staticStyle:{position:"fixed"},on:{submit:function(e){e.preventDefault(),t.getMusicByArtist(e)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchArtist,expression:"searchArtist"}],staticClass:"text-center",attrs:{type:"text",placeholder:"Artist/Song"},domProps:{value:t.searchArtist},on:{input:function(e){e.target.composing||(t.searchArtist=e.target.value)}}}),t._v(" "),a("button",{attrs:{type:"submit"}},[t._v("Get Trak§")])]),t._v(" "),a("div",{staticClass:"container"},t._l(t.results,function(e){return a("div",{staticClass:"song"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-3 flex img-animation"},[a("div",{staticClass:"img"},[a("img",{attrs:{src:e.artworkUrl100,alt:""}}),t._v(" "),a("button",{staticClass:"btn btn-success",on:{click:function(a){t.addToMyTunes(e)}}},[t._v("add to playlist")])])]),t._v(" "),a("div",{staticClass:"col-sm-9 info-animation"},[a("ul",[a("li",[a("h3",[t._v(t._s(e.trackName))])]),t._v(" "),a("li",[a("h3",[t._v(t._s(e.artistName))])]),t._v(" "),a("li",[a("h4",[t._v(t._s(e.collectionName))])]),t._v(" "),a("li",[a("p",[t._v(t._s(e.collectionPrice))])]),t._v(" "),a("li",[a("audio",{staticClass:"audio",attrs:{controls:""}},[a("source",{attrs:{src:e.previewUrl,type:"audio/ogg"}}),t._v(" "),a("source",{attrs:{src:e.previewUrl,type:"audio/mpeg"}})])])])])])])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"iTunes scroll-container"},[a("div",{staticClass:"row insert"},[a("mytunes",{staticClass:"mytunes col-sm-5 scroll"}),t._v(" "),t._m(0),t._v(" "),a("itunes",{staticClass:"itunes col-sm-5 scroll-1"})],1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title col-sm-1"},[a("h1",{attrs:{id:"traks"}},[t._v("T")]),t._v(" "),a("h1",{attrs:{id:"traks"}},[t._v("R")]),t._v(" "),a("h1",{attrs:{id:"traks"}},[t._v("A")]),t._v(" "),a("h1",{attrs:{id:"traks"}},[t._v("K")]),t._v(" "),a("h1",{attrs:{id:"traks"}},[t._v("§")])])}]}}],[9]);
//# sourceMappingURL=app.f7231e909bfe883eab4a.js.map