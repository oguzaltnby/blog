<template>
  <PageLayout
    title="Dosya Listesi"
    :description="['Buradan dosyaları görüntüleyip indirebilirsiniz.']"
    class="space-y-6"
  >
    <!-- Grid düzeni: mobilde tek sütun, md'de 3 sütun, lg'de 4 sütun -->
    <draggable
      v-model="files"
      group="files"
      tag="div"
      class="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-x-2 gap-y-2"
      @end="onDragEnd"
      :animation="200"
      ghost-class="ghost"
      handle=".handle"
    >
      <div v-for="file in files" :key="file" class="handle">
        <!-- CardSkill benzeri kutu düzeni -->
        <div class="rounded-lg card-base p-4 flex flex-col items-center">
          <!-- İkon -->
          <div class="mb-2">
            <img
              :src="getFileIcon(file)"
              class="h-12 w-12 object-contain"
              alt="Dosya İkonu"
            />
          </div>
          <!-- Dosya Adı -->
          <p class="text-center text-gray-700 dark:text-gray-300 text-sm font-medium truncate">
            {{ file }}
          </p>
          <!-- İndir Linki -->
          <a
            :href="`/.netlify/functions/downloadFile?filename=${file}`"
            class="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-xs font-semibold"
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
      // Drag işlemi tamamlandığında yapılacaklar (gerektiğinde)
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
