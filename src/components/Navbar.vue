<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  computed: {
    routeIsBlog() {
      return this.$route.name?.includes("blog")
    },
    getTargetLink() {
      const path = this.$route.path

      if (path !== "/projects/premid" && path.startsWith("/projects/premid"))
        return "/projects/premid"
      else if (this.routeIsBlog && this.$route.params?.slug) return "/blog"
      else return "/"
    },
  },
})
</script>

<template>
  <nav class="w-full">
    <div class="container mx-auto w-11/12 relative sm:w-9/12 md:w-7/12">
      <div class="flex items-center gap-6 justify-between">
        <SmartLink
          :href="getTargetLink"
          class="flex-shrink-0 h-10 w-10 flex items-center space-x-4"
        >
          <img
            src="/assets/icons/icon.ico"
            class="rounded-md  ring-black transition-transform ring-2 ring-opacity-5 sm:transform hover:-rotate-6 flex-shrink-0 h-10 w-10"
          >

          <Transition name="fade" mode="out-in">
            <span
              v-if="routeIsBlog"
              class="text-black/90 text-sm uppercase font-medium dark:text-white/90"
            >
              Blog
            </span>
          </Transition>
        </SmartLink>

        <div class="flex space-x-2 items-center">
          <OmnibarButton />
          <ColorSwitcher />
          <Button href="https://www.svgviewer.dev/s/473070/hand"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#BFBFBF" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter"><path d="M9,3H8A3,3,0,0,0,5,6V9a3,3,0,0,1-3,3H2a3,3,0,0,1,3,3v4a3,3,0,0,0,3,3H9"></path><path d="M15,3h1a3,3,0,0,1,3,3V9a3,3,0,0,0,3,3h0a3,3,0,0,0-3,3v4a3,3,0,0,1-3,3H15" ></path></svg></Button>
        </div>
      </div>
    </div>
  </nav>
</template>
