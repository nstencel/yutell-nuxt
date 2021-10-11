<template>
<div>
  <AppHeader @receiveResults="updateStories" />
  <LoadingModule v-if="initialLoading" />
  <section v-else class="generic-wrap pad-search">
    <div class="container-fluid">
      <div v-if="initialLoading" class="mt-2 inline-content-loader alert alert-gray">
        <img src="@/assets/svg/bars.svg" />
      </div>
      <div v-if="initialLoading" class="mt-2 inline-content-loader alert alert-gray">
        <img src="@/assets/svg/bars.svg" />
      </div>
      <div v-else class="story-list">

        <div class="row">
          
          <div v-if="authors.length > 0" class="col-12">
            <h2 class="mb-3">Channels</h2>
            <div v-for="author in authors" :key="'auth-' + author.id" class="ind-author">
              <div class="author-wrap">
                <div class="aw-img">
                  <!--<img v-if="author.profile.profile_image" :src="author.profile.profile_image" />
                  <img v-else src="@/assets/img/default-user.png" />-->
                  <img src="@/assets/img/default-user.png" />
                </div>
                <div class="aw-dets">
                  <div class="awd-title">{{ author.channel_username }}</div>
                  <ul class="awd-info">
                    <li>
                      {{ author.subs.length }}
                      <span v-if="author.subs.length == 1">subscription</span>
                      <span v-else>subscriptions</span>
                    </li>
                    <li>
                      {{ author.subs.length }}
                      <span v-if="author.stories.length == 1">story</span>
                      <span v-else>stories</span>
                    </li>
                  </ul>
                </div>
                <div class="aw-btn">
                  <router-link
                    :to="'/channel/' + author.channel_username"
                    class="btn btn-primary"
                  >View Channel</router-link>
                </div>
              </div>
            </div>
          </div>
          

          <div class="col-12">
            <h2 class="mb-3">Stories {{textFromApp}}</h2>
          </div>
          <div v-if="stories.length == 0" class="col-12">
            <div class="alert alert-info">No stories match that criteria.</div>
          </div>

          <!--
          <div
            v-else
            v-for="story in stories[activePage]"
            :key="'story-' + story.id"
            class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-md-4"
            v-bind:class="{ 'sb-open': sidebarOpen }"
          >
            <div class="video-wrap">
              <div class="up-img-wrap" @click="$router.push({ path: '/story/' + story.id })">
                <img :src="story.cover_image" class="up-img" />
                <div class="up-time" v-if="story.duration">{{story.duration}}</div>
              </div>
            </div>
            <VideoRatingBar :story="story" />
            <VideoInfo :story="story" :listing="true" :noAdmin="true" @refreshStory="getStories" />
          </div>



          <div v-if="stories.length > 1" class="col-12 text-center">
            <ul class="cs-pagination">
              <li v-for="(value, index) in stories" :key="'pg-' + index">
                <a
                  href="#"
                  @click.prevent="activePage = index; scrollToTop()"
                  v-bind:class="{ active: index == activePage }"
                >{{ index + 1 }}</a>
              </li>
            </ul>
          </div>
          -->

          <div
            v-else
            v-for="index in ((numberMore * showMoreNumber) - takeAway)"
            :key="'stories-' + index*numTimesShowMoreClicked"
            class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-md-4"
            v-bind:class="{ 'sb-open': sidebarOpen }"
            v-for-loop-callback="{index: index, length: ((numberMore * showMoreNumber) - takeAway), callback: callback}"
          >
            <div class="video-wrap" :id="'story-' + index">
              <div class="up-img-wrap" @click="$router.push({ path: '/story/' + stories[index-1].id })">
                <img :src="stories[index-1].cover_image" class="up-img" />
                <div class="up-time" v-if="stories[index-1].duration">{{stories[index-1].duration}}</div>
              </div>
            </div>
            <VideoRatingBar :story="stories[index-1]" />
            <VideoInfo :story="stories[index-1]" :listing="true" :noAdmin="true" @refreshStory="getStories" />
          </div>


          <div v-if="stories.length > 25" class="col-12 text-center">
            <a
              href="#"
              @click.prevent="pullOrShowMore()"
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


        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { mapState } from "vuex";
import swal from "sweetalert2";

export default {
  props: ['textFromApp'],
  layout: 'default',
  async asyncData({ $http }) {
      /*
        const chunk = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

        // Temp vars for first call
        const ratings = {
            mood: {
            funny: 0,
            interesting: 0,
            touching: 0
            },
            g: false,
            pg: false,
            pg13: false,
            r: false
        };

        // Grab the stories
        await $http
            .post("https://api.yutell.com/api/stories/filtered", {
            timesButtonPushed: 1,
            storiesAlreadyPulled: [],
            ratings: ratings,
            q: "",
            cat_id: null
            })
            .then(response => {
                return response.json();
            })
            .then(function(data) {
                tempStories = [];
                pulledStories = [];
                stories = tempStories.concat(data.stories); // Keep track of all stories that have been pulled
                tempStories = stories;
                authors = data.authors;
                initialLoading = false;
                for(var i = 0; i < stories.length; i++){
                    pulledStories.push(stories[i].id);
                }
                return{ tempStories, pulledStories, stories, authors, initialLoading }; 
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
            */
  },
  data() {
    return {
      pullBlockNumber: 100,
      numTimesShowMoreClicked: 1,
      numberTimesPullButtonClicked: 1,
      pulledStories: [],
      jumpTo: "",
      jumpToNext: "",
      showMoreNumber: 1,
      numberMore: 25,
      takeAway: 0,
      initialLoading: true,
      keywords: [],
      tempStories: [],
      stories: [],
      authors: [],
      cat_id: null,
      activePage: 0,
      categories: []
    };
  },
  directives: {
    // directives are not in the 'this' scope so if you want to set any of your variables (like this.jumpTo) to one of the 
    // binding values you have to pass said values to a method function and do it from there.
    forLoopCallback(el, binding){
      let element = binding.value;
      if(element.index == element.length){
        element.callback(element.index);
      }
    },
  },
  mounted() {
    // Make sure admin mode is off
    this.$store.commit("setAdminLayout", false);

    // If the search term is empty, go back home
    this.getStories();

    console.log("Something New");

    /*
    console.log("Testing axios 3");
    let data;
    axios.get('https://api.yutell.com/api/stories/story-count')
    .then(response => {
      // JSON responses are automatically parsed.
      data = response.data;
      console.log(data);
    })
    .catch(e => {
      console.log("error1");
    })
    */
    // document.addEventListener('backbutton', this.previousStoryPage);
  },
  computed: mapState({
    user: state => state.user,
    sidebarOpen: state => state.sidebarOpen,
    config: state => state.config
  }),
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    callback(index) {
      this.jumpToNext = "story-"+index;
      console.log("Loop complete. Jump to: " + this.jumpToNext);
      // once you're inside setTimeout 'this' doesn't correspond with your Vue instance. That's why you have to set a variable equal to this outside of the 
      // setTimeout and use said variable inside it
      if(this.jumpTo !== "") {
        var v = this;
        setTimeout(function(){
          document.getElementById(v.jumpTo).scrollIntoView();
        }, 100);
      }
      
    },
    pullOrShowMore(){
      if(this.numTimesShowMoreClicked % 4 === 0) {
        this.getStories();
      } else {
        this.evaluate();
      }
      this.numTimesShowMoreClicked++;
    },
    evaluate(){
      this.jumpTo = this.jumpToNext;
      this.showMoreNumber += 1;
      if(this.stories.length < (this.numberMore * this.showMoreNumber)){
        this.takeAway = (this.numberMore * this.showMoreNumber) - this.stories.length;
      }
    },
    updateStories(stories, authors, keywords, message) {
      /*
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
        
      this.stories = chunk(
            stories,
            this.config.stories_per_page
          );
          */
      if (stories.length < (this.numberMore * this.showMoreNumber)) {
        this.takeAway = (this.numberMore * this.showMoreNumber) - stories.length;
      }
      this.stories = stories;
      this.authors = authors;
      this.keywords = keywords;
      console.log("Stories" + JSON.stringify(this.stories));
      console.log("Users" + JSON.stringify(this.authors));
      console.log('Keyword Story IDs: ' + JSON.stringify(this.keywords));
      console.log('Story ID from Keyword: ' + message);
      console.log(stories[0]);
    },
    receiveResults(stories, authors, message) {
      this.stories = stories;
      this.authors = authors;
      console.log(message);
      console.log(authors);
      console.log(stories);
    },
    filterStoriesByCategory(cat_id) {
      this.$router.push({ query: { category: cat_id } });
      this.activeCategory = cat_id;
      this.getStories();
    },
    testDurability() {
      this.$http
        .post("stories/test-data-durability", {
          pullBlockNumber: this.pullBlockNumber,
          numberTimesPullButtonClicked: this.numberTimesPullButtonClicked
        })
        .then((response) => {
          console.log("Here is the count to pull: " + response.body);
          this.numberTimesPullButtonClicked++;
        });
    },
    async getStories() {
      // Define a function before calling the ajax. This will chunk the results into pages
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );

      // Temp vars for first call
      const ratings = {
        mood: {
          funny: 0,
          interesting: 0,
          touching: 0
        },
        g: false,
        pg: false,
        pg13: false,
        r: false
      };

      // Grab the stories
      await this.$http
        .post("https://api.yutell.com/api/stories/filtered", {
          timesButtonPushed: this.numberTimesPullButtonClicked,
          storiesAlreadyPulled: this.pulledStories,
          ratings: ratings,
          q: "",
          cat_id: null
        })
        .then(response => {
            return response.json();
        })
        .then((data) => {
          console.log("This is the message" + data.message);
          console.log(data.stories);
          console.log("Num Times 7:" + this.numberTimesPullButtonClicked);
          this.numberTimesPullButtonClicked++;
          /*
          this.stories = chunk(
            response.body.stories,
            this.config.stories_per_page
          );
          */
          this.stories = this.tempStories.concat(data.stories); // Keep track of all stories that have been pulled
          this.tempStories = this.stories;
          this.authors = data.authors;
          this.initialLoading = false;
          for(var i = 0; i < this.stories.length; i++){
            this.pulledStories.push(this.stories[i].id);
          }
          return "OK";
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
  }
};
</script>