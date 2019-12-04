<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Лес</h1>
        <div class="life"></div>
        <div class="next"></div>
        <p>
          generation
          <span
            class="generation"
          >{{ forest.dwellersCount}} {{forest.maws}} {{forest.lumber}} {{forest.month}}</span>,
          <a href="#" @click="seed()">seed</a>
        </p>
        <p>{{ windowWidth }}</p>
        <p>{{ forest.size }}</p>

        <v-container>
          <div v-for="(tr, key) in forest.size" :key="key">
            <div
              v-for="(td, keyTd) in forest.size"
              :key="keyTd"
              class="square"
              :style="{width: Math.round((windowWidth-100)/forest.size) + 'px', height: Math.round((windowWidth-100)/forest.size) + 'px'}"
            ></div>
          </div>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Forest } from '../plugins/forest'

export default Vue.extend({
  name: 'HelloWorld',

  data: () => ({
    generation: 0,
    x: 10,
    y: 10,
    speed: 500,
    forest: new Forest(10),
    windowWidth: 0,
  }),
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
    },
    seed(): void {
      if (this.forest.timer == null) {
        this.forest.timer = setInterval(() => {
          this.forest.step()
          // this.step().draw()
        }, 100)
      }
    },
  },
})
</script>

<style scoped>
.square {
  background: red;
  margin: 1px;
  display: -webkit-inline-box;
}

.life {
  width: 100%;
  height: 100%;
  margin: 0 auto 1rem auto;
  display: block;
}

.cell {
  font-size: 64px;
  line-height: 0px;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  float: left;
}

.cell[data-toggle='0'] {
  color: #ffffff;
}

.cell[data-toggle='1'] {
  color: #0687f5;
}

.cell-row {
  height: 20px;
}

.next {
  display: none;
}

body {
  font-family: sans-serif;
}
</style>
