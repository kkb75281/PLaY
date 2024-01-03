<template lang="pug">
template(v-if="account")
    #main
        RouterLink.home(:to="{name: 'menu'}")
            .material-symbols-outlined.icon ecg_heart
        router-view

template(v-else)
    .wrap
        a.login(href="/login") 
            .material-symbols-outlined.icon(style="font-size:10rem;") ecg_heart
</template>

<script setup>
import { skapi, account } from '@/main';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

let route = useRoute();
let router = useRouter();

</script>

<style lang="less" scoped>
.home {
    position: absolute;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
    z-index: 99;
    
    &:hover {
        .icon {
            opacity: 0.5;
        }
    }

    .icon {
        font-size: 2.5rem;
        color: var(--main-color);
        transition: all 0.3s;
    }
}

#main {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: table;
    padding-top: 4.5rem;
}
.wrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;

    a {
        text-decoration: none;
        color:rgba(0,0,0,0.8);
    }
    .routerWrap {
        max-width: 780px;
        margin: 0 auto;
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
        width: 8.6rem;
        height: 8.6rem;
        margin: 0.5rem;
        line-height: 8.6rem;
        text-align: center;
        border-radius: 1rem;
        transition: all 0.3s;
        opacity: 0.8;
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