<template>
  <PageLayout title="Latest Updates" :description="[
    `Here you can find the latest updates and commits made to the repository.`,
  ]" class="space-y-6">
    <div class="relative space-y-4">
      <div v-for="(commit, index) in commits" :key="commit.sha" class="relative flex items-start space-x-4 p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <div class="flex-shrink-0">
          <img :src="iconSrc" class="rounded-full h-12 w-12 object-cover" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            {{ commit.commit.message }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            by {{ commit.commit.author.name }} on {{ new Date(commit.commit.author.date).toLocaleString() }}
          </p>
        </div>
        <div v-if="index < commits.length - 1" class="absolute left-6 top-16 h-full w-0.5 bg-gray-300 dark:bg-gray-700"></div>
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
      lightIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAADmElEQVR4nO2ay2sUQRDGWzB68K0XxZMoauJNvEpEPEQPyU5Xar+abEIQZM76Hwh68JFofCCePQmCB5+I4E08iCefF/GFXsUnahSldldNOrsmM25nZpb5QcOy01tb3/SruquNKSgoKChoQ0RoE0DHAfsAsB/rRT8fY+aurNufMcw8T4ROidjvIvSzcak+G4uiqCNr9pM4c7O5I1McuxHHKd/2Y1N78zN15k8Zy4r92GNqajezD0WC3t7e3kVaAOoToUeOQ+NAqTNt+7HRCcR1plKpLHbrMfMSgB47To2mbT82tbf990/0bTevGwSOQ/fTth8bEXo/8U+0izWrqy3jOPQ+bfux0XUwqUP627Ttx8btcmFoqVldoJ//t0vHsa8BiWk1gD3hjLHnzLzcrTc0VFohYl84dY/7tO9laQJKnYD94Tj1SoQGK5Vg1cDAwDIRKte/mxQVMfMGX/b1N2FoN7ZcsKJxbNzAAKAR49G+lyXpNxrGAXQ1hthLcUK/uv0rMxdrL3uPp7u7u+eK0BHAfmsuVJ/ZQ1o3iX2ADk9nX+sksZ8YZl6nohq89UP6rBX23YlMhL6o0FbYT4wr2LSQMORux/4dkzbiUbAI7XO68tlW2s+cYMDenRyM9O8x7SoYoJ3O3PBZ12LTjoKZeQ1Abxzb50wWkBYLFgm2A/Tasfsp1ZnZh2CAtgJ0ofHaG+w1WUESCgZKazU2FqEzAD39R5Bx2hgzx+RBcE9Pz/xyOdgM2CGADojQeRG6B9h3Mwgb9XzrYKbEKq6junMBaL+Iva0HbAk2A1ruidAWk0UkmaBGLfoVoIvlst2RuVadSFKBAL0VoVu6fQxDu2twcHCByQMyvbiXIvaaCgNsBNA23dCbvCKNRd4pl/t3M/Nq025Ig+1hpsdgqwVnIt71AVBarycfDSajw/rMtAtR7dxpZJo1dlzEHvV+3uQbZp4H0PUYS89V/Y3JKyI0Fn+9tcdMHpHqnYvJB+X1DEDIzCuHh/uWigT9tXV3lg7KfQLQSaf1njWakTU9ommSWcnS+0SczDtAtnndakv7TXb5Bk46k5kXpprO9I1kLWHtG8A+yNSVBN9gambvkV4wcevpdyL2SdIMYmZg5i73WlHtNk0QaBeudWNt2cliNerK5bKUNPDwmr/1TRRFHXrdL0ZoeT338XRUFV1t6X9uHnTM517s1DFNozoDi9gPtUL362dU+RyzBQUFBQUmXX4BPId+z5ebSJQAAAAASUVORK5CYII="
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
