<template>
  <div class="app-layout default">
    <Symbols />
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script setup>
import Symbols from './Symbols.vue';
import Header from './Header.vue';
import Main from './Main.vue';
import Footer from './Footer.vue';
</script>

<style lang="stylus" src="@/assets/style/layout/app.styl" />
