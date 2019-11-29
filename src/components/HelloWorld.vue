<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Клеточный автомат</h1>
        <v-btn @click="runCellular">Запустить</v-btn>
        <div class="life"></div>
        <div class="next"></div>
        <p>generation <span class="generation">0</span>, <a href="#" @click="seed()">seed</a></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tracer, Array2DTracer, Layout, VerticalLayout } from 'algorithm-visualizer'

export default Vue.extend({
  name: 'HelloWorld',

  data: () => ({
    generation: 0,
    seed: false,
    x: 10,
    y: 10,
    speed: 500,
  }),
  methods: {
    /**
     * Ячейка с менее чем 2 соседями умирает
     */
    isUnderPopulated(c: number) {
      return c < 2
    },
    /**
     * Ячейка с 2 или 3 соседями остаётся жить
     */
    isHealthy(c: number) {
      return c === 2 || c === 3
    },
    /**
     * Ячейка с более 3 умирает
     */
    isOverPopulated(c: number) {
      return c > 3
    },
    /**
     * Мёртвая ячейка с 3 соседями оживает
     */
    isBorn(c: number) {
      return c === 3
    },
    makeGrid(x: number, y: number) {
      var out = ''
      for (var iy = y - 1; iy >= 0; iy--) {
        var cells = ''
        for (var ix = x - 1; ix >= 0; ix--) {
          var className = 'x' + ix + 'y' + iy
          cells += this.makeCell(className)
        }
        out += this.makeRow(cells)
      }
      return out
    },
    makeRow(cells: string) {
      return '<div class="cell-row">' + cells + '</div>'
    },
    makeCell(className: string) {
      return '<div class="cell ' + className + '" data-toggle="0">.</div>'
    },
    coinFlip() {
      return Math.floor(Math.random() * 2) == 0
    },
    toggle(x, y, el = 'life') {
      var cell = document.getElementsByClassName(el)[0].getElementsByClassName('x' + x + 'y' + y)[0]
      cell.dataset.toggle = cell.dataset.toggle == '0' ? '1' : '0'
    },
    isLive(x, y) {
      var cell = document
        .getElementsByClassName('life')[0]
        .getElementsByClassName('x' + x + 'y' + y)[0]
      if (cell === null) {
        return false
      }
      return cell.dataset.toggle == 1 ? true : false
    },
    getNeighbors(x, y) {
      n = y != config.y - 1 // has northern neighbors
      e = x != 0 // has eastern neighbors
      s = y != 0 // has southern neighbors
      w = x != config.x - 1 // has western neighbors
      count = 0
      if (n && isLive(x, y + 1)) count++
      if (n && e && isLive(x - 1, y + 1)) count++
      if (e && isLive(x - 1, y)) count++
      if (s && e && isLive(x - 1, y - 1)) count++
      if (s && isLive(x, y - 1)) count++
      if (s && w && isLive(x + 1, y - 1)) count++
      if (w && isLive(x + 1, y)) count++
      if (n && w && isLive(x + 1, y + 1)) count++
      return count
    },
  },
})
</script>

<style scoped>
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
