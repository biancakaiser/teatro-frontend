<script>
import request from "./request.vue";

export default {
  getStatistics() {
    return request.send("statistics","show", {}, true)
    .then(response => {
      return response;
    });
	}

};
</script>
