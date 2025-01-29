<template>
  <div>
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
