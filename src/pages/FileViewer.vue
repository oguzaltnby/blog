<template>
  <div>
    <h1>Downloadable Files</h1>
    <ul>
      <li v-for="file in files" :key="file.name">
        <a :href="`/.netlify/functions/downloadFile?file=${file.name}`" download>{{ file.name }}</a>
      </li>
    </ul>
    <h1>File Content</h1>
    <pre>{{ fileContent }}</pre>
    <button @click="downloadFile">Download File</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data() {
    return {
      files: [
        { name: 'example.txt' },
        // Add more files as needed
      ],
      fileContent: '',
    };
  },
  created() {
    this.fetchFileContent();
  },
  methods: {
    async fetchFileContent() {
      try {
        const response = await axios.get('/.netlify/functions/getFileContent');
        this.fileContent = response.data.content;
      } catch (error) {
        console.error('Dosya içeriği alınamadı:', error);
      }
    },
    downloadFile() {
      window.location.href = '/.netlify/functions/downloadFile';
    },
  },
});
</script>

<style scoped>
pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
</style>
