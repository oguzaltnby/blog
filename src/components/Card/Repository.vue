<template>
  <PageLayout title="Repositories" description="My public projects on GitHub.">
    <div v-if="$fetchState.pending === true" class="grid gap-4 md:grid-cols-2">
      <SkeletonLoader v-for="i in 9" :key="`skeleton-${i}`" type="repository" />
    </div>
    <div v-else class="grid gap-4 md:grid-cols-2">
      <SmartLink
        v-for="repo in repos"
        :key="repo.id"
        :href="repo.html_url"
        blank
      >
        <CardRepository
          :name="repo.name"
          :language="repo.language"
          :stars="repo.stargazers_count"
          :description="repo.description"
          :license="repo.license && repo.license.spdx_id"
          :top="repo.id === repos[0].id"
          class="h-full"
        />
      </SmartLink>
    </div>
    <div class="mt-8">
      <h2 class="text-xl font-bold">Commit History for "site" Repository</h2>
      <ul>
        <li v-for="commit in siteCommits" :key="commit.sha">
          {{ commit.commit.message }} - {{ commit.commit.author.name }}
        </li>
      </ul>
    </div>
  </PageLayout>
</template>

<script lang="ts">
import Vue from "vue"
// Import type
import type { Repository, Commit } from "~/src/types/Response/GitHub"

export default Vue.extend({
  data() {
    return {
      repos: [] as Repository[],
      siteCommits: [] as Commit[],
    }
  },
  fetchOnServer: false,
  async fetch() {
    const filter = [
      "oguzhan",
      "DBM",
      "oguzaltnby.com",
      "bu-saatte-cekilir-mi",
    ]
    const repos: Repository[] = (
      await this.$axios.get(
        "https://api.github.com/users/oguzaltnby/repos?per_page=100"
      )
    ).data
    this.repos = repos
      ?.filter((repo) => repo.fork === false && !filter.includes(repo.name))
      ?.sort((a, b) => b?.stargazers_count - a?.stargazers_count)

    // Fetch commit history for the "site" repository
    await this.fetchSiteCommits()
  },
  methods: {
    async fetchSiteCommits() {
      const commits: Commit[] = (
        await this.$axios.get(
          "https://api.github.com/repos/oguzaltnby/site/commits"
        )
      ).data
      this.siteCommits = commits
    },
  },
  head() {
    const title = "GitHub Repositories"
    const description = "My public projects hosted on GitHub."
    return {
      title,
      meta: this.$prepareMeta({
        title,
        description,
      }),
    }
  },
})
</script>
