<template>
	<header id="header">

			<div id="header-wrap">

				<div class="container clearfix">

					<div id="primary-menu-trigger"><i class="icon-reorder"></i></div>

					<div class="market-header clearfix">

						<div>
							<!-- Logo
							============================================= -->
							<div id="logo">
								<!-- <a href="demo-interior-design.html" class="standard-logo"><img src="/static/images/logo.png" alt="Canvas Logo"></a>
								<a href="demo-interior-design.html" class="retina-logo"><img src="/static/images/logo@2x.png" alt="Canvas Logo"></a> -->
							</div><!-- #logo end -->

						</div>

						<div style="margin: 0 auto;">
							<!-- Primary Navigation
							============================================= -->
							<nav id="primary-menu" class="with-arrows clearfix">
                <div v-if="isLoading" class="spinner">
                  <LoadingSpinner :size="40" />
                </div>
								<ul v-else class="one-page-menu header-bar">
									<li><router-link v-bind:to="'/'">Início</router-link></li>
									<!-- <li><router-link v-bind:to="'/projeto'">O Projeto</router-link></li> -->
									<!-- <li><router-link v-bind:to="'/quem-somos'">Quem somos</router-link></li> -->
									<!-- <li><router-link v-bind:to="'/metodologia'">Metodologia</router-link></li> -->
								  <li v-for="page in pages" :key="page.id">
  								  <router-link v-bind:to="`/pagina/${page.id}`">{{page.title}}</router-link>
								  </li>
									<li><router-link v-bind:to="'/pesquisar-espetaculos'" style="text-transform: none">Pesquisar Espetáculos</router-link></li>
									<li><router-link v-bind:to="'/pesquisar-pessoas'" style="text-transform: none">Pesquisar Pessoas</router-link></li>
								</ul>
							</nav><!-- #primary-menu end -->
						</div>
						<div>
							<!-- Top Search
							============================================= -->
							<div id="side-panel-trigger" class="side-panel-trigger">
								<!-- <a href="#" class="d-block d-lg-none"><i class="icon-line-lock"></i></a>
								<a href="#" class="d-none d-lg-block">Sign In <i class="icon-line-arrow-right"></i></a> -->
							</div><!-- #top-search end -->
						</div>
					</div>
				</div>

			</div>

		</header><!-- #header end -->
</template>

<script>
import PageAPI from "@/api/Pages.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  components: {
    LoadingSpinner
  },
	name: 'Header',
	data() {
    return {
      pages: [],
      isLoading: false
    }
	},
	methods: {
    async loadPages() {
      try {
        this.isLoading = true

        const { pages } = await PageAPI.getAllPages();
        this.pages = pages;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false
      }
    },
	},
	async mounted() {
    await this.loadPages();
	},
}

// var headerInit = function () {
// 	$(document).ready(function(){
// 		$('.mob-menu').click(function(){
// 			$('.menubar').toggleClass('open');
// 		return false;
// 	});
// });
// }
</script>

<style>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  margin: 1.5rem 0rem;
}
</style>
