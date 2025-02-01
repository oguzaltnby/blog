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
        <div class="rounded-lg h-12 w-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <img
            :src="getFileIcon(file)"
            class="h-10 w-10 object-contain"
            alt="Dosya İkonu"
          />
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

export default Vue.extend({
  components: {
    draggable,
  },
  head() {
    return {
      title: "Dosya Listesi"
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
    getFileIcon(file: string): string {
      const extension = file.split('.').pop()?.toLowerCase();
      const icons: { [key: string]: string } = {
        pdf: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
        doc: "https://cdn-icons-png.flaticon.com/512/337/337932.png",
        docx: "https://cdn-icons-png.flaticon.com/512/337/337932.png",
        xls: "https://cdn-icons-png.flaticon.com/512/732/732220.png",
        xlsx: "https://cdn-icons-png.flaticon.com/512/732/732220.png",
        jpg: "https://cdn-icons-png.flaticon.com/512/136/136524.png",
        jpeg: "https://cdn-icons-png.flaticon.com/512/136/136524.png",
        png: "https://cdn-icons-png.flaticon.com/512/136/136524.png",
        gif: "https://cdn-icons-png.flaticon.com/512/136/136530.png",
        zip: "https://cdn-icons-png.flaticon.com/512/135/135716.png",
        rar: "https://cdn-icons-png.flaticon.com/512/135/135715.png",
        mp3: "https://cdn-icons-png.flaticon.com/512/2305/2305935.png",
        mp4: "https://cdn-icons-png.flaticon.com/512/2305/2305939.png",
        txt: "https://cdn-icons-png.flaticon.com/512/482/482459.png",
        default: "https://cdn-icons-png.flaticon.com/512/833/833524.png"
      };
      return icons[extension || "default"];
    },
    onDragEnd(event: any) {
      // İsteğe bağlı: Drag işlemi bittiğinde yapılacaklar
    },
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
