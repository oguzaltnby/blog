<script lang="ts">
import Vue from "vue"
import axios from "axios"

export default Vue.extend({
  data() {
    return {
      siteCommits: [] as any[], // Site repository'sinin commit bilgilerini tutacak
      otherRepositories: [
        {
          name: "repository1",
          description: "Description for repository1",
          stars: 10,
          language: "JavaScript",
        },
        {
          name: "repository2",
          description: "Description for repository2",
          stars: 20,
          language: "TypeScript",
        },
        // Diğer repository'ler burada
      ],
    }
  },
  async mounted() {
    await this.fetchSiteCommits()
  },
  methods: {
    async fetchSiteCommits() {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/oguzaltnby/site/commits`
        )
        this.siteCommits = response.data
      } catch (error) {
        console.error("Error fetching site commits:", error)
      }
    },
  },
})
</script>

<template>
  <div class="space-y-24 mb-10">
    <section id="site-repository" class="mb-12">
      <Title class="mb-4">This Site Repository</Title>
      <div class="rounded-lg card-base p-4 w-full">
        <h3 class="text-black/90 dark:text-white/90 text-xl mb-4">oguzaltnby/site</h3>
        <ul class="space-y-2">
          <li v-for="commit in siteCommits" :key="commit.sha" class="text-black/50 dark:text-white/30">
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
    </section>

    <section id="other-repositories" class="mb-12">
      <Title class="mb-4">Other Repositories</Title>
      <div class="grid gap-4 md:grid-cols-2">
        <div v-for="repo in otherRepositories" :key="repo.name" class="rounded-lg card-base p-4">
          <h3 class="text-black/90 dark:text-white/90 text-xl mb-2">{{ repo.name }}</h3>
          <p class="text-black/50 dark:text-white/30 mb-2">{{ repo.description }}</p>
          <div class="flex items-center justify-between text-black/50 dark:text-white/30">
            <span>Stars:</span>
            <span>{{ repo.stars }}</span>
          </div>
          <div class="flex items-center justify-between text-black/50 dark:text-white/30">
            <span>Language:</span>
            <IconDev :brand="repo.language" class="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.playing-bars {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.bar {
  width: 4px;
  height: 10px;
  background-color: #1db954;
  margin: 0 2px;
  animation: bounce 1s infinite;
}

.bar:nth-child(2) {
  animation-delay: 0.2s;
}

.bar:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.5);
  }
}
</style>
