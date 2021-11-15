<template>
  <w-article class="article-normal" :article="article" type="card" />
</template>

<script setup>
import { WArticle } from 'Widgets';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// 使用vue-router
const route = useRoute();
// 文章对象
const article = ref({});
</script>
