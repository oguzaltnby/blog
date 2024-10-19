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
    // Spotify API'ye erişim için token al ve şarkıları getir
    try {
      const token = await this.getAccessToken()
      await this.fetchTopTracks(token)
    } catch (error) {
      this.error = "Bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      console.error("Error fetching Spotify data:", error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    // Access Token'ı almak için
    async getAccessToken() {
      const clientId = "8e0b2aa6950640afa89f05a153246af1"
      const clientSecret = "877c05b3a4484219ba26603fc1b84279"

      const tokenResponse = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        headers: {
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: "grant_type=client_credentials",
      })

      return tokenResponse.data.access_token
    },

    // En çok dinlenen şarkıları almak için
    async fetchTopTracks(token: string) {
      const response = await axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/top/tracks",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      this.spotifyData = response.data.items // En çok dinlenen şarkıları sakla
    },
  },
})
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
