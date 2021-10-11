import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const state = () => ({
    user: {},
    signupLayout: false,
    adminLayout: false,
    sidebarOpen: false,
    homeLayout: false,
    cloudinary: {
        cloud_name: "deoxp0sll",
        base_upload_preset: "isluis7a",
        channel_header_upload_preset: "isluis7a",
        profile_image_upload_preset: "isluis7a",
        audio_upload_preset: "isluis7a",
        cover_image_upload_preset: "isluis7a",
    },
    config: {
        base_url: "https://www.yutell.com/",
        expedited_cost: 3.99,
        stories_per_page: 25,
        //stripe_publishable_key: "pk_test_aBZY7s3b36QEmZv2kvrJNYq7007qgaspZE",
        stripe_publishable_key: "pk_test_51H7RDAFKhKZiO98cWGLTuXZItB9SQEA30dWYvmd8uAsr8h99hbY5mdirPX4p1XTwmc9HVCeXPJ8HeOwTHHJcv1Bh00nVKq1usv",
        stripe_redirect: "https://www.yutell.com/account",
        //stripe_connect_client_id: "ca_HCk7HtHBIN46vqBgkRxbjDufpK3ckmAd",
        stripe_connect_client_id: "ca_Jm0b4odsY3KkOnD2z2bfCdfFNaLyaQZg",
        support_email: "hello@yutell.com",
        wp_api_url: "https://cms.yutell.com/wp-json/wp/v2",
        wp_menu_url: "https://cms.yutell.com/wp-json/menus/v1/menus/",
    },
});

export const getters = {
    getUser: (state) => {
        return state.user;
    },
    getSignupLayout: (state) => {
        return state.signupLayout;
    },
    getSidebarOpen: (state) => {
        return state.sidebarOpen;
    },
    getCloudinary: (state) => {
        return state.cloudinary;
    },
    getConfig: (state) => {
        return state.config;
    },
    // NEW - 07/30/2021 
    getHomeLayout: (state) => {
        return state.homeLayout;
    },
    getAdminLayout: (state) => {
        return state.adminLayout;
    },
};

export const mutations = {
    setUser(state, user) {
      state.user = user;
    },
    setSignupLayout(state, bool) {
      state.signupLayout = bool;
    },
    setSidebarOpen(state, bool) {
      state.sidebarOpen = bool;
    },
    // NEW - 07/30/2021 
    setHomeLayout(state, bool) {
      state.homeLayout = bool;
    },
    setAdminLayout(state, bool) {
      state.adminLayout = bool;
    },
};

export const actions = {
    setUser(context, data) {
      context.commit("setUser", data);
    },
    setSignupLayout(context, data) {
      context.commit("setSignupLayout", data);
    },
    setSidebarOpen(context, data) {
      context.commit("setSidebarOpen", data);
    },
    // NEW - 07/30/2021 
    setHomeLayout(context, data) {
      context.commit("setHomeLayout", data);
    },
    setAdminLayout(context, data) {
      context.commit("setAdminLayout", data);
    },
}
/*
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {},
    signupLayout: false,
    adminLayout: false,
    sidebarOpen: false,
    homeLayout: false, // NEW - 07/30/2021 
    cloudinary: {
      /*
      cloud_name: "yutell",
      base_upload_preset: "oeptu9s1",
      channel_header_upload_preset: "dpbbokya",
      profile_image_upload_preset: "dpbbokya",
      audio_upload_preset: "dpbbokya",
      cover_image_upload_preset: "dpbbokya",
      *(insert end comment)/

     // NEW 6/18/2021
     cloud_name: "deoxp0sll",
     base_upload_preset: "isluis7a",
     channel_header_upload_preset: "isluis7a",
     profile_image_upload_preset: "isluis7a",
     audio_upload_preset: "isluis7a",
     cover_image_upload_preset: "isluis7a",
    },
    config: {
      base_url: "https://www.yutell.com/",
      expedited_cost: 3.99,
      stories_per_page: 25,
      //stripe_publishable_key: "pk_test_aBZY7s3b36QEmZv2kvrJNYq7007qgaspZE",
      stripe_publishable_key: "pk_test_51H7RDAFKhKZiO98cWGLTuXZItB9SQEA30dWYvmd8uAsr8h99hbY5mdirPX4p1XTwmc9HVCeXPJ8HeOwTHHJcv1Bh00nVKq1usv",
      stripe_redirect: "https://www.yutell.com/account",
      //stripe_connect_client_id: "ca_HCk7HtHBIN46vqBgkRxbjDufpK3ckmAd",
      stripe_connect_client_id: "ca_Jm0b4odsY3KkOnD2z2bfCdfFNaLyaQZg",
      support_email: "hello@yutell.com",
      wp_api_url: "https://cms.yutell.com/wp-json/wp/v2",
      wp_menu_url: "https://cms.yutell.com/wp-json/menus/v1/menus/",
    },
  },
  plugins: [createPersistedState({
    paths: ['user', 'signupLayout', 'adminLayout', 'sidebarOpen', 'homeLayout']
  })],
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getSignupLayout: (state) => {
      return state.signupLayout;
    },
    getSidebarOpen: (state) => {
      return state.sidebarOpen;
    },
    getCloudinary: (state) => {
      return state.cloudinary;
    },
    getConfig: (state) => {
      return state.config;
    },
    // NEW - 07/30/2021 
    getHomeLayout: (state) => {
      return state.homeLayout;
    },
    getAdminLayout: (state) => {
      return state.adminLayout;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setSignupLayout(state, bool) {
      state.signupLayout = bool;
    },
    setSidebarOpen(state, bool) {
      state.sidebarOpen = bool;
    },
    // NEW - 07/30/2021 
    setHomeLayout(state, bool) {
      state.homeLayout = bool;
    },
    setAdminLayout(state, bool) {
      state.adminLayout = bool;
    },
  },
  actions: {
    setUser(context, data) {
      context.commit("setUser", data);
    },
    setSignupLayout(context, data) {
      context.commit("setSignupLayout", data);
    },
    setSidebarOpen(context, data) {
      context.commit("setSidebarOpen", data);
    },
    // NEW - 07/30/2021 
    setHomeLayout(context, data) {
      context.commit("setHomeLayout", data);
    },
    setAdminLayout(context, data) {
      context.commit("setAdminLayout", data);
    },
  },
});
*/