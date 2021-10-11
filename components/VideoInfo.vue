<template>
  <div class="video-info-module">
    <StoryStats
      v-if="Object.entries(statStory).length > 0"
      :story="statStory"
      @closeModal="statStory = {}"
    />
    <button v-if="onWatchlist" class="remove-fav" @click.prevent="removeWatchlistItem(story.id)">
      <i class="im im-check-mark"></i>
    </button>
    <button v-if="onFavorites" class="remove-fav" @click.prevent="removeFavorite(story.id)">
      <i class="im im-check-mark"></i>
    </button>
    <button
      v-if="!noAdmin && story.user_id == user.id && listing"
      class="view-stats"
      @click.prevent="viewStats(story)"
    >
      <i class="im im-bar-chart"></i>
      <span>stats</span>
    </button>
    <div class="vim-profile" ref="vimg" id="vimg" @click="linkTo">
      <img
        v-if="
          story.creator.hasOwnProperty('profile') &&
            story.creator.profile.profile_image
        "
        :src="story.creator.profile.profile_image"
      />
      <img v-else src="@/assets/img/default-user.png" />
    </div>
    <div class="vim-content" ref="vcontent">
      <div class="video-title">
        <router-link
          :to="'/story/' + story.id"
        >{{ story.creator.channel_username }} | {{ story.title }}</router-link>
      </div>
      <div v-if="listing" class="video-description">
        {{ truncate(story.description) }}
        <span
          v-if="onSubs"
          class="d-block sub-time"
        >Uploaded on {{ formatDate(story.created_at) }}</span>
      </div>
      <div v-else class="video-description">{{ story.description }}</div>
      <div class="video-actions">
        <ul class="va-ac">
          <li>
            <a href="#">
              <i class="im im-eye"></i>
              {{ story.views }}
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="likeVideo" v-bind:class="{ active: userLiked() }">
              <i class="im im-thumb-up"></i>
              {{ story.likes.length }}
            </a>
          </li>
        </ul>
        <!--
        <div v-if="!listing" class="float-right">
          <ShareNetwork
            network="facebook"
            :url="config.base_url + '/story/' + story.id"
            title="HEllo"
            :description="story.description"
            class="mr-2"
          >
            <i class="im im-facebook color-fb"></i>
          </ShareNetwork>
          <ShareNetwork
            network="twitter"
            :url="config.base_url + '/story/' + story.id"
            :title="story.title"
            :description="story.description"
            class="mr-2"
            style="position:relative;top:2px;"
          >
            <i class="im im-twitter color-tw"></i>
          </ShareNetwork>
          <ShareNetwork
            network="email"
            :url="config.base_url + '/story/' + story.id"
            :title="story.title"
            :description="story.description"
            style="position:relative;top:3px;"
          >
            <i class="im im-mail"></i>
          </ShareNetwork>
        </div>
        -->
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import swal from "sweetalert2";
//import StoryStats from "@/views/Frontend/Stories/Partials/StoryStats";
import moment from "moment";
export default {
  props: [
    "story",
    "listing",
    "noAdmin",
    "onWatchlist",
    "singleVideo",
    "onFavorites",
    "onSubs"
  ],
  data() {
    return {
      statStory: {}
    };
  },
  
  metaInfo() {
      return {
        meta: [
            // Twitter Card
            {name: 'twitter:card', content: 'summary'},
            {name: 'twitter:title', content: 'Vue Social Cards Example'},
            {name: 'twitter:description', content: 'Vue sample site showing off Twitter and Facebook Cards.'},
            // image must be an absolute path
            {name: 'twitter:image', content: this.logo},
            // Facebook OpenGraph
            {property: 'og:title', content: this.story.title},
            {property: 'og:site_name', content: 'Yutell'},
            {property: 'og:type', content: 'website'},
            {property: 'og:image', content:  this.story.cover_image},
            {property: 'og:description', content: this.story.description}
        ]
      }
  },
  
  computed: mapState({
    user: state => state.user,
    config: state => state.config
  }),
  methods: {
    formatDate(dateVal) {
      const dateStr = moment(dateVal).format("MMM Qo, YYYY");
      const timeStr = moment(dateVal).format("h:mmA");
      return dateStr + " at " + timeStr;
    },
    linkTo() {
      let url = "/story/" + this.story.id;
      if (this.singleVideo) {
        url = "/channel/" + this.story.creator.channel_username;
      }
      this.$router.push({ path: url });
    },
    removeWatchlistItem(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "This video will be removed from your watchlist.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Remove From Watchlist",
          cancelButtonText: "Cancel"
        })
        .then(result => {
          if (result.value) {
            this.$http
              .delete("stories/watchlist/" + id)
              .then(response => {
                swal.fire({
                  title: "Success!",
                  text: "The item has been removed from your watchlist.",
                  icon: "success",
                  showCancelButton: false,
                  confirmButtonText: "Ok"
                });
                this.$emit("refreshStory");
              })
              .catch(() => {
                swal.fire({
                  title: "Error!",
                  text: "There was an error retrieving data.",
                  icon: "error",
                  showCancelButton: false,
                  confirmButtonText: "Ok"
                });
              });
          }
        });
    },
    removeFavorite(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "This video will be removed from your favorites.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Remove From Favorites",
          cancelButtonText: "Cancel"
        })
        .then(result => {
          if (result.value) {
            this.$http
              .delete("stories/favorites/" + id)
              .then(response => {
                swal.fire({
                  title: "Success!",
                  text: "The item has been removed from your favorites.",
                  icon: "success",
                  showCancelButton: false,
                  confirmButtonText: "Ok"
                });
                this.$emit("refreshStory");
              })
              .catch(() => {
                swal.fire({
                  title: "Error!",
                  text: "There was an error retrieving data.",
                  icon: "error",
                  showCancelButton: false,
                  confirmButtonText: "Ok"
                });
              });
          }
        });
    },
    viewStats(story) {
      this.statStory = story;
    },
    truncate(input) {
      if (input.length > 70) return input.substring(0, 70) + "...";
      else return input;
    },
    userLiked() {
      let liked = false;
      this.story.likes.forEach(like => {
        if (like.user_id == this.user.id) {
          liked = true;
        }
      });
      return liked;
    },
    likeVideo() {
      if (Object.entries(this.user).length > 0) {
        // Like this video
        this.$http.post("stories/like/" + this.story.id, {}).then(() => {
          this.$emit("refreshStory");
        });
      }
    }
  }
};
</script>
