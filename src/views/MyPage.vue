<template lang="pug">
#myPage
    .wrap 
        
</template>

<script setup>

</script>

<style lang="less" scoped>
#myPage {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: table;
    background: url(@/assets/login-background.jpg) no-repeat;
    background-size: cover;
}
.wrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
    color: #fff;
}
</style>