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
        <h1 class="display-2 font-weight-bold mb-3">Клеточный автомат</h1>
        <div class="life"></div>
        <div class="next"></div>
        <p>
          generation
          <span class="generation">0</span>,
          <a href="#" @click="seed()">seed</a>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HelloWorld',

  data: () => ({
    generation: 0,
    seed: false,
    x: 10,
    y: 10,
    speed: 500,
  }),
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
