<template>
  <div class="single-story">
    <!--
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @play="clickPlay($event)"
    ></video-player>
    -->
    <div
      class="video-player-box"
      ref="videoPlayer"
      v-video-player:myVideoPlayer="playerOptions"
      :playsinline="true"
    ></div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["story"],
  data() {
    return {
      playerOptions: {
        controls: true,
        muted: false,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: this.story.video_url
          }
        ],
        poster: this.story.cover_image
      },
      viewed: false
    };
  },
  mounted() {
    console.log("This new:" + this.playerOptions.sources[0].src);
  },
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    clickPlay() {
      if (Object.entries(this.user).length > 0 && !this.viewed) {
        // Mark a view on this video, also record into history
        this.$http.post("stories/view/" + this.story.id, {}).then(response => {
          this.viewed = true;
          this.$store.commit("setUser", response.body);
          this.$emit("refreshStory");
        });
      }
    }
  }
};
</script>
