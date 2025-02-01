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
        <!-- Dosya İkonu Uzantıya Göre Belirleniyor -->
        <div class="rounded-lg h-12 w-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <component :is="getFileIcon(file)" class="h-8 w-8 text-gray-700 dark:text-gray-300" />
        </div>
        <!-- Dosya Detayları ve İndirme Bağlantısı -->
        <div class="rounded-lg card-base p-4 flex flex-col space-y-2">
          <p class="text-black/50 dark:text-white/30">{{ file }}</p>
          <a
            :href="`/.netlify/functions/downloadFile?filename=${file}`"
            class="text-blue-600 hover:underline"
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
import { DocumentTextIcon, VideoCameraIcon, MusicNoteIcon, PhotoIcon, FileIcon } from "@heroicons/vue/solid";

export default Vue.extend({
  components: {
    draggable,
    DocumentTextIcon,
    VideoCameraIcon,
    MusicNoteIcon,
    PhotoIcon,
    FileIcon
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
        // Netlify Functions'dan dosya listesini alıyoruz.
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
      const ext = filename.split('.').pop()?.toLowerCase();
      if (!ext) return FileIcon;

      const iconMap: Record<string, any> = {
        'pdf': DocumentTextIcon,
        'doc': DocumentTextIcon, 'docx': DocumentTextIcon,
        'txt': DocumentTextIcon,
        'jpg': PhotoIcon, 'jpeg': PhotoIcon, 'png': PhotoIcon, 'gif': PhotoIcon, 'svg': PhotoIcon,
        'mp4': VideoCameraIcon, 'avi': VideoCameraIcon, 'mov': VideoCameraIcon,
        'mp3': MusicNoteIcon, 'wav': MusicNoteIcon, 'flac': MusicNoteIcon
      };

      return iconMap[ext] || FileIcon;
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
