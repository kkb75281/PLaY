<template lang="pug">
router-view
</template>
<script setup>
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { account } from '@/main.js';

let router = useRouter();
let route = useRoute();

watch(account, (next, prev) => {
    if(account == null) {
        router.replace({ path: '/login' });
    }
})
</script>
<style lang="less" scoped>

</style>
