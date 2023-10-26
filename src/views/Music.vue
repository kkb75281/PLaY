<template lang="pug">
#music(ref="music") ddd
</template>

<script setup>
import { nextTick, ref } from 'vue';

let music = ref(null);
let selectedAlbum = defineProps(['selectedAlbum']);

console.log(selectedAlbum)

nextTick(() => {
    music.value.style.background = `url('${selectedAlbum.url}') no-repeat`;
})
</script>

<style lang="less" scoped>
#music {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: cover !important;
}
</style>