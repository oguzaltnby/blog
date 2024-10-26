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

interface SpotifyUser {
  totalPlays: number;
  name: string;
  image: string;
}

export default Vue.extend({
  data() {
    return {
      spotifyData: [] as SpotifyTrack[], // En çok dinlenen şarkı bilgilerini tutacak
      user: {} as SpotifyUser, // Kullanıcı bilgileri
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
        // Kullanıcı bilgilerini al (örneğin, kullanıcı adı ve profil resmi)
        await this.fetchUserProfile(token);
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

    async fetchUserProfile(token: string) {
      const response = await axios({
        method: "get",
        url: "https://api.spotify.com/v1/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.user = {
        totalPlays: response.data.followers.total, // Kullanıcı takipçi sayısını gösteriyoruz
        name: response.data.display_name,
        image: response.data.images[0]?.url || '', // Kullanıcı profil resmi
      };
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
    <LoadersSongs v-if="loading" />
    <div v-else-if="error" class="text-center py-4 text-red-500">{{ error }}</div>
    <div v-else>
      <section>
        <Title class="mb-4">Profile</Title>
        <div class="flex space-x-4 items-center justify-between mb-4">
          <span>Profile</span>
          <div class="flex space-x-2 items-center">
            <SmartLink
              :href="`https://open.spotify.com/user/${user.name}`"
              class="flex-shrink-0"
              blank
            >@{{ user.name }}</SmartLink>
            <SmartImage
              :src="user.image"
              class="rounded-full h-10 w-10"
            />
          </div>
        </div>
        <div class="flex space-x-4 items-center justify-between mb-4">
          <span>Total Plays</span>
          <div class="flex space-x-2 items-center">
            <div class="truncate">{{ user.totalPlays }}</div>
            <IconFire filled class="h-6 text-red-700 w-6 dark:text-current" />
          </div>
        </div>
      </section>

      <section id="top-songs">
        <Title class="mb-4">Top Songs (last 7 days)</Title>
        <div class="grid gap-x-4 gap-y-2 md:grid-cols-2">
          <CardLastFm
            v-for="track in spotifyData"
            :key="track.id"
            :name="track.name"
            :artist="track.artists[0].name"
            :image="track.album.images[0].url"
            :now-playing="false"
            :plays="user.totalPlays" // Bu kısmı güncelleyebilirsiniz
            :url="`https://open.spotify.com/track/${track.id}`"
          />
        </div>
      </section>
    </div>
  </PageLayout>
</template>
