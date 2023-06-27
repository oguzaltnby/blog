<script lang="ts">
import Vue from "vue"


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
      <IconChevron up class="h-4 w-4" />
    </template> </Button>
</template>
