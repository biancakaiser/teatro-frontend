<template>
	<footer id="footer" class="topmargin noborder" style="background-color: #F5F5F5;">

		<div id="copyrights">

				<div class="container clearfix">

					<div class="col_full nobottommargin center">
						<div class="copyrights-menu copyright-links clearfix">
							<div v-if="isLoading" class="spinner">
                <LoadingSpinner :size="40" />
              </div>
              <ul class="menu" v-else>
                <li class="menu-list"><router-link v-bind:to="'/'">Início</router-link></li>
                <li class="menu-list" v-for="page in pages" :key="page.id">
                  <router-link v-bind:to="`/pagina/${page.id}`">{{page.title}}</router-link>
                </li>
                <li class="menu-list"><router-link v-bind:to="'/pesquisar-espetaculos'" style="text-transform: none">Pesquisar Espetáculos</router-link></li>
                <li class="menu-list"><router-link v-bind:to="'/pesquisar-pessoas'" style="text-transform: none">Pesquisar Pessoas</router-link></li>
              </ul>
						</div>
						Copyrights © 2018 Teatro Musicado
					</div>

				</div>

			</div>

	</footer>
</template>

<script>
import PageAPI from "@/api/Pages.vue"
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner
  },
  name: 'Footer',
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
</script>

<style>
#footer{
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 140px;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.menu-list {
  list-style: none;
  padding: 0 .5rem;
}

@media (max-width: 767px){
	.col_full{
		margin-bottom: 0px!important;
	}
}
</style>
