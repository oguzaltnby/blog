<template>
  <PageLayout title="Latest Updates" :description="[
    `Here you can find the latest updates and commits made to the repository.`,
  ]" class="space-y-12">
    <div class="rounded-lg card-base mb-2 p-4" v-for="commit in commits" :key="commit.sha">
      <p class="text-black/50 dark:text-white/30">{{ commit.commit.message }}</p>
      <p class="text-black/50 dark:text-white/30">Yazar: {{ commit.commit.author.name }}</p>
      <p class="text-black/50 dark:text-white/30">Tarih: {{ new Date(commit.commit.author.date).toLocaleString() }}</p>
    </div>
  </PageLayout>
</template>

<script lang="ts">
import Vue from "vue";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

export default Vue.extend({
  data() {
    return {
      commits: [] as Commit[],
      pageLoaded: false,
    };
  },
  created() {
    this.fetchCommits();
  },
  methods: {
    async fetchCommits() {
      try {
        const response = await fetch('https://api.github.com/repos/oguzaltnby/site/commits');
        const data = await response.json();
        console.log(data); // API'den gelen verileri kontrol et
        this.commits = data;
      } catch (error) {
        console.error('Commit kayıtları alınamadı:', error);
      }
    }
  },
  mounted() {
    this.pageLoaded = true;
  }
});
</script>

<style scoped>
/* Tailwind CSS kullanıldığı için ek stil eklemeye gerek yok */
</style>
