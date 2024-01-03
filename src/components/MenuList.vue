<template lang="pug">
#routerWrap 
    .routerInner
        RouterLink.router.black(:to="{name: 'upload'}" style="color:#FF9900;")
            span.material-symbols-outlined cloud_upload
            span &nbsp;upload

        .router.black.blank
            span &nbsp;

        RouterLink.router(:to="{name: 'mypage'}" style="background-color: #056DFA;")
            span.material-symbols-outlined thumb_up
            span &nbsp;likes

        RouterLink.router(:to="{name: 'mypage'}" style="background-color: #FF2849;")
            span.material-symbols-outlined queue_music
            span &nbsp;playlist

        .router.black.blank(style="margin-right:calc(1.5rem + 8.6rem);")
            span &nbsp;

        .router(@click="logout" style="background-color:rgba(255,40,73,0.3); color:rgba(255,40,73);")
            span.material-symbols-outlined logout

        RouterLink.router(:to="{name: 'list'}" style="background-color: #FF9900;") 
            span.material-symbols-outlined headphones
            span &nbsp;music list

        .router(style="background-color:rgba(5,109,250,0.3); color:#056DFA")
            span.material-symbols-outlined manage_search

        RouterLink.router.black(:to="{name: 'mypage'}" style="color:#FF2849;")
            span.material-symbols-outlined face
            span &nbsp;my page

        .router.black.blank
            span &nbsp;

        .router(@click="changeBgColcor" style="background-color:rgba(255,153,0,0.3); color:#FF9900;")
            span.material-symbols-outlined brightness_4
</template>

<script setup>
import { skapi, account } from '@/main';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

let route = useRoute();
let router = useRouter();
let mode = ref('light');

let logout = async() => {
    skapi.logout().then(() => {
        account.value = null;
    });
    router.replace({ path: '/login' });
}

let changeBgColcor = () => {
    if(mode.value == 'light') {
        mode.value = 'dark';
        document.body.style.setProperty('--main-bgColor', '#1b1b1c');
        document.body.style.setProperty('--main-color', '#f1f1f1');
        document.body.style.setProperty('--main-inputBg', 'rgba(255,255,255,0.1)');
        document.body.style.setProperty('--main-iconColor', 'rgba(255,255,255,0.5)');
        document.body.style.setProperty('--main-placeholder', 'rgba(255,255,255,0.4)');
    } else {
        mode.value = 'light';
        document.body.style.setProperty('--main-bgColor', '#c3d7db');
        document.body.style.setProperty('--main-color', '#1b1b1c');
        document.body.style.setProperty('--main-inputBg', 'rgba(0,0,0,0.1)');
        document.body.style.setProperty('--main-iconColor', 'rgba(0,0,0,0.8)');
        document.body.style.setProperty('--main-placeholder', 'rgba(0,0,0,0.4)');
    }
}
</script>

<style lang="less" scoped>
#routerWrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

.routerInner {
    max-width: 780px;
    margin: 0 auto;

    .router {
        display: inline-block;
        width: 8.6rem;
        height: 8.6rem;
        margin: 0.5rem;
        line-height: 8.6rem;
        text-align: center;
        border-radius: 1rem;
        transition: all 0.3s;
        opacity: 0.8;
        text-decoration: none;
        color: #1b1b1c;
        cursor: pointer;

        &:hover {
            // box-shadow: inset 0px 0px 8px 5px rgba(0,0,0,0.2);
            transform: scale(0.98);
        }
        &.black {
            background-color: #282828; 
        }
        &.blank {
            cursor: default;
        }
        span {
            vertical-align: middle;
        }
    }
}
</style>
