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
          <div class="rounded-lg p-2 flex items-center justify-center mr-4">
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
            <!-- Eğer dosya şifre korumalıysa farklı bir işleyiş uygulanacak -->
            <template v-if="!requiresPassword(file)">
              <a
                :href="`/.netlify/functions/downloadFile?filename=${file}`"
                class="text-blue-600 dark:text-blue-400 hover:underline text-xs font-semibold ml-4 whitespace-nowrap"
                download
              >
                İndir
              </a>
            </template>
            <template v-else>
              <a
                href="#"
                @click.prevent="handleProtectedDownload(file)"
                class="text-blue-600 dark:text-blue-400 hover:underline text-xs font-semibold ml-4 whitespace-nowrap"
              >
                İndir
              </a>
            </template>
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
      // Şifre korumalı dosyalar için varsayılan şifre
      protectedPassword: "secret",
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
        pdf: "https://img.icons8.com/?size=100&id=zGrV8SMoAvHE&format=png&color=000000",
        doc: "https://img.icons8.com/?size=100&id=pGHcje298xSl&format=png&color=000000",
        docx: "https://img.icons8.com/?size=100&id=pGHcje298xSl&format=png&color=000000",
        xls: "https://img.icons8.com/?size=100&id=117561&format=png&color=000000",
        xlsx: "https://img.icons8.com/?size=100&id=117561&format=png&color=000000",
        ppt: "https://img.icons8.com/?size=100&id=ifP93G7BXUhU&format=png&color=000000",
        pptx: "https://img.icons8.com/?size=100&id=ifP93G7BXUhU&format=png&color=000000",
        jpg: "https://img.icons8.com/?size=100&id=13917&format=png&color=000000",
        jpeg: "https://img.icons8.com/?size=100&id=13917&format=png&color=000000",
        png: "https://img.icons8.com/?size=100&id=13917&format=png&color=000000",
        gif: "https://img.icons8.com/?size=100&id=5oUGM6NBLyWf&format=png&color=000000",
        txt: "https://img.icons8.com/?size=100&id=50nDvbuc0xFF&format=png&color=000000",
        zip: "https://img.icons8.com/?size=100&id=PLvn50bVGAlA&format=png&color=000000",
        rar: "https://img.icons8.com/?size=100&id=PLvn50bVGAlA&format=png&color=000000",
        mp3: "https://img.icons8.com/?size=100&id=p6vT9rfwUGw6&format=png&color=000000",
        mp4: "https://img.icons8.com/?size=100&id=1FE2HGszFS4w&format=png&color=000000",
        default: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/file.svg",
      };
      return icons[extension] || icons.default;
    },
    // Dosya adında ünlem işareti varsa şifre gerektir
    requiresPassword(file: string): boolean {
      return file.includes("!");
    },
    // Şifre korumalı dosya indirme işlemi
    handleProtectedDownload(file: string) {
      const userPassword = window.prompt('Bu dosya şifre ile korunuyor. Lütfen şifreyi giriniz:');
      if (userPassword === this.protectedPassword) {
        // Doğru şifre girildiyse, indirme işlemini başlatırız.
        // Örneğin, aşağıdaki gibi sayfa yönlendirmesi yapabiliriz:
        window.location.href = `/.netlify/functions/downloadFile?filename=${file}&password=${encodeURIComponent(userPassword)}`;
      } else {
        alert('Hatalı şifre!');
      }
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
