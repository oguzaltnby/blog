<template>
  <PageLayout title="Latest Updates" :description="[
    `Here you can find the latest updates and commits made to the repository.`,
  ]" class="space-y-6">
    <div class="flex flex-row items-center gap-4" v-for="commit in commits" :key="commit.sha">
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
            <path id="primary"
              d="M21,20a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2,6,6,0,0,1,6-6h6A6,6,0,0,1,21,20Zm-9-8A5,5,0,1,0,7,7,5,5,0,0,0,12,12Z">
            </path>
          </svg>
          {{ commit.commit.author.name }}
        </p>
        <p class="text-black/50 dark:text-white/30 flex items-center">
          <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>time_fill</title>
            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="System" transform="translate(-1440.000000, -48.000000)" fill-rule="nonzero">
                <g id="time_fill" transform="translate(1440.000000, 48.000000)">
                  <path
                    d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                    id="MingCute" fill-rule="nonzero">
                  </path>
                  <path
                    d="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M12,6 C11.4477,6 11,6.44772 11,7 L11,12 C11,12.2652 11.1054,12.5196 11.2929,12.7071 L14.2929,15.7071 C14.6834,16.0976 15.3166,16.0976 15.7071,15.7071 C16.0976,15.3166 16.0976,14.6834 15.7071,14.2929 L13,11.5858 L13,7 C13,6.44772 12.5523,6 12,6 Z"
                    id="形状" fill="currentColor">
                  </path>
                </g>
              </g>
            </g>
          </svg>
          {{ new Date(commit.commit.author.date).toLocaleString() }}
        </p>
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
