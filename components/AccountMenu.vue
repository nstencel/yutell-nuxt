<template>
  <div class="text-right">
    <router-link
      v-if="Object.entries(user).length > 0 && user.admin == 1"
      to="/admin"
      href="#"
      class="btn btn-primary mr-4 mt-4"
    >Admin Panel</router-link>
    <div v-if="Object.entries(user).length > 0" class="btn-group profile-dd">
      <button type="button" class="profile-dd-img" data-toggle="dropdown">
        <img v-if="user.profile.profile_image" :src="user.profile.profile_image" />
        <img v-else src="@/assets/img/default-user.png" />
      </button>
      <div class="dropdown-menu dropdown-menu-right text-right">
        <router-link to="/account" class="dropdown-item">My Channel</router-link>
        <router-link to="/account/upload" class="dropdown-item">Upload a Story</router-link>
        <router-link to="/account/edit-profile" class="dropdown-item">Edit Profile</router-link>
        <router-link to="/account/settings" class="dropdown-item">Account Settings</router-link>
        <div class="dropdown-divider"></div>
        <router-link to="/logout" class="dropdown-item">Logout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      menuItems: []
    };
  },
  computed: mapState({
    user: state => state.user,
    config: state => state.config
  }),
  mounted() {
    this.wpMenus();
  },
  methods: {
    wpMenus() {
      this.$http
        .get("https://yutellcms.422clients.com/wp-json/menus/v1/menus/menu")
        .then(response => {
          this.menuItems = response.body.items;
        });
    }
  }
};
</script>

