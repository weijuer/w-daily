<template>
  <w-article class="article-normal" :article="article" type="card" />
</template>

<script setup>
import { ref } from 'vue';
import { WArticle } from 'Widgets';

const article = ref({});
</script>
