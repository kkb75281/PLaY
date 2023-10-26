<template lang="pug">
.signUpWindow
    .wrap 
        .inner
            .title SignUp
            form#signUpForm(@submit.prevent="signup")
                input(type="text" name="name" placeholder="Name" @input="e=> { form.name = e.target.value; }" required)
                input(type="email" name="email" placeholder="E-Mail" @input="e=> { form.email = e.target.value; }" required)
                input#password(type="password" name="password" placeholder="Password" @input="e=>form.password = e.target.value" @change="validatePassword" required)
                input(type="password" name="passwordConfirm" placeholder="Confirm the password" ref="confirmPasswordField" @input="e=> { form.password_confirm = e.target.value; e.target.setCustomValidity(''); error = ''}" @change="validatePassword" required)
                input.submit(type="submit" value="SignUp")
            .login Have an account?
                RouterLink(:to="{name: 'login'}") Login
</template>

<script setup>
import { skapi, account } from '@/main';
import { useRoute, useRouter } from 'vue-router';
import { nextTick, reactive, ref } from 'vue';

let route = useRoute();
let router = useRouter();
let confirmPasswordField = ref(null);
let promiseRunning = ref(false);

let form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
});

let validatePassword = () => {
    if (form.password_confirm !== form.password) {
        confirmPasswordField.value.setCustomValidity('Password does not match');
        confirmPasswordField.value.reportValidity();
    }
}

let signup = () => {
    promiseRunning.value = true;

    let params = {
        name: form.name,
        email: form.email,
        password: form.password
    }

    let options = {
        signup_confirmation: false,
    };

    skapi.signup(params, options).then(res => {
        console.log(res);
        router.push({ path: '/' });
    }).catch(err => {
        console.log(err)
    });
}
</script>

<style lang="less" scoped>
.signUpWindow {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: table;
    z-index: 99999;
    background: url(@/assets/signup-background.jpg) no-repeat;
    background-size: cover;
    overflow: hidden;
}

.wrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(30px);
    color: #fff;
}

.inner {
    width: 300px;
    margin: 0 auto;
}

.title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 30px;
}

#signUpForm {
    margin-bottom: 20px;

    input {
        display: block;
        padding: 8px;
        border-radius: 8px;
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background-color: unset;
        margin-bottom: 10px;
        color: #fff;

        &.submit {
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
                border: 1px solid rgba(0, 0, 0, 0.3);
                background-color: rgba(255, 255, 255, 0.3);
                color: #000;
            }
        }
    }
}

.login {
    font-size: 14px;
    color: #777777;

    a {
        margin-left: 10px;
        text-decoration: none;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
    }
}
</style>