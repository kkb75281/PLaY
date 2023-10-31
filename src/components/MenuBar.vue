<template lang="pug">
#menuBar 
    .material-symbols-outlined.big.icon.undo(@click="router.go(-1)") undo
    RouterLink.material-symbols-outlined.big.icon(:to="{name: 'home'}" v-if="route.name !== 'home'") home
    RouterLink.material-symbols-outlined.big.icon(:to="{name: 'list'}" v-if="route.name !== 'list'") subscriptions
    RouterLink.material-symbols-outlined.big.icon(:to="{name: 'upload'}" v-if="route.name !== 'upload'") cloud_upload
    RouterLink.material-symbols-outlined.big.icon(:to="{name: 'mypage'}" v-if="route.name !== 'mypage'") face
    .material-symbols-outlined.big.icon(@click="logout") logout
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

let route = useRoute();
let router = useRouter();
</script>

<style lang="less" scoped>
#menuBar {
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 230px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;;
    background-color: #000;
    border-radius: 15px 15px 0 0;
    transform: translate(-50%, 40px);
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        transform: translate(-50%, 0);
    }
}

.undo {
    margin-right: 20px;
    cursor: pointer;
}

a {
    text-decoration: none;
    color: #fff;
    margin-right: 20px;
}
</style>
