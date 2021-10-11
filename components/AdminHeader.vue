<template>
  <header class="admin-header">
    <div class="container">
      <router-link to="/admin" class="admin-logo">
        <img src="@/assets/svg/logo.svg" />
      </router-link>
      <nav class="admin-nav">
        <ul class="menu">
          <li>
            <router-link to="/admin">Videos</router-link>
          </li>
          <li>
            <router-link to="/admin/admins">Admins</router-link>
          </li>
          <li>
            <router-link to="/admin/users">Users</router-link>
          </li>
          <li>
            <router-link to="/admin/raters">Raters</router-link>
          </li>
          <li>
            <router-link to="/admin/categories">Categories</router-link>
          </li>
          <li>
            <router-link to="/admin/contests">Contests</router-link>
          </li>
          <li>
            <router-link to="/admin/money">Money</router-link>
          </li>
          <li>
            <a href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </nav>
      <div class="clearfix"></div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      // Make sure admin mode is off
      this.$store.commit("setAdminLayout", false);

      this.$router.push({ path: "/logout" });
    }
  }
};
</script>