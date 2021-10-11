<template>
  <div class="loading-module" v-bind:class="{ 'sb-open': sidebarOpen }">
    <img src="@/assets/svg/bars.svg" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    sidebarOpen: state => state.sidebarOpen
  })
};
</script>