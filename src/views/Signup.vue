<template lang="pug">
.signUpWindow
    .wrap 
        .inner
            a(href="/" style="color:rgba(0,0,0,0.8)")
                .material-symbols-outlined(style="font-size: 36px") how_to_reg

            br
            br

            form#signUpForm(@submit.prevent="signup")
                input(type="text" name="name" placeholder="Name" @input="e=> { form.name = e.target.value; }" required)
                input(type="email" name="email" placeholder="E-Mail" @input="e=> { form.email = e.target.value; }" required)
                input#password(type="password" name="password" placeholder="Password" @input="e=>form.password = e.target.value" @change="validatePassword" required)
                input(type="password" name="passwordConfirm" placeholder="Confirm the password" ref="confirmPasswordField" @input="e=> { form.password_confirm = e.target.value; e.target.setCustomValidity(''); error = ''}" @change="validatePassword" required)
                div(v-if="promiseRunning" style="height:35.5px;line-height:35.5px;")
                    .material-symbols-outlined.sml.running progress_activity
                template(v-else)
                    input.submit(type="submit" value="SignUp")

            br

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
        signup_confirmation: '/welcome',
    };

    skapi.signup(params, options).then(res => {
        console.log(res);
        router.push({ path: '/checkemail' });
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
    overflow: hidden;
}

.wrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    backdrop-filter: blur(30px);
}

.inner {
    width: 300px;
    margin: 0 auto;
}

#signUpForm {
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

.login {
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