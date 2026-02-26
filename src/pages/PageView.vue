<template>
  <div>
    <div v-if="isLoading" class="spinner">
      <LoadingSpinner />
    </div>

    <section v-else id="page-title" class="page-title-parallax page-title-dark" style="background: url('/static/images/teatro-colombo.png') center center no-repeat; background-size: cover; box-shadow:inset 0 0 0 2000px rgba(0,0,0,0.5); padding: 75px 0;" data-bottom-top="background-position:0px 300px;" data-top-bottom="background-position:0px -300px;">
			<div class="container clearfix">
				<h1>{{ page.description }}</h1>
			</div>
		</section>
  	<section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div class="ql-editor ql-snow col-12" v-html="page.content"> </div>
  	    </div>
  	  </div>
	  </section>
  </div>
</template>

<script>
import PageAPI from "@/api/Pages.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
    LoadingSpinner
  },
  name: 'Methodology',
  data() {
    return {
      pageId: null,
      page: {
        title: "",
        description: "",
        content: null
      },
      isLoading: false,
    }
  },
  methods: {
    loadPageData: async function() {
      const { pagina } = this.$router.currentRoute.params;
      if (pagina) {
        this.pageId = pagina;
      }

      try {
        this.isLoading = true

        const { page } = await PageAPI.loadPageData(this.pageId);

        if(!page.content) {
          this.page = {
            title: "",
            description: "Página não encontrada",
            content: null
          }
        }

        this.page = page;
      } catch(err){
        console.error(err);
      } finally {
        this.isLoading = false
      }
    }
  },
  async mounted() {
    await this.loadPageData();
  },
  watch: {
  '$route.currentRoute.params': {
      async handler() {
        const { pagina } = this.$router.currentRoute.params;

        if(pagina != this.pageId){
          await this.loadPageData();
        }
      },
      deep: true,
      immediate: true,
    }
  }
}
</script>

<style scoped>
.heading-block:after {
	margin-top: 0;
}

.spinner {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
