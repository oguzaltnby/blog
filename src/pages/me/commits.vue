<template>
  <PageLayout title="Latest Updates" :description="[
    `Here you can find the latest updates and commits made to the repository.`,
  ]" class="space-y-12">
    <div class="grid gap-1" v-for="commit in commits" :key="commit.sha">
      <div class="flex h-full space-x-4 items-center rounded-lg card-base">
        <div class="rounded-lg">
          <img :src="iconSrc" class="rounded-lg h-12 w-12" />
        </div>

        <div class="rounded-tr rounded-br flex h-full">
          <div class="rounded-lg" >
            <p class="text-black/50 dark:text-white/30">{{ commit.commit.message }}</p>
            <p class="text-black/50 dark:text-white/30">by {{ commit.commit.author.name }}</p>
            <p class="text-black/50 dark:text-white/30">{{ new Date(commit.commit.author.date).toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

  </PageLayout>
</template>

<script lang="ts">
import Vue from "vue";

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
  data() {
    return {
      commits: [] as Commit[],
      pageLoaded: false,
      isDarkMode: false,
      darkIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADmElEQVR4nO2ay2sUQRDGWzB68K0XxZMoauJNvEpEPEQPyU5Xar+abEIQZM76Hwh68JFofCCePQmCB5+I4E08iCefF/GFXsUnahSldldNOrsmM25nZpb5QcOy01tb3/SruquNKSgoKChoQ0RoE0DHAfsAsB/rRT8fY+aurNufMcw8T4ROidjvIvSzcak+G4uiqCNr9pM4c7O5I1McuxHHKd/2Y1N78zN15k8Zy4r92GNqajezD0WC3t7e3kVaAOoToUeOQ+NAqTNt+7HRCcR1plKpLHbrMfMSgB47To2mbT82tbf990/0bTevGwSOQ/fTth8bEXo/8U+0izWrqy3jOPQ+bfux0XUwqUP627Ttx8btcmFoqVldoJ//t0vHsa8BiWk1gD3hjLHnzLzcrTc0VFohYl84dY/7tO9laQJKnYD94Tj1SoQGK5Vg1cDAwDIRKte/mxQVMfMGX/b1N2FoN7ZcsKJxbNzAAKAR49G+lyXpNxrGAXQ1hthLcUK/uv0rMxdrL3uPp7u7u+eK0BHAfmsuVJ/ZQ1o3iX2ADk9nX+sksZ8YZl6nohq89UP6rBX23YlMhL6o0FbYT4wr2LSQMORux/4dkzbiUbAI7XO68tlW2s+cYMDenRyM9O8x7SoYoJ3O3PBZ12LTjoKZeQ1Abxzb50wWkBYLFgm2A/Tasfsp1ZnZh2CAtgJ0ofHaG+w1WUESCgZKazU2FqEzAD39R5Bx2hgzx+RBcE9Pz/xyOdgM2CGADojQeRG6B9h3Mwgb9XzrYKbEKq6junMBaL+Iva0HbAk2A1ruidAWk0UkmaBGLfoVoIvlst2RuVadSFKBAL0VoVu6fQxDu2twcHCByQMyvbiXIvaaCgNsBNA23dCbvCKNRd4pl/t3M/Nq025Ig+1hpsdgqwVnIt71AVBarycfDSajw/rMtAtR7dxpZJo1dlzEHvV+3uQbZp4H0PUYS89V/Y3JKyI0Fn+9tcdMHpHqnYvJB+X1DEDIzCuHh/uWigT9tXV3lg7KfQLQSaf1njWakTU9ommSWcnS+0SczDtAtnndakv7TXb5Bk46k5kXpprO9I1kLWHtG8A+yNSVBN9gambvkV4wcevpdyL2SdIMYmZg5i73WlHtNk0QaBeudWNt2cliNerK5bKUNPDwmr/1TRRFHXrdL0ZoeT338XRUFV1t6X9uHnTM517s1DFNozoDi9gPtUL362dU+RyzBQUFBQUmXX4BPId+z5ebSJQAAAAASUVORK5CYII=",
      lightIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADw0lEQVR4nO1azWtcVRS/hVoXNcaPTcWVKNbEnbgVS+mmXSh+gmAXBena/gUjGDPnvHPfTKYNxefMOZNEBFHoohpDENyVLCQr08SN+EW7FWMUbVJSzkxLkzszybznu5n3hveDC4+8O7+c3/0459x7njEFChQoUGAIAZWZ59FKFYlXwPKGtvazVIh4POv8faNU+uIIWr4ExFtoZbtb03dAPBVF0QNZ449tDFj5tpchHYZZWYxjlG/+2NCR79eYHbMxlRX+2HvKXWZg5TraxiuIjRFt5UBeRZJVx6hNqNbHBs0fGy0H4hhTq336sNsPIBpF4rVdRhGHg+aPjfZo3/8nOtq9+gYBv+YY/8Og+WMDrKzvGlVsjPTqqzPjGLQ+aP7YaMXBxAbxxqD5Y8NdckHYeKNX3yBsvvV/l3Qcfk1ITNpAKzVHxC9hWH/M7Tc5Ofs4Wv7V8aRVn/xeQhNU62No5bYj5PdyyO9OVKInyuXPHgXit/VvjjFbiI3jvvj1Nx/Z5nOpC1ZoHhs7MbBijUd+LyHpHjSNA+L5/g3iq3FSP+2LVr7uezBJvjqAfLp0GKwEQHJrD0NugWXQvkn4kQT349c+SfgTYzKsP6OiOpcwg75Lg7/DkZH8q0LT4E8MV3Cq3CG/7OzXpTT5syeY+IIj+OM0+TMnGEi+d/jfM8MqGIhPO/H8H43FZhgFE33yFJLcdJzhnMkCMGXBZZKTYOWGw/v3QD2zD8GI8hJa+bJr3A34fZMVYELBQTDzdCs3JrmMJD/1Th1lent7+5DJg+BarfYgoryA1DwLlj8E4s/B8jIQ/7l/2shbSDKRKbEK11A9uSDxB0h8TS/YYh8G2g5qGSuNF00WgQkEdW/8H1i5EgR8KnOzuhNJBQLxH0DynR4fMZQzRHNHTR6A+wv7Da180xJm+XyZmif0QG/yCuzqWXkJiM+F4cyTZtiAXY6Hmd6DaQvORL7rA5N29lm9+eiSKKC+M8OCSO+1Wg5ozxi7icTk/b7JN0pavyVeiBF65vU3Jq8A4qn4WZNUTB4B7W8unItyrQDwO0HQPFatNh8B4jfvxt2DuSj3CSC+6MTan7t5ZC2PaJnkQKr0PoFO5R1IXu/VV2fae7HLN8ApZ5ampx8aaDnTNyBrBWvfQOKVTH2S4BvgVvZIVvUDk45+EI2ClR+TVhAzAyIe7/g6jnhNZ1OXsDZ9dsVq1pXLsJQ08fBavz2gPHoxRmq5kPt8OmoXxaf2Ozzons+9WHdP63JVD4wkf2nTZ3VQud2zBQoUKFDADBZ3AJKfoGraKcjSAAAAAElFTkSuQmCC"
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
        console.log(data); // API'den gelen verileri kontrol et
        this.commits = data;
      } catch (error) {
        console.error('Commit kayıtları alınamadı:', error);
      }
    }
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
/* Tailwind CSS kullanıldığı için ek stil eklemeye gerek yok */
</style>
