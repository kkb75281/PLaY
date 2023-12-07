<template lang="pug">
#list
    .wrap 
        //-     .searchWrap 
        //-         form(@submit.prevent="search")
        //-             input#search(v-model="searchText")
        //-             .material-symbols-outlined.mid.icon(:class="{'active' : searchText}") search
        .albumWrap 
            .albumInner(ref="albumInner")
                .album(v-for="(album, index) in albumList" :id="'album'+index" @click="clickAlbum(index)")
                    img.cover(:src="album.url")
                    .title {{ album.title }}
                    .artist {{ album.artist }}
            .playWrap(v-if="showCD" @click="showMusic = true")
                .playInner(ref="playInner" :class="{ 'rotating' : showCD }")
        //- Music(v-if="showMusic && selectedAlbum" :selectedAlbum = "selectedAlbum")
//- MenuBar
</template>
<script setup>
import { skapi, account } from '@/main'
import { useRoute, useRouter } from 'vue-router';
import { nextTick, onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

import Music from '@/views/Music.vue'
import MenuBar from '@/components/MenuBar.vue'

let route = useRoute();
let router = useRouter();
let albumInner = ref(null);
let playInner = ref(null);
let showCD = ref(false);
let showMusic = ref(false);
let albumList = ref([]);
let selectedAlbum = ref([]);
let searchText = ref('')
let albumTimer = "";
let currentIndex = 0;

// 앨범 레코드 불러오기
skapi.getRecords({ table: 'Album' }).then(response => {
    console.log(response);
    for (let i = 0; i < response.list.length; i++) {
        let list = {};

        list.title = response.list[i].data.title;
        list.artist = response.list[i].data.artist;
        list.url = response.list[i].bin.cover[0].url;

        albumList.value.push(list);
    }
    // 배열 요소 무작위로 섞기
    albumList.value.sort(() => Math.random() - 0.5);
    console.log(albumList.value)

    // nextTick(() => {
    //     let albums = document.querySelectorAll('.album');
    //     // let albumWidth = albums[0].offsetWidth;
    //     // let firstAlbum = albums[0];
    //     // let lastAlbum = albums[albums.length - 1];
    //     // let cloneFirstAlbum = firstAlbum.cloneNode(true);
    //     // let cloneLastAlbum = lastAlbum.cloneNode(true);

    //     function init() {
    //         autoPlay();
    //     }
    //     // init();

    //     function autoPlay() {
    //         albumTimer = setInterval(() => {
    //             let intervalNum = currentIndex + 1;
    //             gotoSlider(intervalNum);
    //         }, 2000)
    //     }

    //     function stopPlay() {
    //         clearInterval(albumTimer);
    //     }

    //     function imgClone() {
    //         albumInner.value.appendChild(cloneFirstAlbum);
    //         albumInner.value.insertBefore(cloneLastAlbum, firstAlbum);
    //     }

    //     function gotoSlider(index) {
    //         // albumInner.value.classList.add("transition");
    //         albumInner.value.style.left = -albumWidth * (index + 1) + "px";

    //         currentIndex = index;
    //     }

    //     function checkIndex() {
    //         // albumInner.value.classList.remove("transition");

    //         // 마지막 이미지
    //         if (currentIndex == albums.length) {
    //             albumInner.value.style.left = -(1 * albumWidth) + "px";
    //             currentIndex = 0;
    //         }

    //         // 처음 이미지
    //         if (currentIndex == -1) {
    //             albumInner.value.style.left = -(albums.length * albumWidth) + "px";
    //             currentIndex = albums.length - 1;
    //         }
    //     }

    //     albumInner.value.addEventListener("mouseenter", stopPlay);
    //     albumInner.value.addEventListener("mouseleave", autoPlay);
    //     albumInner.value.addEventListener("transitionend", checkIndex);
    // })
});


let clickAlbum = (index) => {
    showCD.value = true;
    selectedAlbum.value = albumList.value[index];
    nextTick(() => {
        playInner.value.style.background = `url('${selectedAlbum.value.url}') no-repeat`;
    })
}

let search = () => {

}

onBeforeRouteLeave(() => {
    clearInterval(albumTimer);
})
</script>
<style lang="less" scoped>
#list {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url(@/assets/egg.jpg) no-repeat;
    background-size: cover;
}

.wrap {
    width: 100%;
    height: 100%;
    padding: 40px 40px 0;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
}

.searchWrap {
    position: relative;
    margin-bottom: 1.5em;

    input {
        width: 100%;
        padding: 1em 2em;
        font-size: 1em;
        background-color: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 1.5em;
        color: #fff;
    }
    .icon {
        position: absolute;
        top: 50%;
        right: 1em;
        transform: translateY(-50%);
        opacity: 0.2;

        &.active {
            opacity: 0.7;
        }
    }
}

.albumWrap {
    width: 100%;
    overflow: hidden;
    color: #000;

    .albumInner {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        transition: all 0.5s;
    }

    .album {
        margin-right: 20px;
        cursor: pointer;

        img {
            width: 300px;
            height: 300px;
        }
    }
}

.playWrap {
    position: fixed;
    content: '';
    left: 50%;
    bottom: -450px;
    transform: translateX(-50%);
    opacity: 0.7;
    transition: all 0.3s;

    @-webkit-keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes rotating {
        0% {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes scaling {
        0% {
            -webkit-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }

        50% {
            -webkit-transform: scale(1.02);
            -o-transform: scale(1.02);
            transform: scale(1.02);
        }

        100% {
            -webkit-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes scaling {
        0% {
            -ms-transform: scale(1);
            -moz-transform: scale(1);
            -webkit-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }

        50% {
            -ms-transform: scale(1.02);
            -moz-transform: scale(1.02);
            -webkit-transform: scale(1.02);
            -o-transform: scale(1.02);
            transform: scale(1.02);
        }

        100% {
            -ms-transform: scale(1);
            -moz-transform: scale(1);
            -webkit-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }

    &:hover {
        bottom: -200px;
        opacity: 1;
    }

    .playInner {
        position: relative;
        width: 900px;
        height: 900px;
        border-radius: 50%;
        overflow: hidden;
        background-size: cover !important;
        cursor: pointer;

        &::before {
            position: absolute;
            content: '';
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
        }

        &::after {
            position: absolute;
            content: '';
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: #000;
        }

        &.rotating {
            -webkit-animation: rotating 20s linear infinite, scaling 1s linear infinite;
            -moz-animation: rotating 20s linear infinite, scaling 1s linear infinite;
            -ms-animation: rotating 20s linear infinite, scaling 1s linear infinite;
            -o-animation: rotating 20s linear infinite, scaling 1s linear infinite;
            animation: rotating 20s linear infinite, scaling 1s linear infinite;
        }
    }
}
</style>