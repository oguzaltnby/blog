<template>
  <PageLayout
    title="Dosya Listesi"
    :description="['Buradan dosyaları görüntüleyip indirebilirsiniz.']"
    class="space-y-6"
  >
    <!-- Grid düzen: geniş ekranlarda 4 sütun, küçük ekranlarda 1 sütun -->
    <draggable
      v-model="files"
      group="files"
      tag="div"
      class="grid grid-cols-1 md:grid-cols-4 gap-2"
      @end="onDragEnd"
      :animation="200"
      ghost-class="ghost"
      handle=".handle"
    >
      <div v-for="file in files" :key="file" class="handle">
        <!-- Row şeklinde tasarlanmış kart -->
        <div class="rounded-lg card-base p-2 flex flex-row items-center h-14">
          <!-- İkon Bölümü -->
          <div class="rounded-lg  p-2 flex items-center justify-center mr-4">
            <img
              :src="getFileIcon(file)"
              class="h-8 w-8 object-contain"
              alt="Dosya İkonu"
            />
          </div>
          <!-- Dosya Bilgileri -->
          <div class="flex flex-row items-center justify-between w-full">
            <p class="text-gray-700 dark:text-gray-300 text-sm font-medium truncate">
              {{ file }}
            </p>
            <a
              :href="`/.netlify/functions/downloadFile?filename=${file}`"
              class="text-blue-600 dark:text-blue-400 hover:underline text-xs font-semibold ml-4 whitespace-nowrap"
              download
            >
              İndir
            </a>
          </div>
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
      // Drag işlemi tamamlandığında yapılacaklar (gerekirse)
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
