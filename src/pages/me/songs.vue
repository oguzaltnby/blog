<script lang="ts">
import Vue from "vue"
import axios from "axios"

export default Vue.extend({
  data() {
    return {
      spotifyData: null, // En çok dinlenen şarkı bilgilerini tutacak
      loading: true, // Yüklenme durumu
      error: null, // Hata durumu
    }
  },
  async mounted() {
    // Spotify oturumu açma sürecini başlat
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
    // Kullanıcıyı Spotify yetkilendirme sayfasına yönlendirme
    redirectToSpotify() {
      const clientId = "757572ca119c49fdac93aa5a8398985c";
      const redirectUri = "https://oguzaltnby.com/me/songs";
      const scopes = "user-top-read";
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scopes)}`;
      window.location.href = authUrl;
    },

    // Yetkilendirme sonrası URL'den yetki kodunu almak
    getCodeFromRedirect() {
      const params = new URLSearchParams(window.location.search);
      return params.get("code");
    },

    // Yetki kodunu kullanarak erişim token'ı almak
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

    // En çok dinlenen şarkıları almak için
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
  <div>
    <h1>Spotify Top Tracks</h1>

    <!-- Yüklenme durumunu göster -->
    <div v-if="loading">Şarkılar yükleniyor...</div>

    <!-- Hata durumunu göster -->
    <div v-else-if="error">{{ error }}</div>

    <!-- Şarkıları göster -->
    <div v-else>
      <ul v-if="spotifyData">
        <li v-for="track in spotifyData" :key="track.id">
          <div>
            <img :src="track.album.images[0].url" alt="Album cover" width="50" />
            <p>{{ track.name }} - {{ track.artists[0].name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
