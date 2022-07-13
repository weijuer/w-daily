<template>
  <section class="grid article-page">
    <article>
      <div class="articles">
        <transition-group :css="false" @before-enter="onBeforeEnter" @enter="onEnter" appear>
          <w-article
            v-for="(article, index) of articles"
            :article="article"
            :key="`article-${index}`"
            :data-index="index"
            type="list"
          />
        </transition-group>
      </div>
    </article>
    <aside>
      <w-card title="广告位">空缺</w-card>
    </aside>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { WArticle } from 'Widgets';
import { useDailyStore } from 'Stores/daily';

const dailyStore = useDailyStore();
const articles = computed(() => dailyStore.articles);

function onBeforeEnter(el) {
  el.style.opacity = 0;
}

function onEnter(el, done) {
  let delay = el.dataset.index * 300;
  el.style.transition = 'all 0.3s linear';
  el.style.animation = 'one-in 0.3s infinite';
  setTimeout(() => {
    el.style.opacity = 1;
    done();
  }, delay);
}
</script>

<style lang="stylus" scoped>
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 30%;
  gap: 2rem;
}

.articles {
  .article {
    margin-bottom: 20px;
    border-radius: 10px;
    background: #fff;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

@media (max-width: 768px) {
  .article-page {
    grid-template-columns: auto;
    gap: 0.5rem;

    aside {
      display: none;
    }
  }
}


@keyframes one-in {
    from {
        padding-top: 100px;
        height: 0%;
    }
    to {
        padding-top: 0px;
        height: 100%;
    }
}
</style>
