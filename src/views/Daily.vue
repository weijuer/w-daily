<template>
  <section class="daily-page">
    <article class="grid">
      <w-card
        class="daily-card"
        v-for="item in dailies"
        :key="item.name"
        :title="item.name"
        @click="jump(item.name)"
      >
        <img
          class="daily-card-img"
          src="https://1source.unsplash.com/random/240x240/?nature,water"
          alt
        />
      </w-card>
    </article>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import { Article as WArticle } from 'Widgets';

const dailies = computed(() => store.getters['daily/dailies']);

const router = useRouter();
const store = useStore();

store.dispatch('daily/getAllDaily');

function jump(name) {
  store.dispatch('daily/setCurrent', name);
  router.push({ path: '/articles' });
}
</script>

<style lang="stylus" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2%;
}

.daily-card-img {
  height: 180px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: auto;
  }
}
</style>
