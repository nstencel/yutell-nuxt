<template>
  <section v-if="!initialLoading" class="cat-filters">
    <ul>
      <li>
        <button
          @click="filterStories(0)"
          v-bind:class="{active: activeCategory == 0}"
        >All Categories</button>
      </li>
      <li v-for="cat in categories" :key="'cat-'+cat.id">
        <button @click="filterStories(cat.id)" v-bind:class="{active: activeCategory == cat.id}">
          {{cat.category}}
          <strong>({{cat.stories.length}})</strong>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["activeCategory"],
  data() {
    return {
      initialLoading: true,
      categories: []
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.$http.get("https://api.yutell.com/api/categories?byCount=true")
      .then(response => {
        return response.json();
      })
      .then((data) => {
        this.categories = data;
        this.initialLoading = false;
      });
    },
    filterStories(cat_id) {
      this.$emit("filterStoriesByCategory", cat_id);
    }
  }
};
</script>