<script lang="ts">
import Vue from "vue";
import axios from "axios";

// Spotify API için gerekli tipler
interface SpotifyUser {
  display_name: string;
  followers: {
    total: number;
  };
  images: { url: string }[];
}

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  id: string;
}

interface SpotifyResponse {
  items: SpotifyTrack[];
}

export default Vue.extend({
  data() {
    return {
      user: {} as SpotifyUser,
      topTracks: [] as SpotifyTrack[],
      topArtists: [] as SpotifyTrack[], // Top artists için ekledim
      loading: true,
      error: null,
    };
  },
  async mounted() {
    const code = this.getCodeFromRedirect();
    if (code) {
      try {
        const token = await this.getAccessToken(code);
        await this.fetchUserProfile(token);
        await this.fetchTopTracks(token);
        await this.fetchTopArtists(token); // Top artists verilerini al
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
      const scopes = "user-top-read user-read-private";
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

      const tokenResponse = await axios.post("https://accounts.spotify.com/api/token", new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }));

      return tokenResponse.data.access_token;
    },

    async fetchUserProfile(token: string) {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.user = response.data;
    },

    async fetchTopTracks(token: string) {
      const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.topTracks = response.data.items;
    },

    async fetchTopArtists(token: string) { // Top artists için fonksiyon
      const response = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.topArtists = response.data.items; // En çok dinlenen sanatçıları sakla
    },
  },
});
</script>

<template>
  <PageLayout
    title="My Spotify Songs"
    description="My latest activity on Spotify. Check out my top tracks and artists!"
    class="space-y-12"
  >
    <LoadersSongs v-if="loading" />
    <div v-else>
      <section>
        <Title class="mb-4">Profile</Title>
        <div class="grid gap-x-0 gap-y-4 md:gap-x-12 md:grid-cols-2">
          <div class="flex space-x-4 items-center justify-between">
            <span>Name</span>
            <div class="flex space-x-2 items-center">
              <SmartLink
                :href="user.external_urls?.spotify"
                class="flex-shrink-0"
                blank
                >@{{ user.display_name }}</SmartLink
              >
              <SmartImage
                :src="user.images[0]?.url"
                class="rounded-full h-8 w-8"
              />
            </div>
          </div>

          <div class="flex space-x-4 items-center justify-between">
            <span>Followers</span>
            <div class="truncate">{{ user.followers?.total }}</div>
          </div>
        </div>
      </section>

      <section id="top-songs">
        <Title class="mb-4">Top Songs</Title>
        <div class="grid gap-x-4 gap-y-2 md:grid-cols-2">
          <CardLastFm
            v-for="track in topTracks"
            :key="track.id"
            :name="track.name"
            :artist="track.artists[0].name"
            :image="track.album.images[0].url"
            :url="`https://open.spotify.com/track/${track.id}`"
          />
        </div>
      </section>

      <section id="top-artists">
        <Title class="mb-4">Top Artists</Title>
        <div class="grid gap-x-4 gap-y-2 md:grid-cols-2">
          <CardLastFm
            v-for="artist in topArtists"
            :key="artist.id"
            :name="artist.name"
            :image="artist.images[0].url"
            :url="`https://open.spotify.com/artist/${artist.id}`"
          />
        </div>
      </section>
    </div>
  </PageLayout>
</template>
