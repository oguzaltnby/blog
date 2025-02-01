<template>
  <PageLayout
    title="Dosya Listesi"
    :description="['Buradan dosyaları görüntüleyip indirebilirsiniz.']"
    class="space-y-6"
  >
    <draggable
      v-model="files"
      group="files"
      @end="onDragEnd"
      :animation="200"
      ghost-class="ghost"
      handle=".handle"
    >
      <div
        class="flex flex-row items-center gap-4 mb-4 handle bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        v-for="file in files"
        :key="file"
      >
        <!-- Dosya İkonu -->
        <div class="rounded-lg h-12 w-12 flex items-center justify-center">
          <img
            :src="getFileIcon(file)"
            class="h-10 w-10 object-contain"
            alt="Dosya İkonu"
          />
        </div>
        <!-- Dosya Detayları ve İndirme Bağlantısı -->
        <div class="flex flex-col space-y-2">
          <p class="text-black/50 dark:text-white/30">{{ file }}</p>
          <a
            :href="`/.netlify/functions/downloadFile?filename=${file}`"
            class="text-blue-600 dark:text-blue-400 hover:underline"
            download
          >
            İndir
          </a>
        </div>
      </div>
    </draggable>
  </PageLayout>
</template>

<script lang="ts">
import Vue from "vue";
import draggable from "vuedraggable";

export default Vue.extend({
  components: {
    draggable,
  },
  head() {
    return {
      title: "Dosya Listesi"
    }
  },
  data() {
    return {
      files: [] as string[],
      pageLoaded: false,
    };
  },
  created() {
    this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      try {
        const res = await fetch('/.netlify/functions/listFiles');
        const data = await res.json();
        this.files = data.files;
      } catch (error) {
        console.error('Dosya listesi alınamadı:', error);
      }
    },
    onDragEnd(event: any) {
      // İsteğe bağlı: Drag işlemi bittiğinde yapılacaklar
    },
    getFileIcon(filename: string) {
      const extension = filename.split('.').pop()?.toLowerCase() || "default";
      const icons: Record<string, string> = {
        pdf: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-pdf/file-pdf-original.svg",
        doc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-word/file-word-original.svg",
        docx: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-word/file-word-original.svg",
        xls: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-excel/file-excel-original.svg",
        xlsx: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-excel/file-excel-original.svg",
        ppt: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-powerpoint/file-powerpoint-original.svg",
        pptx: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-powerpoint/file-powerpoint-original.svg",
        jpg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-image/file-image-original.svg",
        jpeg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-image/file-image-original.svg",
        png: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-image/file-image-original.svg",
        gif: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-image/file-image-original.svg",
        txt: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-text/file-text-original.svg",
        zip: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-zip/file-zip-original.svg",
        rar: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-zip/file-zip-original.svg",
        mp3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-audio/file-audio-original.svg",
        mp4: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file-video/file-video-original.svg",
        default: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file/file-original.svg",
      };
      return icons[extension] || icons.default;
    }
  },
  mounted() {
    this.pageLoaded = true;
  }
});
</script>

<style scoped>
.ghost {
  opacity: 0.4;
}
.handle {
  cursor: grab;
}
.handle:active {
  cursor: grabbing;
}
</style>
