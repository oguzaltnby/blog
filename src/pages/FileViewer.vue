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
        <!-- Dosya İkonu (Örneğin commit ikonuna benzer şekilde) -->
        <div class="rounded-lg h-12 w-12">
          <!-- Örnek ikon: Gerçek dosya ikonunu veya istediğiniz başka bir ikon kullanabilirsiniz -->
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFMElEQVR4nO2dz4scRRTHe8Mqij8OHj15EsSoyKIGkXnVGxUPYbNdbyYxRvCWf0G9GLzEgz825l9IPESP/sCT60URyVS1sLhxxcQfCN5Ed/0Fkgmvd5adqemZ7Znpmfr1PtAwMFPwpr/dVa/qvXqVJAzDMAzDMIwnLF05cwuorAlKXhIaN0HJHaHkdvfzJfqOfmPbzigQCo8LjVtCY+eAa4t+a9vecOmcPSQ0vlFBiP1L4Q2h8Ry1tW1+cIwtRv91zrb94XVTu097z02W/wiFa8u69fgz+Yt30EWfQeP54jvjTUnb2Yrt/xEENDibYwZo+RPk2eFhbRrftB4SCn82x5QlHuinhzwm880YJUavKKDw3z4hVdaswaS46bq2vd3PWuW2Wr7b31ZenK21EQBKXu29qQ2VPVa1rcjxif43RF6drbUR0J3w7d/UjdadVdvSb403ZHu21kZAMQufUJDnvjp9NwtSM6Dwh96bSq5t5bZXsiOGQ/B93fZFB2h8r9/lxfNV2wqNF3hQrxmRy5Om20su7UHtUpU9MuD26marbvuiA9ZhUSi8bk4MR4my3MaHzYkhdX2wDovztT5QaNnDXJ+ip5/mGTRO0EBfXLtjxgXzzSh+n+Mx2/8jKEDh25MvLso3bdsfHp1kQSj5zrhigMa3qK1t84OlobPMHFPKYyHyGgeo5hrCxVOg5OXBsUVehnbzeV7ZtYQpiC07mC4siGOwII7BgjgGC+IYLIhjsCCOwYI4BgviGCyIY7AgjsGCOAYL4hgsiOOCtDZat9q2KWpMQZ7daN1j26aoMQU5mq/eb9umqOHsEscoiae/bNumqCnJMvnYtk1RU5Jtsg3rL91m265oKc3F4q1rrgmCH1k0KW7Kk+TwRpUMeWYGjMjnfZ9vuAVGpZOmebZsw6aoGZlorfC7cfYkMjOZh8j/DTeY96Zbnhi+XpKA/Uri2q6wXJ6k/ZPFzi6NfwVT72vg5q/DImj5hel1pVqeSRzZDQYafwy23ldZgAr08ftA4W+mKMLmOlcnWRh7F5iP9b6GRQxpF65Q+HvJ0spFGwP9btmo8XZ/eVnva5ggBOStp8xKEGKvO2jj0XnZmOYoS+ZJYdb7GiUI0cjxUaHwlyFP3ge0hXrm9b5KtnUHW+/rIEGIp9sr9wqNXw/vp+Un5PUc+bJ1e932pUq+EFW9ryqC7D+p8jVQ8r/hE0m5Awo/BSVfpS6i0V59gGL00yRODOyDDL3eV1VB9oA8Owxafj7FADvVFXy9r3EF6R3whZIfzluQ4Ot9TSrIHqnGB2l2b1auc0GQJzdX7jK6uz+T0AXphVKIhG6eLiZwCj8DJTdA469Cy7/rEmSael9Bd1nzwhzUg6/35bogaYnbO3G9r5DcXlssDZkYjlvvK6iJoRMFc/QU9b5CWjoJo94XhrG46BSdZIFqd0W7/O4qkOOxopbXwYJsedNN+SwIQVHNVOMJcmOplnDPkU3fFvEa30K4ZCy5k0MLmCk85dUf8pki2FOpxB9eBy1XbdsbeBFMXBvXQyHvhotgOuY2FpVJmdqPyps8Js2FlOtjN8+qP49popi0kte41PiMivFPGpNONZ6ow6aoMY+rCD4m7duBLtPEpAUf6FKDIJSIXFNMGpTcqcGkuKE4cl1nUIGWf8zW2ggwkw+Cj0n7drBk8DFpH49eDTom7evhxMHGpH09vjvYmLQv8AH3rtE5e4jiy4MH3QcWk/b0CL2+MSWomLS/Z1Blza5LvFnEo32OSTMMwzAMwzCJ39wENIkBxGxmFdQAAAAASUVORK5CYII="
            class="rounded-lg h-12 w-12 object-contain"
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
