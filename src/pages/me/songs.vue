<script lang="ts">
import Vue from "vue";
import axios from "axios";

// Spotify track ve kullanıcı bilgileri için interface tanımları
interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  id: string;
}

export default Vue.extend({
  data() {
    return {
      spotifyData: [] as SpotifyTrack[], // En çok dinlenen şarkı bilgilerini tutacak
      loading: true, // Yüklenme durumu
      error: null, // Hata durumu
    };
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
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scopes)}`;
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

      this.spotifyData = response.data.items; // En çok dinlenen şarkıları sakla
    },
  },
});
</script>

<template>
  <PageLayout
    title="My Spotify Songs"
    description="My most listened songs from Spotify, displayed in a similar layout to Last.fm!"
    class="space-y-12"
  >
    <div v-if="loading" class="text-center py-4">Şarkılar yükleniyor...</div>
    <div v-else-if="error" class="text-center py-4 text-red-500">{{ error }}</div>
    <div v-else>
      <section id="top-songs">
        <Title class="mb-4">Top Songs (last 7 days)</Title>

        <div class="grid gap-x-4 gap-y-2 md:grid-cols-2">
          <div
            v-for="track in spotifyData"
            :key="track.id"
            class="flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              :src="track.album.images[0].url"
              alt="Album cover"
              class="rounded-lg w-16 h-16 mr-4"
            />
            <div>
              <p class="font-semibold">{{ track.name }}</p>
              <p class="text-sm text-gray-500">{{ track.artists[0].name }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </PageLayout>
</template>

<style scoped>
.spotify-page {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.track-card {
  display: flex;
  align-items: center;
  border: 1px solid #eaeaea;
  padding: 10px;
  border-radius: 8px;
  transition: box-shadow 0.3s;
}

.track-card:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.album-cover {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
}

.track-name {
  font-size: 1.1rem;
}

.track-artist {
  font-size: 0.9rem;
  color: #888;
}
</style>
