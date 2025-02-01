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
        class="flex flex-row items-center gap-4 mb-4 handle"
        v-for="file in files"
        :key="file"
      >
        <!-- Dosya İkonu -->
        <div class="rounded-lg h-12 w-12 flex-shrink-0">
          <img
            :src="getFileIcon(file)"
            class="rounded-lg h-12 w-12 object-contain"
            alt="Dosya İkonu"
          />
        </div>
        <!-- Dosya Detayları ve İndirme Bağlantısı (Commit tasarımına uyarlanmış kart görünümü) -->
        <div class="rounded-lg card-base p-4 flex flex-col space-y-2 flex-1">
          <p class="text-gray-700 dark:text-gray-300 font-medium">
            {{ file }}
          </p>
          <a
            :href="`/.netlify/functions/downloadFile?filename=${file}`"
            class="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
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
      title: "Dosya Listesi",
    };
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
        pdf: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-text.svg",
        doc: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-text.svg",
        docx: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-text.svg",
        xls: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-spreadsheet.svg",
        xlsx: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-spreadsheet.svg",
        ppt: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-presentation.svg",
        pptx: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-presentation.svg",
        jpg: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/image.svg",
        jpeg: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/image.svg",
        png: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/image.svg",
        gif: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/image.svg",
        txt: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-text.svg",
        zip: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-archive.svg",
        rar: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-archive.svg",
        mp3: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-music.svg",
        mp4: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file-video.svg",
        default: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file.svg",
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
