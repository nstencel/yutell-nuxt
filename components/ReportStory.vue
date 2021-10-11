<template>
  <div class="custom-modal">
    <div class="cm-content p-5">
      <h1 class="mb-4">Report This Story</h1>
      <div class="form-group">
        <label>
          Reason For Report
          <span>*</span>
        </label>
        <ul class="list-unstyled">
          <li class="mb-2">
            <label class="radio-label">
              <input
                type="radio"
                v-model="report.reason"
                value="Offensive or Innapropriate Content"
              /> Offensive or Innapropriate Content
            </label>
          </li>
          <li class="mb-2">
            <label class="radio-label">
              <input type="radio" v-model="report.reason" value="Pornagraphic Content" /> Pornagraphic Content
            </label>
          </li>
          <li class="mb-2">
            <label class="radio-label">
              <input type="radio" v-model="report.reason" value="Other" /> Other
            </label>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label>Optional Comment</label>
        <textarea
          v-model="report.comment"
          class="form-control"
          placeholder="Explain your reason for the report."
        ></textarea>
      </div>
      <div class="mt-4">
        <hr />
        <button
          class="btn btn-default btn-lg mr-3"
          @click="$emit('closeModal')"
          v-bind:class="{disabled: processing}"
          :disabled="processing"
        >Cancel</button>
        <button
          class="btn btn-primary btn-lg"
          @click="submitReport"
          v-bind:class="{disabled: processing}"
          :disabled="processing"
        >
          <span v-if="!processing">Submit Report</span>
          <span v-else>
            <img src="@/assets/svg/loader.svg" class="inline-loader" /> Submitting Report...
          </span>
        </button>
      </div>
    </div>
    <div class="cm-overlay" @click="$emit('closeModal')"></div>
  </div>
</template>

<script>
import swal from "sweetalert2";
export default {
  props: ["story"],
  data() {
    return {
      report: {
        story_id: 0,
        reason: "Offensive or Innapropriate Content",
        comment: ""
      },
      processing: false
    };
  },
  mounted() {
    this.report.story_id = this.story.id;
  },
  methods: {
    submitReport() {
      this.processing = true;
      // Submit report
      this.$http
        .post("stories/report", { report: this.report })
        .then(response => {
          // Close the modal
          this.$emit("closeModal");
          // Reset the report data
          this.report = {
            story_id: 0,
            reason: "Offensive or Innapropriate Content",
            comment: ""
          };
          swal.fire({
            title: "Success!",
            text: "Your report has been submitted.",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "Ok"
          });
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
};
</script>