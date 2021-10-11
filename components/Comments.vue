<template>
  <section class="comments">
    <h4 class="mb-4">{{ comments.length }} Comments</h4>
    <div class="comment">
      <div class="avatar">
        <img v-if="user.profile.profile_image" :src="user.profile.profile_image" />
        <img v-else src="@/assets/img/default-user.png" />
      </div>
      <div class="content">
        <textarea
          v-model="comment.comment"
          class="form-control comment-box mb-2"
          placeholder="Add a public comment..."
        ></textarea>
        <button class="btn btn-primary" @click="postComment">Post Comment</button>
      </div>
    </div>
    <div v-if="initialLoading" class="inline-content-loader">
      <img src="@/assets/svg/bars.svg" />
    </div>
    <div v-else class="comment-list" v-bind:class="{expanded: expanded}">
      <div v-for="comment in comments" :key="'comment-' + comment.id" class="comment">
        <router-link :to="'/channel/' + comment.user.channel_username" class="avatar">
          <img v-if="comment.user.profile.profile_image" :src="user.profile.profile_image" />
          <img v-else src="@/assets/img/default-user.png" />
        </router-link>
        <div class="content">
          <div class="author">
            <router-link :to="'/channel/' + comment.user.channel_username">
              {{ comment.user.channel_username
              }}
              <i
                v-if="story.creator.id == comment.user.id"
                class="im im-star"
              ></i>
            </router-link>
            <span>{{ readableDate(comment.created_at) }}</span>
          </div>
          <div class="txt">{{ comment.comment }}</div>
          <a
            v-if="replying == comment.id"
            href="#"
            class="reply-link red"
            @click.prevent="replying = 0"
          >cancel</a>
          <a v-else href="#" class="reply-link" @click.prevent="postReply(comment.id)">reply</a>
          <div v-show="replying == comment.id">
            <textarea
              v-model="reply.comment"
              class="form-control comment-box my-2"
              placeholder="Add a public reply..."
            ></textarea>
            <button class="btn btn-primary" @click="postReply">Post Reply</button>
          </div>
        </div>

        <!-- REPLIES -->
        <div v-for="comment in comment.replies" :key="'reply-' + comment.id" class="comment reply">
          <router-link :to="'/channel/' + comment.user.channel_username" class="avatar">
            <img v-if="comment.user.profile.profile_image" :src="user.profile.profile_image" />
            <img v-else src="@/assets/img/default-user.png" />
          </router-link>
          <div class="content">
            <div class="author">
              <router-link :to="'/channel/' + comment.user.channel_username">
                {{ comment.user.channel_username
                }}
                <i
                  v-if="story.creator.id == comment.user.id"
                  class="im im-star"
                ></i>
              </router-link>
              <span>{{ readableDate(comment.created_at) }}</span>
            </div>
            <div class="txt">{{ comment.comment }}</div>
          </div>
        </div>
        <!-- END REPLIES -->
      </div>
    </div>
    <div v-if="comments.length > 0" class="text-center mt-4">
      <hr />
      <button class="btn btn-secondary" @click="expanded = !expanded">
        <span v-if="expanded">Show Less</span>
        <span v-else>Show More</span>
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  props: ["story"],
  data() {
    return {
      initialLoading: true,
      comment: {
        user_id: "",
        story_id: "",
        comment: ""
      },
      comments: [],
      reply: {
        user_id: "",
        story_id: "",
        comment: ""
      },
      replying: 0,
      expanded: false
    };
  },
  mounted() {
    // Set up the comment fields
    this.comment.user_id = this.user.id;
    this.comment.story_id = this.story.id;

    this.reply.user_id = this.user.id;
    this.reply.story_id = this.story.id;

    // Get the story
    this.getComments();
  },
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    readableDate(dateVal) {
      if (moment(dateVal) > moment()) {
        return moment().from(dateVal);
      } else {
        return "just now";
      }
    },
    getComments() {
      // Grab the story with the id in the url
      this.$http
        .get("comments/" + this.story.id)
        .then(response => {
          this.comments = response.body;
          this.initialLoading = false;
        })
        .catch(() => {
          swal.fire({
            title: "Uh Oh!",
            text: "There was an error retrieving data.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Ok"
          });
        });
    },
    postReply(comment_id) {
      if (this.replying == 0) {
        this.replying = comment_id;
      } else {
        // Validate the form
        let valid = true;

        if (!this.reply.comment) {
          valid = false;
        }

        if (valid) {
          // Post a comment
          this.$http
            .post("comments/" + this.replying, {
              story_id: this.story.id,
              comment: this.reply
            })
            .then(response => {
              this.comments = response.body;
              this.replying = 0;
              this.reply = {
                user_id: this.user.id,
                story_id: this.story.id,
                comment: ""
              };
            })
            .catch(() => {
              swal.fire({
                title: "Uh Oh!",
                text: "There was an error retrieving data.",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Ok"
              });
            });
        }
      }
    },
    postComment() {
      // Validate the form
      let valid = true;

      if (!this.comment.comment) {
        valid = false;
      }

      if (valid) {
        // Post a comment
        this.$http
          .post("comments", { comment: this.comment })
          .then(response => {
            this.comments = response.body;
            this.comment = {
              user_id: this.user.id,
              story_id: this.story.id,
              comment: ""
            };
          })
          .catch(() => {
            swal.fire({
              title: "Uh Oh!",
              text: "There was an error retrieving data.",
              icon: "error",
              showCancelButton: false,
              confirmButtonText: "Ok"
            });
          });
      }
    }
  }
};
</script>
