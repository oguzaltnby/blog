<script lang="ts">
import Vue from "vue"
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


export default Vue.extend({
  methods: {
    togglePalette() {
      this.$root.$emit("openCommandMenu")
    },
  },
})
</script>

<template>
  <Button
    v-tippy="{
      content: '⌘/Ctrl + K',
    }"
    icon="code"
    class="focus:outline-none"
    rounded
    elevated
    @click.native="togglePalette"
  />
</template>
