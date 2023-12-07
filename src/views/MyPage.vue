<template lang="pug">
#myPage
    .wrap 
        .inner
//- MenuBar
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

import MenuBar from '@/components/MenuBar.vue'

let route = useRoute();
let router = useRouter();
</script>

<style lang="less" scoped>
#myPage {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: table;
}
.wrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
    color: #fff;
}
</style>