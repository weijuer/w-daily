<template>
  <section class="daily-page">
    <article class="grid daily-list">
      <w-card
        v-for="item in dailyList"
        :key="item.name"
        :title="'Daily: ' + item.name"
        @click="jump(item)"
      >
        <img class="daily-card-img" :src="randomImage" alt />
      </w-card>
    </article>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDailyStore } from 'Stores/daily';

const router = useRouter();
const dailyStore = useDailyStore();
dailyStore.getDailyList();

const dailyList = computed(() => dailyStore.dailyList);
const randomImage = computed(
  () => `https://1source.unsplash.com/random/240x240/?nature,water&time=${Date.now()}`
);

function jump(name) {
  dailyStore.setCurrent(item);
  router.push({ path: '/articles', params: { name } });
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
