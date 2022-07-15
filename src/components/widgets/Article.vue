<template>
  <div class="article" :class="[articleType]">
    <header class="article-header">
      <router-link
        class="link"
        :data-id="article._id"
        v-if="isLinked"
        :to="{ path: '/daily/article-detail', query: { id: article._id } }"
        >{{ article.article_title }}</router-link
      >
      <span v-else>{{ article.article_title }}</span>
    </header>
    <div class="article-author">
      <strong v-for="author in article.author">{{ author.nickname }}</strong>
      <time :datetime="formatTimestamp(article.utime)">{{ formatTimestamp(article.utime) }}</time>
    </div>
    <div class="article-content">
      <p class="article-description">{{ article.article_summary }}</p>
      <a v-if="isLinked" class="read-more" :href="moreLink(article)">Read more</a>
    </div>
    <div v-if="article.topic" class="article-tags">
      <a
        v-for="(tag, index) of article.topic"
        :key="`tag-${index}`"
        class="tag-item bg-color"
        href="/tags"
        >{{ tag.name }}</a
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatTimestamp } from 'Utils/common';

const props = defineProps({
  type: { type: String, default: 'normal' },
  article: { default: () => {}, type: Object },
});

const emit = defineEmits(['desc-click']);

const articleType = computed(() => (props.type ? `article-${props.type}` : ''));
const isLinked = computed(() => props.type && props.type === 'list');

function moreLink(article) {
  return `https://www.infoq.cn/${article.uuid}`;
}
</script>

<script>
export default {
  name: 'w-article',
};
</script>

<style lang="stylus">
.link-read-more, .read-more {
  background: linear-gradient(to right, #ff8a00, #da1b60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  box-decoration-break: clone;
  font-weight: 700;
  border-bottom: 1px solid #da1b60;
  padding-bottom: 0.15rem;

  &:hover {
    background: linear-gradient(to right, #da1b60, #ff8a00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    box-decoration-break: clone;
    border-bottom: 1px solid #ff8a00;
    text-shadow: none;
  }
}

.article {
  margin: 0;
  padding: 1.5625rem;
  position: relative;
  overflow: hidden;

  &-normal {
    background: #fff;
  }

  &-card {
    border-radius: 10px;
  }

  &-bordered {
    border-bottom: 1px dashed #e4e4e4;
  }

  .article-header {
    font-size: 1rem;
  }

  .article-author {
    strong {
      font-size: 14px;
      margin-right: 0.5rem;
    }
  }

  .article-content {
    font-size: 0.875rem;
    line-height: 1.6;
    color: #c2c2c2;
    overflow-wrap: break-word;

    .article-description {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }

  .article-tags {
    margin: 0;
    padding: 0.5rem 0 1rem;
    line-height: 1.8;

    .tag-item {
      --tag-bg-color: #108ee9;
      color: #fff;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 0.66rem;
      white-space: nowrap;
      border-radius: 2rem;
      margin: 0 0.12rem;
      padding: 0.2rem 0.85rem 0.25rem 0.85rem;
      background-color: var(--tag-bg-color);

      &:hover {
        position: relative;
      }
    }
  }
}
</style>
