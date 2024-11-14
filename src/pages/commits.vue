<template>
  <PageLayout title="Latest Updates" :description="[
    `Here you can find the latest updates and commits made to the repository.`,
  ]" class="space-y-6">
    <draggable
      v-model="commits"
      group="commits"
      @end="onDragEnd"
      :animation="200"
      ghost-class="ghost"
      handle=".handle"
    >
      <div class="flex flex-row items-center gap-4 mb-4 handle" v-for="commit in commits" :key="commit.sha">
        <!-- Commit Image -->
        <div class="rounded-lg h-12 w-12">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFMElEQVR4nO2dz4scRRTHe8Mqij8OHj15EsSoyKIGkXnVGxUPYbNdbyYxRvCWf0G9GLzEgz825l9IPESP/sCT60URyVS1sLhxxcQfCN5Ed/0Fkgmvd5adqemZ7Znpmfr1PtAwMFPwpr/dVa/qvXqVJAzDMAzDMIwnLF05cwuorAlKXhIaN0HJHaHkdvfzJfqOfmPbzigQCo8LjVtCY+eAa4t+a9vecOmcPSQ0vlFBiP1L4Q2h8Ry1tW1+cIwtRv91zrb94XVTu097z02W/wiFa8u69fgz+Yt30EWfQeP54jvjTUnb2Yrt/xEENDibYwZo+RPk2eFhbRrftB4SCn82x5QlHuinhzwm880YJUavKKDw3z4hVdaswaS46bq2vd3PWuW2Wr7b31ZenK21EQBKXu29qQ2VPVa1rcjxif43RF6drbUR0J3w7d/UjdadVdvSb403ZHu21kZAMQufUJDnvjp9NwtSM6Dwh96bSq5t5bZXsiOGQ/B93fZFB2h8r9/lxfNV2wqNF3hQrxmRy5Om20su7UHtUpU9MuD26marbvuiA9ZhUSi8bk4MR4my3MaHzYkhdX2wDovztT5QaNnDXJ+ip5/mGTRO0EBfXLtjxgXzzSh+n+Mx2/8jKEDh25MvLso3bdsfHp1kQSj5zrhigMa3qK1t84OlobPMHFPKYyHyGgeo5hrCxVOg5OXBsUVehnbzeV7ZtYQpiC07mC4siGOwII7BgjgGC+IYLIhjsCCOwYI4BgviGCyIY7AgjsGCOAYL4hgsiOOCtDZat9q2KWpMQZ7daN1j26aoMQU5mq/eb9umqOHsEscoiae/bNumqCnJMvnYtk1RU5Jtsg3rL91m265oKc3F4q1rrgmCH1k0KW7Kk+TwRpUMeWYGjMjnfZ9vuAVGpZOmebZsw6aoGZlorfC7cfYkMjOZh8j/DTeY96Zbnhi+XpKA/Uri2q6wXJ6k/ZPFzi6NfwVT72vg5q/DImj5hel1pVqeSRzZDQYafwy23ldZgAr08ftA4W+mKMLmOlcnWRh7F5iP9b6GRQxpF65Q+HvJ0spFGwP9btmo8XZ/eVnva5ggBOStp8xKEGKvO2jj0XnZmOYoS+ZJYdb7GiUI0cjxUaHwlyFP3ge0hXrm9b5KtnUHW+/rIEGIp9sr9wqNXw/vp+Un5PUc+bJ1e932pUq+EFW9ryqC7D+p8jVQ8r/hE0m5Awo/BSVfpS6i0V59gGL00yRODOyDDL3eV1VB9oA8Owxafj7FADvVFXy9r3EF6R3whZIfzluQ4Ot9TSrIHqnGB2l2b1auc0GQJzdX7jK6uz+T0AXphVKIhG6eLiZwCj8DJTdA469Cy7/rEmSael9Bd1nzwhzUg6/35bogaYnbO3G9r5DcXlssDZkYjlvvK6iJoRMFc/QU9b5CWjoJo94XhrG46BSdZIFqd0W7/O4qkOOxopbXwYJsedNN+SwIQVHNVOMJcmOplnDPkU3fFvEa30K4ZCy5k0MLmCk85dUf8pki2FOpxB9eBy1XbdsbeBFMXBvXQyHvhotgOuY2FpVJmdqPyps8Js2FlOtjN8+qP49popi0kte41PiMivFPGpNONZ6ow6aoMY+rCD4m7duBLtPEpAUf6FKDIJSIXFNMGpTcqcGkuKE4cl1nUIGWf8zW2ggwkw+Cj0n7drBk8DFpH49eDTom7evhxMHGpH09vjvYmLQv8AH3rtE5e4jiy4MH3QcWk/b0CL2+MSWomLS/Z1Blza5LvFnEo32OSTMMwzAMwzCJ39wENIkBxGxmFdQAAAAASUVORK5CYII="
            class="rounded-lg h-12 w-12 object-contain" />
        </div>
        <!-- Commit Details -->
        <div class="rounded-lg card-base p-4 flex flex-col space-y-2">
          <p class="text-black/50 dark:text-white/30">{{ commit.commit.message }}</p>
          <p class="text-black/50 dark:text-white/30 flex items-center">
            <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24" id="user" data-name="Flat Color"
              xmlns="http://www.w3.org/2000/svg">
              <!-- SVG content -->
            </svg>
            {{ commit.commit.author.name }}
          </p>
          <p class="text-black/50 dark:text-white/30 flex items-center">
            <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
              <!-- SVG content -->
            </svg>
            {{ new Date(commit.commit.author.date).toLocaleString() }}
          </p>
        </div>
      </div>
    </draggable>
  </PageLayout>
</template>

<script lang="ts">
import Vue from "vue";
import draggable from "vuedraggable";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

export default Vue.extend({
  components: {
    draggable,
  },
  head() {
    return {
      title: "Commits",
    }
  },
  data() {
    return {
      commits: [] as Commit[],
      pageLoaded: false,
      isDarkMode: false,
      darkIcon: "data:image/png;base64,...",
      lightIcon: "data:image/png;base64,..."
    };
  },
  computed: {
    iconSrc(): string {
      return this.isDarkMode ? this.darkIcon : this.lightIcon;
    }
  },
  created() {
    this.fetchCommits();
  },
  methods: {
    async fetchCommits() {
      try {
        const response = await fetch('https://api.github.com/repos/oguzaltnby/site/commits');
        const data = await response.json();
        console.log(data);
        this.commits = data;
      } catch (error) {
        console.error('Commit kayıtları alınamadı:', error);
      }
    },
    onDragEnd(event: any) {
      // Handle drag end event if needed
    },
  },
  mounted() {
    this.pageLoaded = true;
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.isDarkMode = e.matches;
    });
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
