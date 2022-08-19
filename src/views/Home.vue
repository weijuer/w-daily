<template>
  <div ref="home" class="home-page">
    <div class="hero">
      <div class="avatar shadow shadow-moving">
        <w-bubble class="bubble-moving">
          <svg class="icon svg-icon avatar-logo">
            <use xlink:href="#icon-logo@2x" />
          </svg>
        </w-bubble>
      </div>
      <div class="nickname box-reflect">W.J</div>
      <div class="description text-shadowing">Talking is cheap, show me the codes.</div>
      <div class="links hidden">
        <nav class="social-links">
          <ul class="nav">
            <li class="nav-item">
              <a href>
                <svg class="icon svg-icon">
                  <use xlink:href="#icon-weixin" />
                </svg>
              </a>
            </li>
            <li class="nav-item">
              <a href>
                <svg class="icon svg-icon">
                  <use xlink:href="#icon-qq" />
                </svg>
              </a>
            </li>
            <li class="nav-item">
              <a href>
                <svg class="icon svg-icon">
                  <use xlink:href="#icon-weibo" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- <div class="widgets">
        <Weather />
    </div>-->
  </div>
</template>

<script>
import 'Utils/custom-background';
export default {
  name: 'home',
};
</script>

<script setup>
import { onMounted, ref } from 'vue';
import { WBubble } from 'Widgets';

const home = ref();
onMounted(() => {
  home.value.addEventListener('mouseenter', function (e) {
    let { left, top } = home.value.getBoundingClientRect();
    this.style.setProperty('--mouse-x', e.x - left);
    this.style.setProperty('--mouse-y', e.y - top);
  });

  home.value.addEventListener('mousemove', function (e) {
    let { left, top } = home.value.getBoundingClientRect();
    this.style.setProperty('--mouse-x', e.x - left);
    this.style.setProperty('--mouse-y', e.y - top);
  });

  home.value.addEventListener('mouseleave', function (e) {
    this.style.setProperty('--mouse-x', -999);
    this.style.setProperty('--mouse-y', -999);
  })
})
</script>

<style lang="stylus" scoped>
@css {
  @import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Niconne&display=swap');
}

$bubble-color =#4cbf30;

.home-page {
  --magnet-color: rgb(97, 123, 255);
  --magnet-size: 4;
  --magnet-gap: 40;
  --magnet-radius: 200;
  padding: 20px;
  background-image: paint(magnet-matrix);
}

.hero {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .avatar {
    display: flex;
    justify-content: center;
    position: relative;
    width: 8rem;
    height: 8rem;
    margin-bottom: 2rem;
    filter: invert(1);
    mix-blend-mode: difference;

    .avatar-logo {
      width: 100%;
      height: auto;
    }

    &:hover {
      &.shadow-moving {
        &:after {
          animation-play-state: paused;
        }
      }

      .bubble-moving {
        animation-play-state: paused;
      }
    }
  }

  .nickname {
    font-family: 'Fredericka the Great', cursive;
    margin-bottom: 1rem;
    font-size: 3rem;
    text-transform: uppercase;
  }

  .description {
    font-family: 'Niconne', cursive;
    font-size: 2.5rem;
    font-style: italic;
    text-transform: capitalize;
    transition: all 0.3s ease-in-out;
  }
}

@media (max-width: 768px) {
  .app-main {
    &.home-page {
      flex-direction: row;
    }
  }
}
</style>
