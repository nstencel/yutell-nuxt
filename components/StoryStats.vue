<template>
  <div class="custom-modal">
    <div class="cm-content p-5">
      <h1 class="mb-2">{{story.title}}</h1>
      <h5 class="mb-5">Video Statistics</h5>
      <hr />
      <ul class="list-unstyled">
        <li class="mb-3">
          <strong>Views:</strong>
          <span class="blue ml-2">{{story.views}}</span>
          <hr />
        </li>
        <li class="mb-3">
          <strong>Likes:</strong>
          <span class="blue ml-2">{{story.likes.length}}</span>
          <hr />
        </li>
      </ul>
      <div class="mt-4">
        <hr />
        <button class="btn btn-primary btn-lg" @click="$emit('closeModal')">Done Viewing Stats</button>
      </div>
    </div>
    <div class="cm-overlay" @click="$emit('closeModal')"></div>
  </div>
</template>

<script>
export default {
  props: ["story"]
};
</script>