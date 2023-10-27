<template lang="pug">
.successWindow
    .wrap 
        .inner
            .material-symbols-outlined.symbol.icon waving_hand
            .title Welcome to PLaY
            p Please log in with the email and password I sent you via email and enjoy PLaY :-D
            RouterLink(:to="{name: 'login'}") Login
</template>

<script setup>

</script>

<style lang="less" scoped>
.successWindow {
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
    margin: 0 auto;
}

.icon {
    margin-bottom: 20px;
}

.title {
    font-size: 1.8em;
    font-weight: 700;
    margin-bottom: 30px;
}

p {
    font-size: 1.1em;
    margin-bottom: 40px;
    opacity: 0.7;
}

a {
    display: inline-block;
    padding: 5px 20px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    text-decoration: none;
    color: #fff;
    transition: all 0.3s;

    &:hover {
        border: 1px solid rgba(0, 0, 0, 0.3);
        background-color: rgba(255, 255, 255, 0.3);
        color: #000;
    }
}
</style>