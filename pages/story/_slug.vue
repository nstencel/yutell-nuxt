<template>
  <LoadingModule v-if="initialLoading" />
  <section v-else class="generic-wrap pad-search">
    <ReportStory v-if="reporting" :story="story" @closeModal="reporting = false" />
    <div class="container">
      <div class="video-wrap">
        <router-link
          v-if="story.won_contest_id"
          class="contest-ribbon"
          :to="'/contests/' + story.won_contest_id"
        >
          <img src="@/assets/svg/contest-ribbon.svg" />
        </router-link>
        <div v-if="story.processing == 1" class="up-img-wrap">
          <UploadProcessing />
          <img :src="story.cover_image" class="up-img" />
        </div>
        <div v-else>
          <button
            v-if="Object.entries(user).length > 0"
            class="report-btn"
            v-bind:class="{'move-right': storyWatched(story.id)}"
            @click="reporting = true"
          >
            <img src="@/assets/svg/report.svg" />
          </button>
          <Video :story="story" @refreshStory="getStory" />
          <div class="up-time" v-if="story.duration">{{story.duration}}</div>
        </div>
      </div>
      <VideoRatingBar :story="story" />
      <VideoInfo :story="story" :singleVideo="true" @refreshStory="getStory" />
      <Comments v-if="Object.entries(user).length > 0" :story="story" />
      <div v-else class="alert alert-gray mt-5">
        <router-link to="/create-account" class="alert-link">Create an account</router-link>&nbsp;or
        <router-link to="/login" class="alert-link">Login</router-link>&nbsp;to comment.
      </div>
      <div v-if="suggestedStories.length > 0" class="row mt-5">
        <div class="col-12">
          <h4 class="mt-5 mb-4 d-block">Up Next Related Videos</h4>
        </div>
        <div
          v-for="(story, index) in suggestedStories"
          :key="'suggested-story-' + story.id + index"
          class="col-12 col-md-6 mb-md-4"
          v-bind:class="{ 'sb-open': sidebarOpen }"
        >
          <div class="video-wrap">
            <div class="up-img-wrap" @click="goToStory(story.id)">
              <img :src="story.cover_image" class="up-img" />
              <div class="up-time" v-if="story.duration">{{story.duration}}</div>
            </div>
          </div>
          <VideoRatingBar :story="story" />
          <VideoInfo :story="story" :listing="true" :noAdmin="true" />
        </div>
      </div>
      <a
              href="#"
              @click.prevent="showMoreSuggested()"
              style="
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                border: solid 1px #20538D;
                text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
                -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);
                -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);
                background: #4479BA;
                color: #FFF;
                padding: 8px 12px;
                text-decoration: none;
              "
            >Show More</a>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import swal from "sweetalert2";

export default {
    async asyncData({ $http, params }) {
        // Grab the story with the id in the url
        const res = await $http.get("https://api.yutell.com/api/stories/" + params.slug);
        const data = await res.json();
        const story = data;
        return {story, initialLoading: false};
    },
  data() {
    return {
      initialLoading: false,
      id: 0,
      story: {},
      reporting: false,
      pulledStories: [],
      tempStories:[],
      suggestedStories: []

    };
  },
  mounted() {
    // Get the story
    console.log("change full path");
    //this.getStory();
  },
  computed: mapState({
    user: state => state.user,
    sidebarOpen: state => state.sidebarOpen
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
    showMoreSuggested() {
      this.getStory();
    },
    goToStory(story_id) {
      //window.location.replace("/story/" + id);
      this.$router.push({ name: "singleStory", params: {id: story_id} });
    },
    getStory() {
      // Grab the story with the id in the url
      console.log(this.$route);
      //this.$route.params.id
      this.$http
        .get("stories/" + this.$route.params.id)
        .then(response => {
            return response.json();
        })
        .then((data) => {
          this.story = data;
          this.initialLoading = false;
          this.getSuggestedStories();
          if (this.story.processing == 1) {
            const self = this;
            setTimeout(() => {
              self.getStory();
            }, 5000);
          }
        })
        .catch(() => {
          swal.fire({
            title: "Uh Oh!",
            text: "There was an error retrieving data.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Ok"
          });
        });
    },
    getSuggestedStories() {
      // Grab the story with the id in the url
      this.$http
        .post("stories/suggested/" + this.story.user_id + "/" + this.$route.params.id, {
              alreadyPulledStories: this.pulledStories
        })
        .then(response => {
          this.pulledStories = [];
          this.suggestedStories = this.tempStories.concat(response.body.stories);
          this.tempStories = this.suggestedStories;
          this.suggestedStories = Object.keys(this.suggestedStories).map(key => {
              return this.suggestedStories[key];
          })
          for(var i = 0; i < this.suggestedStories.length; i++){
            this.pulledStories.push(this.suggestedStories[i].id);
          }
          console.log("pulled: " + this.pulledStories);
          console.log(response.body.category);
        })
        .catch(() => {
          swal.fire({
            title: "Uh Oh!",
            text: "There was an error retrieving data.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Ok"
          });
        });
    }
  },
  layout: 'regular-page'
};
</script>


<!--
export default {
    async asyncData({ params }) {
      const story_id = params.slug // When calling /abc the slug will be "abc"
      return { story_id }
    }
  }
-->