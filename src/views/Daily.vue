<template>
  <section class="daily-page">
    <article class="grid daily-list">
      <w-card
        v-for="item in dailyList"
        :key="item.id"
        :title="'Daily: ' + item.title"
        @click="jump(item.title)"
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
import { computed } from 'vue';

const dailyList = computed(() => store.getters['daily/dailyList']);

const router = useRouter();
const store = useStore();

store.dispatch('daily/getDailyList');

function jump(name) {
  store.dispatch('daily/setCurrent');
  router.push({ path: '/articles' });
}
</script>

<style lang="stylus" scoped>
@css {
  @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

@media (max-width: 992px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 568px) {
  .grid {
    grid-auto-columns: minmax(100px, 1fr);
  }
}
</style>
