<template lang="pug">
#main
    .wrap
        template(v-if="account")
            RouterLink.router.black(:to="{name: 'upload'}" style="color:#FF9900; margin-right:8rem;")
                span.material-symbols-outlined cloud_upload
                span &nbsp;upload

            .router.black.blank
                span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            br
            br

            RouterLink.router(:to="{name: 'mypage'}" style="background-color: #056DFA; margin-left:8rem;")
                span.material-symbols-outlined thumb_up
                span &nbsp;likes

            RouterLink.router(:to="{name: 'mypage'}" style="background-color: #FF2849; margin-left:8rem;")
                span.material-symbols-outlined queue_music
                span &nbsp;playlist

            br
            br

            .router.black.blank(style="margin-right:10rem;")
                span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            .router(@click="logout" style="background-color:rgba(255,40,73,0.3); color:rgba(255,40,73); margin-left:10rem;")
                span.material-symbols-outlined logout

            br
            br

            RouterLink.router(:to="{name: 'list'}" style="background-color: #FF9900; margin-right:10rem;") 
                span.material-symbols-outlined headphones
                span &nbsp;music list

            br
            br

            .router(style="background-color:rgba(5,109,250,0.3); margin-right:10rem; color:#056DFA")
                span.material-symbols-outlined manage_search
            
            RouterLink.router.black(:to="{name: 'mypage'}" style="color:#FF2849; margin-left:2rem;")
                span.material-symbols-outlined face
                span &nbsp;my page

            br
            br

            .router.black.blank
                span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            .router(@click="changeBgColcor" style="background-color:rgba(255,153,0,0.3); color:#FF9900; margin-left:5rem;")
                span.material-symbols-outlined brightness_4

            br
            br

            .router.black.blank
                span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            
        template(v-else)
            a.login(href="/login") 
                .material-symbols-outlined.icon(style="font-size:10rem;") ecg_heart

//-     .wrap 
//-         img(src="@/assets/headset.png")
//-         p.desc PLaY supports artists with tools to create, release, and measure music across a global stage.
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
    } else {
        mode.value = 'light';
        document.body.style.setProperty('--main-bgColor', '#c3d7db');
        document.body.style.setProperty('--main-color', '#1b1b1c');
    }
}
</script>

<style lang="less" scoped>
#main {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: table;
}
.wrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;

    a {
        text-decoration: none;
        color:rgba(0,0,0,0.8);
    }

    .login {
        transition: all 0.3s;
        color:rgba(0,0,0,0.8);
        opacity: 0.8;

        .icon {
            animation: bounce 1s infinite linear;
            -moz-animation: bounce 1s infinite linear;
            -webkit-animation: bounce 1s infinite linear;
            -o-animation: bounce 1s infinite linear;
        }

        &:hover {
            opacity: 0.5;

            .icon {
                animation-play-state:paused;
            }
        }
    }
    @keyframes bounce {
        0% {
            transform: scale(1.1);
        }
        25% {
            transform: scale(0.9);
        }
        50% {
            transform: scale(1.2);
        }
        75% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.1);
        }
    }
    @-webkit-keyframes bounce {
        0% {
            transform: scale(1.2);
        }
        33% {
            transform: scale(0.9);
        }
        66% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }
    .router {
        display: inline-block;
        padding: 10px 17px 13px;
        border-radius: 30px;
        vertical-align: middle;
        transition: all 0.3s;
        opacity: 0.8;
        cursor: pointer;

        &:hover {
            box-shadow: inset 0px 0px 8px 5px rgba(0,0,0,0.2);
            transform: scale(0.98);
        }
        &.black {
            background-color: #1B1B1C; 
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