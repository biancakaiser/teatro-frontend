<script>
import request from "./request.vue";

export default {
  loadedPages: new Map(),
	getAllPages(){
		return request.send("page", "all")
			.then(response => {
				return response;
			});
	},
	async loadPageData(pageId) {
	  if(!this.loadedPages.has(pageId)) {
	    const response = await request.send("page", "load", { pageId })
			  .then(response => {
				  return response;
			});
			this.loadedPages.set(pageId, response);
	  }

	  return this.loadedPages.get(pageId);
	}
};
</script>
