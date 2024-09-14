<template>
  <main class="space-y-20">
    <div>
      <Title class="mb-4">Details</Title>

      <div class="grid gap-x-0 gap-y-4 md:gap-x-12 md:grid-cols-2">
        <div class="flex space-x-4 items-center">
          <span>Profile</span>

          <div class="flex space-x-2 w-full justify-end items-center">
            <SkeletonLoader v-if="!user" class="h-5 w-1/2" />
            <span v-else>{{ user.display_name }}</span>
            <SkeletonLoader v-if="!user" class="h-6 w-6 !rounded-full" />
            <img v-else :src="user.images[0]?.url" class="h-6 w-6 rounded-full" />
          </div>
        </div>

        <!-- Play count -->
        <div class="flex space-x-4 items-center justify-between">
          <span class="flex-shrink-0">Total Plays</span>

          <div class="flex space-x-2 w-full justify-end items-center">
            <SkeletonLoader v-if="!totalPlays" class="h-5 w-1/3" />
            <span v-else>{{ totalPlays }}</span>
          </div>
        </div>

        <!-- Registered -->
        <div class="flex space-x-4 items-center justify-between">
          <span class="flex-shrink-0">Account Age</span>

          <div class="flex space-x-2 w-full justify-end items-center">
            <SkeletonLoader v-if="!accountAge" class="h-5 w-1/4" />
            <span v-else>{{ accountAge }} years</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <Title class="mb-4">Top Songs (last 7 days)</Title>

      <div class="grid gap-2 md:grid-cols-2">
        <SkeletonLoader v-if="!topTracks.length" v-for="top in 6" :key="top" type="lastfm" />
        <div v-else v-for="track in topTracks" :key="track.id" class="flex items-center space-x-4">
          <img :src="track.album.images[0]?.url" class="h-12 w-12 rounded" />
          <div>
            <div>{{ track.name }}</div>
            <div class="text-sm text-gray-500">{{ track.artists.map(artist => artist.name).join(', ') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <Title class="mb-4">Top Artists (last 7 days)</Title>

      <div class="grid gap-2 md:grid-cols-2">
        <SkeletonLoader v-if="!topArtists.length" v-for="top in 4" :key="top" type="lastfm" />
        <div v-else v-for="artist in topArtists" :key="artist.id" class="flex items-center space-x-4">
          <img :src="artist.images[0]?.url" class="h-12 w-12 rounded" />
          <div>{{ artist.name }}</div>
        </div>
      </div>
    </div>

    <div>
      <Title class="mb-4">Recent Songs</Title>

      <div class="grid gap-2 md:grid-cols-2">
        <SkeletonLoader v-if="!recentTracks.length" v-for="recent in 15" :key="recent" type="lastfm" />
        <div v-else v-for="track in recentTracks" :key="track.id" class="flex items-center space-x-4">
          <img :src="track.album.images[0]?.url" class="h-12 w-12 rounded" />
          <div>
            <div>{{ track.name }}</div>
            <div class="text-sm text-gray-500">{{ track.artists.map(artist => artist.name).join(', ') }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SpotifyWebApi from 'spotify-web-api-node'

export default {
  data() {
    return {
      user: null,
      totalPlays: null,
      accountAge: null,
      topTracks: [],
      topArtists: [],
      recentTracks: [],
    }
  },
  async created() {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    })

    try {
      const data = await spotifyApi.refreshAccessToken()
      spotifyApi.setAccessToken(data.body['access_token'])

      const [userInfo, topTracks, recentTracks] = await Promise.all([
        spotifyApi.getMe(),
        spotifyApi.getMyTopTracks({ limit: 6, time_range: 'short_term' }),
        spotifyApi.getMyRecentlyPlayedTracks({ limit: 15 }),
      ])

      this.user = userInfo.body
      this.totalPlays = userInfo.body.followers.total
      this.accountAge = new Date().getFullYear() - new Date(userInfo.body.birthdate).getFullYear()
      this.topTracks = topTracks.body.items
      this.recentTracks = recentTracks.body.items.map(item => item.track)
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<style scoped>
/* Add your styles here */
</style>
