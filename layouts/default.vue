<template>
<div id="app">
  
  <transition-group name="fade" mode="out-in">
      <Sidebar key="trans-sb" />
      <div key="trans-mf" class="main-frame" v-bind:class="{ 'sb-open': sidebarOpen }">
        <!--<AppHeader key="trans-header" text-from-app="Hi from parent"/>-->
        <button class="sb-open-btn" v-bind:class="{ show: !sidebarOpen }" @click="openSidebar">
          <i class="im im-menu"></i>
        </button>
        <!--<router-view key="trans-rv" />-->
        <Nuxt :key="$route.fullPath" />
      </div>
    </transition-group>
  
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
      
    ...mapState({
        sidebarOpen: state => state.sidebarOpen,
        signupLayout: state => state.signupLayout,
        adminLayout: state => state.adminLayout,

        //* New - 6/01/2021 
        homeLayout: state => state.homeLayout
    }),
    /*
    ...mapState("sidebarOpen", ["sidebarOpen"]),
    ...mapState("signUpLayout", ["signupLayout"]),
    ...mapState("adminLayout", ["adminLayout"]),
    ...mapState("homeLayout", ["sidebarOpen"])
    */
  },
  methods: {
    openSidebar() {
      this.$store.commit("setSidebarOpen", true);
    }
  }
};
</script>

