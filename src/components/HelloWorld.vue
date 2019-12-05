<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Лес</h1>
        <p>
          <span
            class="generation"
          >{{ forest.dwellersCount}} {{forest.maws}} {{forest.lumber}} {{forest.month}}</span>,
          <a href="#" @click="seed()">seed</a>
        </p>
        <p>{{ windowWidth }}</p>
        <p>{{ forest.size }}</p>

        <v-container>
          <div
            v-for="(tr, x) in forest.size"
            :key="x"
            :style="{
              height: Math.round((windowWidth-200)/forest.size) + 'px'
            }"
          >
            <div
              v-for="(td, y) in forest.size"
              :key="y"
              class="square"
              :style="{
                width: Math.round((windowWidth-200)/forest.size) + 'px',
                height: Math.round((windowWidth-200)/forest.size) + 'px',
                'background-image': getBackgroundImage(x,y),
                'background-size': 'auto',
                //'background-color': getColorForCell(x, y),
              }"
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
    forest: new Forest(20),
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
        }, 800)
      }
    },
    getColorForCell(x: number, y: number): string {
      const cell = this.forest.get(x, y)
      if (cell.lumberjack) {
        return '#f00'
      } else if (cell.bear) {
        return '#872'
      } else if (cell.tree >= 120) {
        return '#0a0'
      } else if (cell.tree >= 12) {
        return '#0d0'
      } else if (cell.tree > 0) {
        return '#7f0'
      } else {
        return 'grey'
      }
    },
    getBackgroundImage(x: number, y: number) {
      const cell = this.forest.get(x, y)
      if (cell.lumberjack) {
        return `url(${require('../assets/lumberjack_icon1.svg')})`
      } else if (cell.bear) {
        return `url(${require('../assets/bear_icon.svg')})`
      } else if (cell.tree >= 120) {
        return `url(${require('../assets/tree22.svg')})`
      } else if (cell.tree >= 12) {
        return `url(${require('../assets/tree11.svg')})`
      } else if (cell.tree > 0) {
        return `url(${require('../assets/tree00.svg')})`
      } else {
        return
      }
    },
  },
})
</script>

<style scoped>
.square {
  margin: 0.5px;
  display: -webkit-inline-box;
}

body {
  font-family: sans-serif;
}
</style>
