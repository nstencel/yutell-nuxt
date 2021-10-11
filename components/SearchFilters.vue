<template>
  <div class="search-filters">
    <div class="filter-options open">
      <div class="mb-3">
        <ul class="fo-list">
          <li>
            <img
              src="@/assets/svg/smilyface.svg"
              class="mood-img"
              @click="ratings.mood.funny = 0;filterSearch()"
            />
            <star-rating
              @rating-selected="filterSearch"
              v-model="ratings.mood.funny"
              :increment=".5"
              :max-rating="3"
              :show-rating="false"
              :star-size="25"
              :active-color="'#2c9dc5'"
              :inactive-color="'#999999'"
            ></star-rating>
          </li>
          <li>
            <img
              src="@/assets/svg/info.svg"
              class="mood-img info"
              @click="ratings.mood.interesting = 0;filterSearch()"
            />
            <star-rating
              @rating-selected="filterSearch"
              :increment=".5"
              v-model="ratings.mood.interesting"
              :max-rating="3"
              :show-rating="false"
              :star-size="25"
              :active-color="'#2c9dc5'"
              :inactive-color="'#999999'"
            ></star-rating>
          </li>
          <li>
            <img
              src="@/assets/svg/heart.svg"
              class="mood-img heart"
              @click="ratings.mood.touching = 0;filterSearch()"
            />
            <star-rating
              @rating-selected="filterSearch"
              :increment=".5"
              v-model="ratings.mood.touching"
              :max-rating="3"
              :show-rating="false"
              :star-size="25"
              :active-color="'#2c9dc5'"
              :inactive-color="'#999999'"
            ></star-rating>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div>
        <ul class="fo-list">
          <li class="checkbox">
            <label>
              <input type="checkbox" v-model="ratings.g" class="mr-2" @change="filterSearch" />
              <span class="rating-pos">Rated G</span>
            </label>
          </li>
          <li class="checkbox">
            <label>
              <input type="checkbox" v-model="ratings.pg13" class="mr-2" @change="filterSearch" />
              <span class="rating-pos">Rated PG-13</span>
            </label>
          </li>
          <li class="checkbox">
            <label>
              <input type="checkbox" v-model="ratings.r" class="mr-2" @change="filterSearch" />
              <span class="rating-pos" @change="filterSearch">Rated R</span>
            </label>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  props: ["ratings"],
  data() {
    return {
      filtersOpen: false
    };
  },
  methods: {
    filterSearch() {
      this.$emit("filterSearch", this.ratings);
    }
  }
};
</script>
