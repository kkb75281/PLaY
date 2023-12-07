<template lang="pug">
.loginWindow
    .wrap 
        .inner
            a(href="/" style="color:rgba(0,0,0,0.8)")
                .material-symbols-outlined(style="font-size: 36px") ecg_heart

            br
            br

            form#loginForm(@submit.prevent="login")
                input(type="email" name="email" placeholder="E-Mail" @input="e=> { form.email = e.target.value; }" required)
                input#password(type="password" name="password" placeholder="Password" @input="e=>form.password = e.target.value" required)
                input.submit(type="submit" value="Login")
                
            br

            .signup Don't have an account?
                RouterLink(:to="{name: 'signup'}") SignUp
</template>

<script setup>
import { skapi, account } from '@/main';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

let route = useRoute();
let router = useRouter();
let promiseRunning = ref(false);
let form = {
    email: '',
    password: ''
};

let login = () => {
    promiseRunning.value = true;

    let params = {
        email: form.email,
        password: form.password
    }

    skapi.login(params).then(res => {
        account.value = res;
        console.log(res);
    }).catch((err) => {
        promiseRunning.value = false;
        console.log(err);
    }).finally(() => {
        router.push({ path: '/' });
    });
}
</script>

<style lang="less" scoped>
.loginWindow {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: table;
    overflow: hidden;
}

.wrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    // background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(30px);
    color: rgba(0,0,0,0.8);
}

.inner {
    width: 300px;
    margin: 0 auto;
}

.title {
    font-size: 1.8em;
    font-weight: 900;
}

#loginForm {
    margin-bottom: 20px;

    input {
        display: block;
        padding: 10px;
        border-radius: 8px;
        width: 100%;
        background-color: rgba(0,0,0,0.1);
        border: unset;
        margin-bottom: 0.5rem;
        
        &.submit {
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
                background-color: rgba(0,0,0,0.3);
            }
        }
    }
}

.signup {
    font-size: 14px;

    a {
        margin-left: 10px;
        text-decoration: none;
        color: rgba(0,0,0,0.8);
        font-weight: 700;
        cursor: pointer;
    }
}
</style>