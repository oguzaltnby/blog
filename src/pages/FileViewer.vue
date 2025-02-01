<template>
  <div>
    <h1>Dosya Listesi</h1>
    <ul>
      <li v-for="file in files" :key="file">
        <!-- İndirme işlemi için download fonksiyonunu çağırıyoruz -->
        <a :href="`/.netlify/functions/downloadFile?filename=${file}`" download>{{ file }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: []
    };
  },
  async mounted() {
    try {
      const res = await fetch('/.netlify/functions/listFiles');
      const data = await res.json();
      this.files = data.files;
    } catch (error) {
      console.error('Dosya listesi çekilemedi:', error);
    }
  }
};
</script>
