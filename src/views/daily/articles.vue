<template>
  <section class="grid article-page">
    <article>
      <div class="articles">
        <transition-group appear>
          <w-article
            v-for="(article, index) of articles"
            :article="article"
            :key="`article-${index}`"
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
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { reactive, computed } from 'vue';
import { WArticle } from 'Widgets';

const store = useStore();
const route = useRoute();

const articles = computed(() => store.getters['daily/articles']);

function beforeEnter(el) {
  el.style.opacity = 0;
}

function enter(el, done) {
  // console.log(el.dataset.index)
  let delay = el.dataset.index * 300;
  setTimeout(() => {
    el.style.transition = 'opacity 0.3s ';
    el.style.opacity = 1;
    el.style.animation = 'one-in 0.3s infinite';
    el.style['animation-iteration-count'] = 1;
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

.v-list-enter, .v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active, .v-leave-active {
  transition: all 0.6s ease;
}

.v-leave-active {
  position: absolute;
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
</style>
