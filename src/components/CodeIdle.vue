<script lang="ts">
import Vue from "vue"

export default Vue.extend({

})
</script>

<template>
  <Button
  href = "Button.vue"
    v-tippy="{
      content: '⌘/Ctrl + K',
    }"
    icon="Code"
    class="focus:outline-none"
    rounded
    elevated
    @click.native="togglePalette"
  />
</template>
