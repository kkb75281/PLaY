<template lang="pug">
router-view
</template>
<script setup>
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { account } from '@/main.js';

let router = useRouter();
let route = useRoute();

// watch(account, (next, prev) => {
//     if(next == null) {
//         switch (route.path.split('/')[1]) {
//             case 'checkemail':
//             case 'welcome':
//                 break;
//             default:
//                 router.replace({ path: '/login' });
//                 break;
//         }
//     }
// })
</script>
<style lang="less" scoped>

</style>
