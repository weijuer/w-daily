<template>
  <section class="weekly-page">
    <article class="wrapper daily-list">
      <transition-group
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
        appear
      >
        <w-card
          v-for="(item, index) in dailyList"
          :key="item.name"
          :title="'Daily: ' + item.name"
          :data-index="index"
          @click="jump(item)"
        >
          <img class="daily-card-img" :src="randomImage" alt />
        </w-card>
      </transition-group>
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

function jump(item) {
  dailyStore.setCurrent(item);
  router.push({ name: 'weekly-daily' });
}

function onBeforeEnter(el) {
  el.style.opacity = 0;
  el.style.transform = 'translateY(15px)';
}

function onEnter(el, done) {
  let delay = el.dataset.index * 200;
  // el.style.transition = 'all 0.2s ease-out';
  setTimeout(() => {
    el.style.opacity = 1;
    el.style.transform = null;
    done();
  }, delay);
}

function onLeave(el, done) {
  let delay = el.dataset.index * 200;
  el.style.transform = 'translateY(15px)';
  setTimeout(() => {
    el.style.opacity = 0;
    el.style.transform = null;
    done();
  }, delay);
}
</script>

<style lang="stylus" scoped>
@css {
  @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');
}

.wrapper {
  --max-width: 240px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--max-width), 1fr));
  // grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
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
