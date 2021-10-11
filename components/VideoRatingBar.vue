<template>
  <div>
    <div
      v-if="$route.name !== 'account' && storyWatched(story.id)"
      class="vr-watched float-right"
      v-bind:class="{'not-rated': story.rating_complete == 0}"
    >
      <i class="im im-check-mark-circle-o"></i>
    </div>
    <div v-if="story.rating_complete == 0" class="video-ratings empty">
      <div class="vr-rating float-left mr-3">UNRATED</div>
      <ul v-if="Object.entries(user).length > 0" class="video-btns float-right">
        <li>
          <a href="#" @click.prevent="addToWatchlist" v-bind:class="{active: inWatchList()}">
            <i class="im im-monitor-o"></i>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="addToFavorites" v-bind:class="{active: inFavorites()}">
            <i class="im im-heart"></i>
          </a>
        </li>
      </ul>
    </div>
    <div v-else class="video-ratings">
      <div class="vr-rating float-left mr-3">{{story.rating}}</div>
      <ul class="mood">
        <li class="mr-2">
          <img src="@/assets/svg/smilyface.svg" />
        </li>
        <li>
          <star-rating
            :increment=".5"
            v-model="story.funny"
            :max-rating="3"
            :show-rating="false"
            :star-size="25"
            :active-color="'#2c9dc5'"
            :inactive-color="'#999999'"
            :read-only="true"
          ></star-rating>
        </li>
      </ul>
      <ul class="mood">
        <li class="mr-2">
          <img src="@/assets/svg/info.svg" />
        </li>
        <li>
          <star-rating
            :increment=".5"
            v-model="story.interesting"
            :max-rating="3"
            :show-rating="false"
            :star-size="25"
            :active-color="'#2c9dc5'"
            :inactive-color="'#999999'"
            :read-only="true"
          ></star-rating>
        </li>
      </ul>

      <ul class="mood">
        <li class="mr-2">
          <img src="@/assets/svg/heart.svg" />
        </li>
        <li>
          <star-rating
            :increment=".5"
            v-model="story.touching"
            :max-rating="3"
            :show-rating="false"
            :star-size="25"
            :active-color="'#2c9dc5'"
            :inactive-color="'#999999'"
            :read-only="true"
          ></star-rating>
        </li>
      </ul>
      <div class="vr-rating yu float-right ml-3">YuRated</div>
      <ul class="video-btns float-right">
        <li>
          <a href="#" @click.prevent="addToWatchlist" v-bind:class="{active: inWatchList()}">
            <i class="im im-monitor-o"></i>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="addToFavorites" v-bind:class="{active: inFavorites()}">
            <i class="im im-heart"></i>
          </a>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import swal from "sweetalert2";
export default {
  props: ["story"],
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    storyWatched(story_id) {
      let watched = false;
      if (Object.entries(this.user).length > 0) {
        this.user.history.forEach(story => {
          if (story_id == story.story_id) {
            watched = true;
          }
        });
      }
      return watched;
    },
    inWatchList() {
      // Is this story in my watchlist?
      let inList = false;
      if (Object.entries(this.user).length > 0) {
        if (this.user.watch.length > 0) {
          this.user.watch.forEach(watch => {
            if (watch.story_id == this.story.id) {
              inList = true;
            }
          });
        }
      }
      return inList;
    },
    inFavorites() {
      // Is this story in my watchlist?
      let inList = false;
      if (Object.entries(this.user).length > 0) {
        if (this.user.watch.length > 0) {
          this.user.favorites.forEach(fav => {
            if (fav.story_id == this.story.id) {
              inList = true;
            }
          });
        }
      }
      return inList;
    },
    addToWatchlist() {
      // Is this story in my watchlist?
      let inList = false;
      this.user.watch.forEach(watch => {
        if (watch.story_id == this.story.id) {
          inList = true;
        }
      });

      if (inList) {
        swal
          .fire({
            title: "Are you sure?",
            text: "This will remove this story from your watchlist.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ok",
            cancelButtonText: "Cancel"
          })
          .then(result => {
            if (result.value) {
              this.postToWatchlist();
            }
          });
      } else {
        swal
          .fire({
            title: "Confirm",
            text: "Add this story to my watchlist.",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Ok",
            cancelButtonText: "Cancel"
          })
          .then(result => {
            if (result.value) {
              this.postToWatchlist();
            }
          });
      }
    },
    addToFavorites() {
      // Is this story in my watchlist?
      let inList = false;
      this.user.favorites.forEach(fav => {
        if (fav.story_id == this.story.id) {
          inList = true;
        }
      });

      if (inList) {
        swal
          .fire({
            title: "Are you sure?",
            text: "This will remove this story from your favorites.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ok",
            cancelButtonText: "Cancel"
          })
          .then(result => {
            if (result.value) {
              this.postToFavorites();
            }
          });
      } else {
        swal
          .fire({
            title: "Confirm",
            text: "Add this story to my favorites.",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Ok",
            cancelButtonText: "Cancel"
          })
          .then(result => {
            if (result.value) {
              this.postToFavorites();
            }
          });
      }
    },
    postToWatchlist() {
      this.$http.post("stories/watchlist/" + this.story.id, {}).then(() => {
        // Grab the user
        this.$http
          .get("user")
          .then(response => {
            this.$store.commit("setUser", response.body);
          })
          .catch(response => {});
      });
    },
    postToFavorites() {
      this.$http.post("stories/favorites/" + this.story.id, {}).then(() => {
        // Grab the user
        this.$http
          .get("user")
          .then(response => {
            this.$store.commit("setUser", response.body);
          })
          .catch(response => {});
      });
    }
  }
};
</script>