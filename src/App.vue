<template>
  <v-app style="background: #fef6f3;">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Симуляция леса</div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/RyabovNick/cellularAutomaton"
        target="_blank"
        text
      >
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
})
</script>
