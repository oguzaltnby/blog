<script lang="ts">
import Vue from "vue"
import axios from "axios"

export default Vue.extend({
  props: {
    name: String,
    description: String,
    stars: Number,
    language: String,
    top: Boolean,
  },
  data() {
    return {
      commits: [] as any[], // Commit bilgilerini tutacak
    }
  },
  async mounted() {
    await this.fetchCommits()
  },
  methods: {
    async fetchCommits() {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/oguzaltnby/${this.name}/commits`
        )
        this.commits = response.data
      } catch (error) {
        console.error("Error fetching commits:", error)
      }
    },
    getLanguageIcon() {
      // @ts-ignore-next-line
      return icons[this.language] || this.language
    },
  },
})
</script>

<template>
  <div class="rounded-lg card-base">
    <div class="space-y-2">
      <div :class="top && 'flex justify-between space-x-2'">
        <h3
          class="text-black/90 dark:text-white/90 items-center truncate space-x-1"
        >
          <span class="text-black/50 dark:text-white/30">oguzaltnby/</span
          ><span>{{ name }}</span>
        </h3>

        <IconStar
          v-if="top === true"
          class="h-6 text-yellow-600 w-6"
          title="Top repository"
          filled
        />
      </div>

      <p class="text-black/50 dark:text-white/30 line-clamp-2">
        {{ description }}
      </p>
    </div>

    <div class="mt-4">
      <div
        class="flex items-center justify-between text-black/50 dark:text-white/30"
      >
        <span>Stars:</span>
        <span>{{ stars }}</span>
      </div>

      <div
        class="flex items-center justify-between text-black/50 dark:text-white/30"
      >
        <span>Language:</span>
        <IconDev :brand="getLanguageIcon" class="h-5 w-5" />
      </div>
    </div>

    <div class="mt-4">
      <h4 class="text-black/90 dark:text-white/90">Recent Commits</h4>
      <ul class="space-y-2">
        <li v-for="commit in commits" :key="commit.sha" class="text-black/50 dark:text-white/30">
          <a :href="commit.html_url" target="_blank" class="hover:underline">
            {{ commit.commit.message }}
          </a>
          <div class="text-xs">
            <span>by {{ commit.commit.author.name }}</span> -
            <span>{{ new Date(commit.commit.author.date).toLocaleString() }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
