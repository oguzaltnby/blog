<template>
  <PageLayout
    title="Dosya Listesi"
    :description="['Buradan dosyaları görüntüleyip indirebilirsiniz.']"
    class="space-y-6"
  >
    <!-- draggable bileşeninin container'ı grid layout olarak ayarlandı -->
    <draggable
      v-model="files"
      group="files"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      @end="onDragEnd"
      :animation="200"
      ghost-class="ghost"
      handle=".handle"
    >
      <div v-for="file in files" :key="file" class="handle">
        <!-- Kart boyutları ve dizilimi örnek görseldeki gibi ayarlandı -->
        <div class="rounded-lg card-base p-4 flex flex-col justify-center items-center h-48">
          <!-- İkon bölümü (arka plan, padding ve yuvarlatılmış köşeler ile) -->
          <div class="rounded-lg bg-gray-200 dark:bg-gray-800 p-2 flex items-center justify-center mb-4">
            <img
              :src="getFileIcon(file)"
              class="h-12 w-12 object-contain"
              alt="Dosya İkonu"
            />
          </div>
          <!-- Dosya adı ve İndir linki (ortalanmış) -->
          <p class="text-gray-700 dark:text-gray-300 font-medium mb-2 text-center">
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
