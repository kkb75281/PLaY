<template lang="pug">
#main
    .wrap
        template(v-if="account")
            RouterLink.router(:to="{name: 'list'}" style="padding: 10px 22px 13px; background-color: #FF2849; border-radius: 30px;") 
                span.material-symbols-outlined list
                span &nbsp;music list

            br
            br

            RouterLink.router(:to="{name: 'mypage'}" style="padding: 10px 22px 13px; background-color: #A649DA; border-radius: 30px; margin-right:8rem;")
                span.material-symbols-outlined thumb_up
                span &nbsp;likes

            br
            br

            RouterLink.router(:to="{name: 'upload'}" style="padding: 10px 22px 13px; background-color: #30C04F; border-radius: 30px; margin-left:8rem;")
                span.material-symbols-outlined cloud_upload
                span &nbsp;upload

            br
            br

            RouterLink.router(:to="{name: 'mypage'}" style="padding: 10px 22px 13px; background-color: #056DFA; border-radius: 30px; margin-left:2rem;")
                span.material-symbols-outlined face
                span &nbsp;my page
        template(v-else)
            a.login(href="/login") 
                .material-symbols-outlined(style="font-size:10rem;") ecg_heart

//-     .wrap 
//-         img(src="@/assets/headset.png")
//-         p.desc PLaY supports artists with tools to create, release, and measure music across a global stage.
</template>

<script setup>
import { skapi, account } from '@/main';
import { useRoute, useRouter } from 'vue-router';

let route = useRoute();
let router = useRouter();

let logout = async() => {
    skapi.logout().then(() => {
        account.value = null;
    });
    router.replace({ path: '/login' });
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

        &:hover {
            opacity: 0.5;

            h1 {
                transform: scale(0.95);
            }
        }
    }
    .router {
        display: inline-block;
        vertical-align: middle;
        transition: all 0.3s;
        opacity: 0.8;
        cursor: pointer;

        &:hover {
            box-shadow: inset 0px 0px 8px 5px rgba(0,0,0,0.2);
            transform: scale(0.98);
        }
        span {
            vertical-align: middle;
        }
    }
}
</style>