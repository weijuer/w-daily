<template>
  <section class="daily-page">
    <article class="grid daily-list">
      <w-card v-for="item in dailyList" :key="item.id" :title="'Daily: ' + item.name" @click="jump(item.id)">
        <img class="daily-card-img" :src="randomImage" alt />
      </w-card>
    </article>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const store = useStore();
store.dispatch('daily/getDailyList');

const dailyList = computed(() => store.getters['daily/dailyList']);
const randomImage = computed(() => `https://1source.unsplash.com/random/240x240/?nature,water&time=${Date.now()}`)

function jump(id) {
  store.dispatch('daily/setCurrent', id);
  router.push({ path: '/articles' });
}

</script>

<style lang="stylus" scoped>
@css {
  @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
  gap: 2%;
}

.daily-list {
  .w-card {
    transition: transform 0.2s linear;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    :deep(.w-card-title) {
      font-family: 'Black Ops One', cursive;
    }
  }
}

.daily-card-img {
  height: 180px;
}
</style>
