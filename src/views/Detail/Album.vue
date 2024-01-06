<template lang="pug">
#album(ref="album")
    .wrap
        .info
            .cover
                img(:src="props.selectedAlbum.cover")
                .material-symbols-outlined.wh.fill.hoverIcon.play play_arrow
            br
            br
            br
            .title 
                h2 {{ props.selectedAlbum.title }}
                .material-symbols-outlined.wh.fill.hoverIcon.quote format_quote
            br
            br
            p.artist {{ props.selectedAlbum.artist }}
            br
            p.date {{ timeStamp.getFullYear() + '.' + timeStamp.getMonth() + '.' + timeStamp.getDate() }}

</template>

<script setup>
import { nextTick, ref } from 'vue';

// let music = ref(null);
let props = defineProps(['selectedAlbum']);
let timeStamp = new Date(props.selectedAlbum.date);
console.log(timeStamp)

console.log(props)

// nextTick(() => {
//     music.value.style.background = `url('${selectedAlbum.url}') no-repeat`;
// })
</script>

<style lang="less" scoped>
#album {
    // width: 100vw;
    // height: calc(100vh - 88px);
    // background-color: var(--main-color);
    // transition: all 1s;
    // z-index: 99;
    padding: 100px 0;
    color: #fff;
}
.hoverIcon {
    filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.60));
    opacity: 0.5;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }
}
.info {
    text-align: center;
    .cover {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        border-radius: 20px;

        img {
            width: 100%;
            height: 100%;
        }
        .play {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 70px;
        }
    }

    .date {
        font-size: 16px;
        opacity: 0.5;
    }

    .title {
        position: relative;
        display: inline-block;

        .quote {
            position: absolute;
            right: -30px;
            top: -30px;
            font-size: 70px;
        }
    }
}
</style>