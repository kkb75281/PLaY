<template lang="pug">
#player(:class="{'show' : showPlayer, 'moveUp' : showMusic}")
    .controller
        .progressBar(ref="progressBar" @click="moveTimeLine")
            .progress(ref="progress")
        .playerInfo
            .selectAlbum(@click="moveToMusicPage")
                img.cover(:src="selectedAlbum.url")
                .text
                    .title {{ selectedAlbum.title }}
                    .artist {{ selectedAlbum.artist }}
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
            .material-symbols-outlined.mid.wh.fill(v-if="showMusic" @click="showMusic = false;") expand_more
            .material-symbols-outlined.mid.wh.fill(v-else @click="showMusic = true;") expand_less
    .viewDetail
        router-view(name="music")
</template>
<script setup>

</script>
<style lang="less">

</style>