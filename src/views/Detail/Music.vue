<template lang="pug">
#music(ref="music") ddd
</template>

<script setup>
import { nextTick, ref } from 'vue';

// let music = ref(null);
// let selectedAlbum = defineProps(['selectedAlbum']);

// console.log(selectedAlbum)

// nextTick(() => {
//     music.value.style.background = `url('${selectedAlbum.url}') no-repeat`;
// })
</script>

<style lang="less" scoped>
#music {
    width: 100vw;
    height: calc(100vh - 88px);
    background-color: var(--main-color);
    transition: all 1s;
    z-index: 99;
}
</style>