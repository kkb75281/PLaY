<template lang="pug">
#search
    .material-symbols-outlined.mid.bl.empty.icon(:class="{'active' : searchText}") search
    input(type="text" v-model="searchText")
br

#list
    .wrap
        .albumWrap
            .albumInner 
                .album(v-for="(track, index) in tracks" :id="'track'+index" @click="clickTrack(index)")
                    img.cover(:src="track.cover")
                    .albumInfo 
                        h5.title {{ track.data.title }}
                        .artist {{ track.artist }}

#player(:class="{'show' : showPlayer, 'moveUp' : showAlbum}")
    .controller
        .progressBar(ref="progressBar" @click="moveTimeLine")
            .progress(ref="progress")
        .playerInfo
            .selectAlbum
                img.cover(:src="selectedAlbum.cover" @click="(e)=>showDetail(e)")
                .text
                    .title(@click="(e)=>showDetail(e)") {{ selectedAlbum.title }}
                    .artist(@click="(e)=>showDetail(e)") {{ selectedAlbum.artist }}
            .iconWrap
                .like.icon(@click="likeToggleButton")
                    .material-symbols-outlined.mid.wh.fill(v-if="like") favorite
                    .material-symbols-outlined.mid.wh.empty(v-else) favorite
                .material-symbols-outlined.mid.wh.empty.icon lyrics
            .playWrap 
                .material-symbols-outlined.mid.wh.fill(@click="playerControl('prev')") skip_previous
                .material-symbols-outlined.mid.wh.fill(v-if="playStart" @click="playAudio") pause
                .material-symbols-outlined.mid.wh.fill(v-if="!playStart" @click="playAudio") play_arrow
                .material-symbols-outlined.mid.wh.fill(@click="playerControl('next')") skip_next
            .timerWrap 
                span.current(ref="current") 0:00
                span /
                span.duration(ref="duration") 0:00
        .arrow
            .material-symbols-outlined.mid.wh.fill.down(v-if="showAlbum" @click="(e)=>showDetail(e)") expand_more
            .material-symbols-outlined.mid.wh.fill.up(v-else @click="(e)=>showDetail(e)") expand_less
    .viewDetail
        router-view(v-if="detail=='album'" name="album" :selectedAlbum='selectedAlbum')
        router-view(v-if="detail=='track'" name="music")
        router-view(v-if="detail=='artist'" name="artist")
        //- router-view(name="video")
</template>
<script setup>
import { skapi, account } from '@/main'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import { nextTick, onMounted, ref, watch } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Music from '@/views/Detail/Music.vue'
// import Player from '@/components/Player.vue'

let route = useRoute();
let router = useRouter();
let progressBar = ref(null);
let progress = ref(null);
let current = ref(null);
let duration = ref(null);
let showPlayer = ref(false);
let playStart = ref(false);
let showAlbum = ref(false);
let like = ref(false);
// let tracks = ref([]);
let selectedAlbum = ref([]);
let searchText = ref('');
let detail = ref('');
let AlbumIndex = 1;
let audio;

let albums = ref([]);
let tracks = ref([]);

skapi.getRecords({ table: 'Album' }).then(async(album) => {
    albums.value = album.list;
    console.log(albums.value)

    for (let i = 0; i < albums.value.length; i++) {
        await skapi.getRecords({ table: 'Track', reference: albums.value[i].record_id }).then((track) => {
            for (let j = 0; j < track.list.length; j++) {
                track.list[j].cover = albums.value[i].bin.cover[0].url;
                track.list[j].date = JSON.parse(albums.value[i].data.date);
                track.list[j].title = track.list[j].data.title;
                if(albums.value[i].data.artist) {
                    track.list[j].artist = albums.value[i].data.artist;
                } else {
                    track.list[j].artist = track.list[j].data.artist
                }
                tracks.value.push(track.list[j]);
            }
        });
    }

    tracks.value.sort(() => Math.random() - 0.5);
    console.log(tracks.value)
});



let initAlbum = () => {
    showPlayer.value = false;
    selectedAlbum.value = [];
    playStart.value = false;
    if(audio) {
        audio.pause();
    }
} 

let clickTrack = (index) => {
    initAlbum();

    showPlayer.value = true;
    selectedAlbum.value = tracks.value[index];
    console.log(selectedAlbum.value)
    console.log(selectedAlbum.value)
    audio = new Audio(selectedAlbum.value.bin.file[0].url);
    playAudio();
    audio.play();
    playStart.value = true;
}

let playAudio = () => {
    if(audio.paused) {
        audio.play();
        playStart.value = true;
    } else {
        audio.pause();
        playStart.value = false;
    }
    audio.addEventListener("timeupdate", (e) => {
        let currentTime = e.target.currentTime;
        let songDuration = e.target.duration;
        let progressWidth = (currentTime/songDuration) * 100;
    
        progress.value.style.width = `${progressWidth}%`;
    
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
    
        if(currentSec < 10) currentSec = `0${currentSec}`;
        current.value.innerText = `${currentMin}:${currentSec}`;
    });
    audio.addEventListener("loadeddata", () => {
        let audioDuration = audio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
    
        if(totalSec < 10) totalSec = `0${totalSec}`;
        duration.value.innerText = `${totalMin}:${totalSec}`;
    });
    // audio.play();

    audio.addEventListener("ended", () => {

    })
}

let moveTimeLine = (e) => {
    let progressWidth = progressBar.value.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = audio.duration;

    audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
}

let likeToggleButton = () => {
    if(like.value) {
        like.value = false;
    } else {
        like.value = true;
    }
}

let playerControl = (value) => {
    if(value == 'prev') {
        AlbumIndex == 1 ? AlbumIndex = tracks.value.length : AlbumIndex--;
        clickTrack(AlbumIndex)
    } else {

    }
}

let moveToMusicPage = () => {
    showAlbum.value = !showAlbum.value;
}

let currentRoute = null;
let checkRoute = (newRoute) => {
    console.log(currentRoute, newRoute)
    if(currentRoute == null) {
        showAlbum.value = true;
    } else if(currentRoute == newRoute) {
        showAlbum.value = false;
        currentRoute = null;
        router.go(-1);
    } else if(currentRoute !== newRoute) {
        showAlbum.value = true;
        currentRoute = newRoute;
    }
}

let showDetail = (e) => {
    showAlbum.value = !showAlbum.value;

    if (!showAlbum.value) {
        router.go(-1);
    } 

    if (e.target.className == 'cover') {
        currentRoute = '/list/detail?' + selectedAlbum.value.reference.record_id;
        router.push('/list/detail?' + selectedAlbum.value.reference.record_id);
        detail = 'album';
    } else if (e.target.className == 'title' || e.target.className.includes('up')) {
        currentRoute = '/list/detail?' + selectedAlbum.value.record_id;
        router.push('/list/detail?' + selectedAlbum.value.record_id);
        detail = 'track';
    } else if (e.target.className == 'artist') {
        currentRoute = '/list/detail?' + selectedAlbum.value.artist;
        router.push('/list/detail?' + selectedAlbum.value.artist);
        detail = 'artist';
    }

    // checkRoute();
}

if (route.fullPath.includes('detail')) {
    router.go(-1);
}

// console.log(route.fullPath)

// watch(() => route, (newRoute) => {
//     checkRoute(newRoute.fullPath);
// }) 
</script>
<style lang="less" scoped>
#search {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 20px;
    padding: 10px 20px;
    margin-top: 4.5rem;
    background-color: rgba(0,0,0,0.1);

    .icon {
        opacity: 0.5;

        &.active {
            opacity: 1;
        }
    }

    input {
        border: 0;
        background-color: unset;
        width: calc(100% - 34px);
        height: 30px;
        padding-left: 10px;
        font-size: 0.8rem;
    }
}

#list {
    position: relative;
    width: 100vw;
    height: 100vh;
}

#player {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: var(--main-color);
    border-radius: 20px 20px 0 0;
    transform: translateY(100vh);
    transition: all 1s;
    z-index: 999;

    &.show {
        transform: translateY(calc(100vh - 90px));
    }

    &.moveUp {
        transform: translateY(0px);
    }
    .controller {
        position: relative;
        height: 80px;

        .progressBar {
            position: relative;
            width: 98%;
            height: 2.5px;
            margin: 0 auto;
            cursor: pointer;

            .progress {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background-color: #fff;
            }
        }

        .playerInfo {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 8px 10px;
            gap: 2rem;
            color: #fff;

            .selectAlbum {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding-right: 10px;
                color: #fff;

                * {
                    cursor: pointer;
                }

                .cover {
                    width: 60px;
                    height: 60px;
                }
                .title {
                    font-weight: 700;

                    &:hover {
                        text-decoration: underline;
                    }
                }
                .artist {
                    opacity: 0.5;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .iconWrap {
                .icon {
                    display: inline-block;
                    opacity: 0.5;
                    transition: all 0.3s;
                    margin-right: 10px;
                    cursor: pointer;

                    &:hover {
                        opacity: 1;
                    }
                }
            }

            .playWrap {
                * {
                    display: inline-block;
                    vertical-align: middle;
                    padding: 0 10px;
                    cursor: pointer;
                }
            }

            .timerWrap {
                width: 85px;
                text-align: center;
                font-size: 0.8rem;

                span {
                    padding: 0 2px;
                    opacity: 0.5;
                    
                    &.duration {
                        opacity: 1;
                    }
                }
            }
        }

        .arrow {
            position: absolute;
            top: 50%;
            right: 30px;
            transform: translateY(-50%);
            opacity: 0.5;
            transition: all 0.3s;
            cursor: pointer;
    
            &:hover {
                opacity: 1;
            }
            > div {
                font-size: 1.4rem;
            }
        }
    }

    .viewDetail {
        height: calc(100vh - 90px);
    }
}

.wrap {
    width: 100%;
    height: 100%;
    // padding: 0 20px;
    // background-color: rgba(27,27,28,0.7);
    // padding: 40px 40px 0;
    // background-color: #1B1B1C;
    // backdrop-filter: blur(30px);
}

.albumWrap {
    .albumInner {
        max-width: 1200px;
        margin: 0 auto;
    }

    .album {
        position: relative;
        display: inline-block;
        width: 18%;
        height: 18%;
        margin: 1%;
        // line-height: 8.6rem;
        text-align: center;
        border-radius: 1rem;
        transition: all 0.3s;
        overflow: hidden;
        cursor: pointer;

        &:hover {
            img {
                scale: 1.2;
            }
            .albumInfo {
                display: block;
            }
        }

        img {
            width: 100%;
            height: 100%;
            scale: 1.05;
            transition: all 0.5s;
        }

        .albumInfo {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            padding: 1rem;
            background-color: rgba(0,0,0,0.5);
            color: #fff;
            text-align: left;
            -webkit-backdrop-filter: blur(2px);
            backdrop-filter: blur(2px);
            display: none;
            z-index: 2;
        }
    }
}
</style>