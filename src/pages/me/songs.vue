<script lang="ts">
import Vue from "vue"
import axios from "axios"

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

interface SpotifyResponse {
  items: SpotifyTrack[];
}

export default Vue.extend({
  data() {
    return {
      spotifyData: [] as SpotifyTrack[],
      loading: true,
      error: null,
    }
  },
  async mounted() {
    const code = this.getCodeFromRedirect();
    if (code) {
      try {
        const token = await this.getAccessToken(code);
        await this.fetchTopTracks(token);
      } catch (error) {
        this.error = "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
        console.error("Error fetching Spotify data:", error);
      } finally {
        this.loading = false;
      }
    } else {
      this.redirectToSpotify();
    }
  },
  methods: {
    redirectToSpotify() {
      const clientId = "757572ca119c49fdac93aa5a8398985c";
      const redirectUri = "https://oguzaltnby.com/me/songs";
      const scopes = "user-top-read";
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
      window.location.href = authUrl;
    },

    getCodeFromRedirect() {
      const params = new URLSearchParams(window.location.search);
      return params.get("code");
    },

    async getAccessToken(code: string) {
      const clientId = "757572ca119c49fdac93aa5a8398985c";
      const clientSecret = "1a887fadb2a942f985ca9136064e882e";
      const redirectUri = "https://oguzaltnby.com/me/songs";

      const tokenResponse = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      return tokenResponse.data.access_token;
    },

    async fetchTopTracks(token: string) {
      const response = await axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/top/tracks",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.spotifyData = response.data.items;
    },
  },
});
</script>

<template>
  <PageLayout
    title="Spotify Top Tracks"
    description="En çok dinlenen şarkılarım burada!"
    class="space-y-12"
  >
    <LoadersSongs v-if="loading" />

    <template v-else>
      <section>
        <Title class="mb-4">Top Tracks (Last 7 Days)</Title>

        <div class="grid gap-x-4 gap-y-2 md:grid-cols-2">
          <div
            v-for="track in spotifyData"
            :key="track.name"
            class="flex items-center space-x-4 border rounded-lg p-4 bg-gray-100"
          >
            <img :src="track.album.images[0].url" alt="Album cover" class="h-16 w-16 rounded-lg" />
            <div>
              <p class="font-semibold">{{ track.name }}</p>
              <p class="text-gray-500">{{ track.artists[0].name }}</p>
            </div>
          </div>
        </div>
      </section>
    </template>
  </PageLayout>
</template>
