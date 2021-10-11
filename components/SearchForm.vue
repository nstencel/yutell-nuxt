<template>
  <div class="float-left">
    <div v-if="!searching">
      <button class="btn btn-default st-btn" @click="openSearch">
        <i class="im im-magnifier mr-0"></i>
        <span class="d-none d-md-inline ml-3">Search On the Site</span>
      </button> 
    </div>
    <div v-else class="custom-modal search">
      <button class="close-search" @click="closeSearch">
        <i class="im im-x-mark"></i>
      </button>
      <div class="modal-content">
        <div class="container-fluid pt-2">
          <div v-if="$route.meta.contest" class="form-group mb-3 search-group">
            <input
              type="text"
              v-model="search_term"
              @keyup.enter="searchContests"
              class="form-control"
              placeholder="Search..."
            />
          </div>
          <div v-else>
            <div class="form-group search-group">
              <input type="text" v-model="search_term" class="form-control" placeholder="Search..." />
            </div>
            <div class="form-group mb-3 search-group">
              <select v-model="cat_id" class="form-control">
                <option :value="null">All Categories</option>
                <option
                  v-for="cat in categories"
                  :key="'cat-'+cat.id"
                  :value="cat.id"
                >{{cat.category}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="container-fluid pb-2">
          <div class="row">
            <div class="col-12">
              <SearchFilters :ratings="ratings"/>
              <button
                v-if="$route.meta.contest"
                class="btn btn-lg btn-block btn-primary"
                type="button"
                @click="searchContests"
              >Search</button>
              <button
                v-else
                class="btn btn-lg btn-block btn-primary"
                type="button"
                @click="testSearch(true); press_search = true;"
              >Search For this</button>
              <div class="text-center mt-2">
                <a href="#" @click.prevent="resetSearch">reset search</a>
              </div>
            </div>
            <!-- <div v-if="authors.length > 0" class="col-12">
              <h2 class="mb-3">Channels</h2>
              <div v-for="author in authors" :key="'auth-' + author.id" class="ind-author">
                <div class="author-wrap">
                  <div class="aw-img">
                    <img v-if="author.profile.profile_image" :src="author.profile.profile_image" />
                    <img v-else src="@/assets/img/default-user.png" />
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
              <h2 class="mb-3">Stories</h2>
            </div>
            <div v-if="stories.length == 0" class="col-12">
              <div class="alert alert-info">No stories added yet.</div>
            </div>
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
                    @click.prevent="activePage = index"
                    v-bind:class="{ active: index == activePage }"
                  >{{ index + 1 }}</a>
                </li>
              </ul>
            </div>-->
          </div>
        </div>
      </div>
    </div>

    <div v-if="press_search" class="search-overlay" style="position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: gray;
          opacity: 0.6;
          z-index: 10000;">
      <img src="@/assets/gif/loading.gif" style="position: fixed;
          left: 50%;
          transform: translateX(-50%);
          top: 45vh; 
          z-index:13000;"/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import SearchFilters from "@/views/Frontend/Partials/SearchFilters";
import swal from "sweetalert2";
export default {
  data() {
    return {
      search_term: "",
      message: "",
      keywords:[],
      searching: false,
      press_search: false,
      stories: [],
      categories: [],
      cat_id: null,
      activePage: 0,
      authors: [],
      ratings: {
        mood: {
          funny: 0,
          interesting: 0,
          touching: 0,
        },
        g: false,
        pg: false,
        pg13: false,
        r: false,
      },
    };
  },
  computed: mapState({
    config: (state) => state.config,
  }),
  mounted() {
    this.getCategories();
  },
  methods: {
    openSearch() {
      if (this.$route.name !== "home") {
        window.location.replace("/?q=true");
      } else {
        this.searching = true;
      }
    },
    closeSearch() {
      this.searching = false;
    },
    resetSearch() {
      this.search_term = "";
      this.cat_id = null;
      this.ratings = {
        mood: {
          funny: 0,
          interesting: 0,
          touching: 0,
        },
        g: false,
        pg: false,
        pg13: false,
        r: false,
      };
    },
    getCategories() {
      this.$http.get("https://api.yutell.com/api/categories?byCount=true")
      .then(response => {
        return response.json();
      })
      .then((data) => {
        this.categories = data;
        if (this.$route.query.q == "true") {
          console.log(this.$route);
          this.searching = true;
        }
      });
    },
    searchStories() {
      // if(this.$route.meta.contest)
      if (this.search_term) {
        window.location.href = "/?q=" + this.search_term;
      } else {
        window.location.href = "/?q=";
      }
    },
    searchContests() {
      if (this.search_term) {
        window.location.href =
          "/contests/entries/" +
          this.$route.params.id +
          "?q=" +
          this.search_term;
      } else {
        window.location.href =
          "/contests/entries/" + this.$route.params.id + "?q=";
      }
    },
    filterStoriesByCategory(cat_id) {
      this.$router.push({ query: { category: cat_id } });
      this.activeCategory = cat_id;
      this.getStories();
    },
    getStories() {
      let url = "stories";
      if (this.$route.query.category) {
        url = "stories?category=" + this.$route.query.category;
      } else if (this.$route.query.q) {
        url = "stories?q=" + this.$route.query.q;
      }

      // Define a function before calling the ajax. This will chunk the results into pages
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      // Grab the story with the id in the url
      this.$http
        .get(url)
        .then((response) => {
          this.stories = chunk(
            response.body.stories,
            this.config.stories_per_page
          );
          this.authors = response.body.authors;
          this.initialLoading = false;
        })
        .catch(() => {
          swal.fire({
            title: "Uh Oh!",
            text: "There was an error retrieving data.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Ok",
          });
        });
    },
    filterSearch(fromButton) {
      // Define a function before calling the ajax. This will chunk the results into pages
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      // Grab the story with the id in the url
      this.$http
        .post("stories/filtered", {
          ratings: this.ratings,
          q: this.search_term,
          cat_id: this.cat_id,
        })
        .then((response) => {
          this.stories = chunk(
            response.body.stories,
            this.config.stories_per_page
          );
          this.authors = response.body.authors;
          this.$emit("receiveResults", this.stories, this.authors);
          console.log(response.body.message);
          if (fromButton) {
            this.closeSearch();
          }
        })
        .catch(() => {
          swal.fire({
            title: "Uh Oh!",
            text: "There was an error retrieving data.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Ok",
          });
        });
    }, 
    testSearch(fromButton) {
      this.$http.post("stories/test", {
        ratings: this.ratings,
        q: this.search_term,
        cat_id: this.cat_id,
      })
      .then((response) => {
        this.message = response.body.message;
        this.stories = response.body.stories;
        this.authors = response.body.authors;
        this.keywords = response.body.keywords;
        this.press_search = false;
        this.$emit("receiveResults", this.stories, this.authors, this.keywords, this.message);
        if (fromButton) {
            this.closeSearch();
        }
      })
      .catch(() => {
          swal.fire({
            title: "Uh Oh!",
            text: "There was an error retrieving data.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Ok",
          });
          this.press_search = false;
        });
    }

  },
};



      /*
        .then((response) => {
          //this.message = response.body.message;
          console.log(response.body.message);
          alert(response.body.message);
          if (fromButton) {
            this.closeSearch();
          }
        })
        .catch(() => {
          swal.fire({
            title: "Uh Oh!",
            text: "There was a wee error retrieving data.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Ok",
          });
        });

        
        */

</script>