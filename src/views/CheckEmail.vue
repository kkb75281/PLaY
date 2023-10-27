<template lang="pug">
.checkEmailWindow
    .wrap 
        .inner 
            .material-symbols-outlined.symbol.icon mark_email_unread
            .title Check your email
            p Please check the email you entered earlier for confirmation. Click the link in your email to verify your email address.
</template>

<script setup>

</script>

<style lang="less" scoped>
.checkEmailWindow {
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
    width: 400px;
    margin: 0 auto;
}

.icon {
    font-size: 100px;
}

.title {
    font-size: 1.8em;
    font-weight: 700;
    margin-bottom: 30px;
}

p {
    text-align: center;
    font-size: 1.1em;
    opacity: 0.7;
}
</style>