<template>
  <v-container>
    <v-layout text-center wrap>
      <v-row class="mb-4">
        <v-col cols="12">
          <h1 class="display-2 font-weight-bold mb-3">Симуляция леса</h1>

          <v-col cols="10" offset="1" sm="4" offset-sm="4">
            <v-row justify="center">
              <v-text-field
                type="number"
                v-model.number="speed"
                label="Введите скорость выполнения (мс)"
                class="max-width"
              ></v-text-field>
            </v-row>
          </v-col>

          <v-btn color="success" @click="seed()">Start simulation</v-btn>
        </v-col>
        <v-col cols="1" offset="2">
          <v-row justify="end">
            <v-img :src="require('../assets/bear_icon.svg')" contain height="18"></v-img>
          </v-row>
        </v-col>
        <v-col cols="1">
          <v-row justify="start">
            <span>{{ forest.dwellersCount.bear }} ({{ forest.maws }})</span>
          </v-row>
        </v-col>

        <v-col cols="1">
          <v-row justify="end">
            <v-img :src="require('../assets/lumberjack_icon1.svg')" contain height="18"></v-img>
          </v-row>
        </v-col>
        <v-col cols="2">
          <v-row justify="start">
            <span>{{ forest.dwellersCount.lumberjack }} ({{ forest.lumber }})</span>
          </v-row>
        </v-col>

        <v-col cols="1">
          <v-row justify="end">
            <v-img :src="require('../assets/tree11.svg')" contain height="18"></v-img>
          </v-row>
        </v-col>
        <v-col cols="1">
          <v-row justify="start">
            <span>{{ forest.dwellersCount.tree }}</span>
          </v-row>
        </v-col>

        <v-col cols="1">
          <v-row justify="end">
            <v-img :src="require('../assets/calendar.svg')" contain height="18"></v-img>
          </v-row>
        </v-col>
        <v-col cols="1">
          <v-row justify="start">
            <span>{{ forest.month }}</span>
          </v-row>
        </v-col>
        <v-container class="max-width">
          <div
            v-for="(tr, x) in forest.size"
            :key="x"
            :style="{
              height: Math.round((windowWidth - 200) / forest.size) + 'px',
            }"
          >
            <div
              v-for="(td, y) in forest.size"
              :key="y"
              class="square"
              :style="{
                width: Math.round((windowWidth - 200) / forest.size) + 'px',
                height: Math.round((windowWidth - 200) / forest.size) + 'px',
                'background-image': getBackgroundImage(x, y),
                'background-size': 'auto',
                'background-position': 'center',
                //'background-color': getColorForCell(x, y),
              }"
            ></div>
          </div>
        </v-container>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Forest } from '../plugins/forest'

export default Vue.extend({
  name: 'HelloWorld',

  data: () => ({
    speed: 500,
    forest: new Forest(30),
    windowWidth: 0,
  }),
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth > 1000 ? 1000 : window.innerWidth
    },
    seed(): void {
      if (this.forest.timer == null) {
        this.forest.timer = setInterval(() => {
          this.forest.step()
          // this.step().draw()
        }, this.speed)
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

.max-width {
  max-width: 1000px;
}
</style>
