<script lang="ts">
import Vue from "vue"
import 'primeicons/primeicons.css';

export default Vue.extend({
  methods: {
    togglePalette() {
      this.$root.$emit("openCommandMenu")
    },
  },
})
</script>

<template>
  <Button v-tippy="{
    content: '⌘/Ctrl + K',
  }" class="focus:outline-none" rounded elevated @click.native="togglePalette"> <template #icon>
      <i class="pi pi-code"></i>
    </template> </Button>
</template>
