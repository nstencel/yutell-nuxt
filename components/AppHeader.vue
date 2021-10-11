<template>
<section class="new-header">
  <div>
    <SearchForm v-if="!$route.meta.noSearch" ref="searchForm" @receiveResults="receiveResults" />
    <router-link to="/" class="nh-logo"><img src="@/assets/svg/logo.svg"></router-link>
  </div>
  <div class="float-right">
    <AccountMenu />
  </div>
  <div class="clearfix"></div>
</section>
</template>

<script>
import { mapState } from "vuex";
/*
import AccountMenu from "@/views/Frontend/Partials/AccountMenu";
import SearchForm from "@/views/Frontend/Partials/SearchForm";
*/
export default {
  props: ["noSearch"],
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    receiveResults(stories, authors, keywords, message) {
      this.$emit("receiveResults", stories, authors, keywords, message);
    }
  }
};
</script>