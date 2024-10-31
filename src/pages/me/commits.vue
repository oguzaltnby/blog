
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Commit Kayıtları</h1>
    <ul>
      <li v-for="commit in commits" :key="commit.sha" class="mb-2 p-4 border rounded shadow">
        <p class="text-lg font-semibold">{{ commit.commit.message }}</p>
        <p class="text-sm text-gray-600">Yazar: {{ commit.commit.author.name }}</p>
        <p class="text-sm text-gray-600">Tarih: {{ new Date(commit.commit.author.date).toLocaleString() }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commits: []
    };
  },
  created() {
    this.fetchCommits();
  },
  methods: {
    async fetchCommits() {
      try {
        const response = await fetch('https://api.github.com/repos/<kullanici_adi>/site/commits');
        const data = await response.json();
        this.commits = data;
      } catch (error) {
        console.error('Commit kayıtları alınamadı:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Tailwind CSS kullanıldığı için ek stil eklemeye gerek yok */
</style>
