<template>
  <div class="sidebar" v-bind:class="{ open: sidebarOpen }">
    <button class="close-sb" @click.prevent="closeSidebar('')">
      <i class="im im-x-mark"></i>
    </button>
    <div class="main-logo">
      <a href="#" @click.prevent="closeSidebar('/')">
        <img src="@/assets/svg/logo.svg" />
      </a>
    </div>
    <div class="sb-wrap">
      <div class="menu-scroller">
        <ul class="main-nav">
          <li>
            <a href="#" @click.prevent="closeSidebar('/')">
              <img src="@/assets/svg/home.svg" />
              <img src="@/assets/svg/home-blue.svg" class="hover-img" />Home
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="closeSidebar('/contests')">
              <img src="@/assets/svg/trophy.svg" />
              <img src="@/assets/svg/trophy-blue.svg" class="hover-img contests" />Contests
            </a>
          </li>
          <!--
          <li>
            <a to="/categories">
              <img src="@/assets/svg/list.svg" />
              <img src="@/assets/svg/list-blue.svg" class="hover-img cats" />Categories
            </a>
          </li>
          -->
          <li v-if="Object.entries(user).length > 0">
            <a href="#" @click.prevent="closeSidebar('/account/subscriptions')">
              <img src="@/assets/svg/tape.svg" />
              <img src="@/assets/svg/tape-blue.svg" class="hover-img subs" />Subscriptions
            </a>
          </li>
          <li v-if="Object.entries(user).length > 0">
            <a href="#" @click.prevent="closeSidebar('/account/money')">
              <img src="@/assets/svg/money.svg" />
              <img src="@/assets/svg/money-blue.svg" class="hover-img money" />Gifts &amp; Donations
            </a>
          </li>
          <li v-if="Object.entries(user).length > 0 && user.rater == 1">
            <a href="#" @click.prevent="closeSidebar('/rate-videos')">
              <img class="rater" src="@/assets/svg/rater.svg" />
              <img class="hover-img rater" src="@/assets/svg/rater-blue.svg" /> Rater Dashboard
            </a>
          </li>
          <li v-if="Object.entries(user).length > 0 && user.contest_invites.length > 0">
            <a href="#" @click.prevent="closeSidebar('/contests/admin')">
              <img src="@/assets/svg/contestadmin.svg" />
              <img src="@/assets/svg/contestadmin-blue.svg" class="hover-img contestadmin" /> Contest Admin
            </a>
          </li>
        </ul>
        <h4>Yutell</h4>
        <ul class="main-nav standard">
          <li v-for="item in menuItems" :key="item.slug">
            <a href="#" @click.prevent="closeSidebar(config.base_url + item.slug)">
              <i class="im im-angle-right"></i>
              {{ item.title }}
            </a>
          </li>
          <li>
            <a href="#" key="donate-1" class="donate" @click.prevent="closeSidebar('/donate')">
              <i class="im im-angle-right"></i>Donate
            </a>
          </li>
        </ul>
        <h4>My Profile</h4>
        <div v-if="Object.entries(user).length == 0">
          <a
            href="#"
            class="btn btn-primary btn-lg btn-block"
            @click.prevent="closeSidebar('/login')"
          >
            <i class="im im-user-male"></i> Sign Up / Login
          </a>
        </div>
        <div v-else>
          <ul class="main-nav">
            <!-- <li v-if="Object.entries(user.contest_entries).length > 0" style="margin-left:3.5px;">
              <a href="#" @click.prevent="closeSidebar('/my-contests')">
                <img src="@/assets/svg/ribbon.svg" />
                <img src="@/assets/svg/ribbon-blue.svg" class="hover-img mycontests" />My Contests
              </a>
            </li> -->
            <li>
              <a href="#" @click.prevent="closeSidebar('/account')">
                <img src="@/assets/svg/account.svg" />
                <img src="@/assets/svg/account-blue.svg" class="hover-img account" />My Channel
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="closeSidebar('/account/history')">
                <img src="@/assets/svg/history.svg" />
                <img src="@/assets/svg/history-blue.svg" class="hover-img history" />History
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="closeSidebar('/account/favorites')">
                <img src="@/assets/svg/favorites.svg" />
                <img src="@/assets/svg/favorites-blue.svg" class="hover-img favorites" />Favorites
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="closeSidebar('/account/watchlist')">
                <img src="@/assets/svg/watchlist.svg" />
                <img src="@/assets/svg/watchlist-blue.svg" class="hover-img watchlist" />Watch Later
              </a>
            </li>
          </ul>
          <a
            href="#"
            class="btn btn-primary btn-lg btn-block"
            @click.prevent="closeSidebar('/account/upload')"
          >
            <i class="im im-cloud-upload"></i> Upload
          </a>
        </div>
      </div>
    </div>
    <div v-if="Object.entries(user).length > 0" class="sb-footer">
      <div class="sbf-img">
        <a href="#" @click.prevent="closeSidebar('/account')">
          <img v-if="user.profile.profile_image" :src="user.profile.profile_image" />
          <img v-else src="@/assets/img/default-user.png" />
        </a>
      </div>
      <div class="sbf-logout text-right">
        <a
          href="#"
          class="btn btn-lg btn-block btn-default"
          @click.prevent="closeSidebar('/logout')"
        >
          <i class="im im-lock-open"></i> Logout
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search_term: "",
      menuItems: [],
    };
  },
  computed: mapState({
    sidebarOpen: (state) => state.sidebarOpen,
    user: (state) => state.user,
    config: (state) => state.config,
  }),
  mounted() {
    this.wpMenus();
  },
  methods: {
    closeSidebar(url) {
      this.$store.commit("setSidebarOpen", false);
      setTimeout(() => {
        if (url) {
          console.log("assign change");
          window.location.assign(url);
        }
      }, 500);
    },
    wpMenus() {
      this.$http
        .get("https://yutellcms.422clients.com/wp-json/menus/v1/menus/menu")
        .then((response) => {
          this.menuItems = response.body.items;
        });
    },
  },
};
</script>
