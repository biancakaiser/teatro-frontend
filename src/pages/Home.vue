<template>
	<div>

    <!-- Slider
		============================================= -->
		<section id="slider" class="slider-element clearfix" style="height: 500px; background: url('/static/images/teatro-colombo.png') center center no-repeat; background-size: cover; box-shadow:inset 0 0 0 2000px rgba(0,0,0,0.5);">
			<div style="position: relative; top: 50%; transform: translateY(-50%);">
				<div class="container clearfix">

					<div class="clearfix center divcenter" style="max-width: 700px;">
						<div class="emphasis-title">
							<h1 class="font-secondary" style="color: #FFF; font-size: 50px; font-weight: 900; text-shadow: 0 7px 10px rgba(0,0,0,0.07), 0 4px 4px rgba(0,0,0,0.2);">Teatro Musicado
								<br> em São Paulo <br><span style="color: #FFF; font-size: 45px;">de 1914 a 1934</span></h1>
							<!-- <p style="font-weight: 300; opacity: .7; color: #FFF; text-shadow: 0 -4px 20px rgba(0, 0, 0, .25);">Pesquisar as representações teatrais em São Paulo entre 1914 e 1934</p> -->
						</div>
						<!-- <div class="subscribe-widget" data-loader="button">
							<div class="widget-subscribe-form-result"></div>
							<form id="widget-subscribe-form" action="include/subscribe.php" role="form" method="post" class="nobottommargin" data-animate="fadeInUp">
								<div class="input-group divcenter">
									<input type="email" id="widget-subscribe-form-email" name="widget-subscribe-form-email" class="form-control form-control-lg not-dark required email" placeholder="Espetáculos ou Pessoas" style="border: 0; box-shadow: none; overflow: hidden;">
									<div class="input-group-append">
										<button href="#" class="button t400" type="submit" style="border-radius: 3px; width: 40px; padding: 0; background-color: #ff3232;">
                      <i class="icon-search" style="margin:0;"></i>
                    </button>
									</div>
								</div>
							</form>
						</div> -->
					</div>

				</div>
			</div>

		</section>

		<!-- Content
		============================================= -->
		<section id="content">

			<div class="content-wrap clearfix" style="padding-top: 0; padding-bottom: 0;">

				<div class="section notopmargin nobottommargin clearfix" style="padding: 80px 0">
					<div class="container clearfix">

						<div class="divcenter" style="max-width: 960px">
							<div class="row clearfix">
								<div class="col-12 col-md-4 center customers-count">
									<div class="counter center counter-large font-primary">{{ totalPlay }}</div>
									<p>Peças registradas</p>
								</div>
								<div class="col-12 col-md-7 offset-md-1">
									<blockquote class="quote nobottommargin">
										<p>Base de dados que reúne todos os espetáculos teatrais encenados em São Paulo entre 1914 e 1934. Também traz informações sobre teatros, companhias, peças e pessoas relacionadas ao teatro musicado produzido na cidade nesse período.</p>
										<!-- <footer class="color">John Doe, Google Inc.</footer> -->
									</blockquote>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="container clearfix">

					<!-- <div class="divcenter" style="max-width: 960px">
						<div class="heading-block center nobottomborder">
							<h2 class="ls2 t700">Pesquisa de Doutorado</h2>
							<span>Esta base de dados é parte integrante da Tese de Doutorado A cena musical paulistana: teatro musicado e canção popular na cidade de São Paulo (1914-1934), realizada por Virgínia de Almeida Bessa no Programa de Pós- Graduação em História Social da FFLCH-USP, em cotutela com a Universidade Paris-Ouest Nanterre La Défense. O trabalho contou com financiamento da Fapesp e da Capes.</span>
						</div>
					</div> -->

					<div class="row" style="justify-content: space-around;">
						<div v-for="sponsor in sponsors" class="logo">
							<p>Financiamento</p>
							<a :href="sponsors.origin"><img style="max-height: 40px;" :src="sponsor.url" :alt="sponsor.description"/></a>
						</div>
						<div class="logo">
							<p>Desenvolvimento</p>
							<a href="https://espressolabs.com.br"><img style="max-height: 40px;" src="/static/images/logo-deitado.png"></a>
						</div>
					</div>

				</div>

				<!-- <div class="container clearfix">

					<div class="col_one_third nobottommargin">
						<div class="feature-box fbox-small fbox-center fbox-plain fbox-large nobottomborder">
							<div class="fbox-icon">
								<i class="icon-line2-home"></i>
							</div>
							<h3 class="ls0 t400 nott" style="font-size: 20px;">Commercial &amp; Personal Use</h3>
							<p style="font-size: 16px;">Proactively reintermediate B2C infomediaries before multimedia methods of empowerment.</p>
						</div>
					</div>
					<div class="col_one_third nobottommargin">
						<div class="feature-box fbox-small fbox-center fbox-plain fbox-large nobottomborder">
							<div class="fbox-icon">
								<i class="icon-line2-compass"></i>
							</div>
							<h3 class="ls0 t400 nott" style="font-size: 20px;">Vaastu Compliant</h3>
							<p style="font-size: 16px;">Uniquely formulate principle-centered applications after just in time opportunities.</p>
						</div>
					</div>
					<div class="col_one_third nobottommargin col_last">
						<div class="feature-box fbox-small fbox-center fbox-plain fbox-large nobottomborder">
							<div class="fbox-icon">
								<i class="icon-line2-directions"></i>
							</div>
							<h3 class="ls0 t400 nott" style="font-size: 20px;">Great Location</h3>
							<p style="font-size: 16px;">Collaboratively reinvent ubiquitous functionalities vis future-proof systems.</p>
						</div>
					</div>

				</div> -->

			</div>
  </section><!-- #content end -->

  </div>
</template>



<script>
/* eslint-disable */
import StatisticAPI from '@/api/Statistic.vue';

let SearchAPI = require('../api/Search.vue').default;

export default {
  name: 'Home',
  data(){
    return {
      totalPlay: 0,
      sponsors: []
    };
  },
  methods: {
    async loadStatistics() {
      try {
        const { totalPlay } = await StatisticAPI.getStatistics()

        this.totalPlay = totalPlay
      } catch (err) {
        console.error(err);
      }
    },
    async loadSponsorList() {
      try {
        const { sponsors } = await SearchAPI.getSponsors();
        this.sponsors = sponsors || [];
      } catch(err) {
        console.err("sponsor loading error:",err);
      }
    }
  },
  async mounted() {
    await this.loadStatistics()
    await this.loadSponsorList();
  }
}

</script>


<style>
  .logo {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo p {
    text-align: center;
    padding-top: 20px;
    font-size: 1.4rem;
  }

  .logo img {
    margin-bottom: 35px;
  }
</style>
