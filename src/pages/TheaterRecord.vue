<template>
	<div>

		<section id="page-title" class="page-title-parallax page-title-dark" style="background: url('/static/images/teatro-colombo.png') center center no-repeat; background-size: cover; box-shadow:inset 0 0 0 2000px rgba(0,0,0,0.5); padding: 75px 0;"
		 data-bottom-top="background-position:0px 300px;" data-top-bottom="background-position:0px -300px;">

			<div class="container clearfix">
				<h1>Ficha de Teatro</h1>
				<!-- <span>Ficha de Companhia</span> -->
				<!-- <ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">Home</a></li>
					<li class="breadcrumb-item"><a href="#">Pages</a></li>
					<li class="breadcrumb-item active" aria-current="page">Jobs</li>
				</ol> -->
			</div>

		</section><!-- #page-title end -->

		<!-- Content
		============================================= -->
		<section id="content">

			<div class="content-wrap" v-if="success">

				<div class="container clearfix">

					<div class="col_three_fifth nobottommargin">

						<div class="fancy-title title-bottom-border">
							<h3>{{ theater.name }}</h3>
						</div>
						<p>
							<ul>
                <li v-if="theater.otherNames"><b>Outros nomes:</b> {{theater.otherNames}} </li>
								<li v-if="theater.foundationAddress"><b>Endereço na época de fundação:</b> {{ theater.foundationAddress }}</li>
								<li v-if="theater.neighborhood"><b>Bairro:</b> {{ theater.neighborhood }}</li>
								<li v-if="theater.currentAddress"><b>Endereço atualizado:</b> {{ theater.currentAddress }}</li>
								<li v-if="theater.foundationDate"><b>Data de inauguração:</b> {{ theater.foundationDate | formatDatetime  }}</li>
								<li v-if="theater.dissolutionDate"><b>Data de desaparecimento:</b> {{ theater.dissolutionDate | formatDatetime  }}</li>
								<li v-if="theater.dissolutionReason"><b>Motivo de desaparecimento:</b> {{ theater.dissolutionReason }}</li>
                <li v-if="theater.kind"><b>Tipo de espetáculo:</b> {{ theater.kind }}</li>

								<li v-if="owners.length > 0"><b>Proprietários:</b>
                <span v-for="(owner, index) in owners" :key="index"> {{owner.name ? owner.name : owner.person.artistName}} ({{owner.firstDate | formatDatetime}} a {{ owner.lastDate | formatDatetime}})<span v-if=" index !== owners.length - 1">,</span>
                </span> </li>

								<li v-if="tenants.length > 0"><b>Arrendatários:</b> <span v-for="(tenant, index) in tenants" :key="index">{{tenant.name ? tenant.name : tenant.person.artistName}} ({{tenant.firstDate | formatDatetime}} a {{tenant.lastDate | formatDatetime}})<span v-if="index !== tenants.length - 1">, </span> </span> </li>
								
								<li v-if="business.length > 0"><b>Empresários:</b> <span v-for="(businessMan, index) in business" :key="index">{{businessMan.name ? businessMan.name : businessMan.person.artistName}} ({{businessMan.firstDate | formatDatetime}} a {{businessMan.lastDate | formatDatetime}})<span v-if="index !== business.length - 1">, </span> </span> </li>
								<li v-if="managers.length > 0"><b>Gerentes:</b> <span v-for="(manager, index) in managers" :key="index">{{manager.name ? manager.name : manager.person.artistName}} ({{manager.firstDate | formatDatetime}} a {{manager.lastDate | formatDatetime}})<span v-if="index !== managers.length - 1">, </span> </span> </li>
								<li v-if="companies.length > 0"><b>Companhias:</b> <span v-for="(company, index) in companies" :key="index">{{company.name ? company.name : company.person.artistName}} ({{company.firstDate | formatDatetime}} a {{company.lastDate | formatDatetime}})<span v-if="index !== companies.length - 1">, </span> </span> </li>

								<li v-if="theater.seatsNumber"><b>Lotação:</b> {{ theater.seatsNumber }}</li>
								<li v-if="theater.history"><b>Trajetória:</b> <span v-html="theater.history"> </span></li>
								<li v-if="theater.notes"><b>Notas:</b> <span v-html="theater.notes"> </span></li>
								<li v-if="theater.bibliography"><b>Bibliografia:</b> <span v-html="theater.bibliography"> </span> </li>
							</ul>
						</p>

            <div class="fancy-title title-bottom-border">
							<h3>Como citar</h3>
						</div>
            <p>
              TEATRO {{ theater.name |capitalize }} In: TEATRO musicado em São Paulo (1914-1934). Coord. por Virgínia de Almeida Bessa. Disponível em: <{{getUrl()}}>. Acesso em: {{getDate()}}
						</p>

					</div>

					<div class="col_two_fifth nobottommargin col_last">

						<div id="responsible-apply" class="heading-block highlight-me">
							<h2>Fotos</h2>
							<!-- <span>And we'll get back to you within 48 hours.</span> -->
						</div>

						<!-- <div>
							<img src="https://storage.googleapis.com/templates-html/companhia-arruda.png">
							<p style="text-align: center; margin-bottom: 10px">Fonte: arial</p>
							<p style="text-align: center">Fonte: arial</p>
						</div> -->
            <div class="pictures" v-if="pictures.length > 0">
              <div v-for="(picture, index) in pictures" :key="index">
                <img :src="picture.url" @click="openPicture(picture)">
                <p style="text-align: center; margin-bottom: 10px">
                  <span v-html="picture.description"></span> </br>
                  <span v-if="picture.origin" style="font-size: 12px"> Fonte: </span>
                  <span v-html="picture.origin" style="font-size: 12px"></span>
                </p>
              </div>
						</div>

					</div>
				</div>
			</div>

      <div class="content-wrap" v-else>
				<div class="container clearfix">
					<div class="col_three_fifth nobottommargin">
						<div class="fancy-title title-bottom-border">
							<h3>Não foi possível encontrar esse teatro.</h3>
						</div>
					</div>
				</div>
      </div>
		</section>

		<modal-picture v-if="modal" :url="picture.url" :description="picture.description" :origin="picture.origin" @close="modal = false">
		</modal-picture>

	</div>
</template>



<script>
import Theater from "@/api/Theater.vue";
import moment from "moment";
import modalPicture from "@/components/Modal.vue";

export default {
  components: {
    modalPicture
  },
  data() {
    return {
      theaterId: this.$route.params.theaterId,
      theater: {
        currentAddress: null,
        dissolutionDate: null,
        dissolutionReason: null,
        foundationAddress: null,
        foundationDate: null,
        id: null,
        name: "",
        neighborhood: null,
        seatsNumber: null
      },
      tenants: [],
      owners: [],
      business: [],
      managers: [],
      companies: [],
      responsibles: [],
      pictures: [],
      success: true,
      modal: false,
      picture: {
        url: "",
        description: "",
        origin: ""
      }
    };
  },
  mounted() {
    Theater.getRecord(this.theaterId)
      .then(result => {
        this.theater = result.theater;
        this.responsibles = result.responsibles;
        this.pictures = result.pictures;
        this.filterResponsibles(result.responsibles);
      })
      .catch(error => {
        this.success = false;
        console.error(error);
      });
  },
  methods: {
    filterResponsibles(responsibles) {
      responsibles.filter(responsible => {

        switch(responsible.role) {
          case "OWNER":
            this.owners.push(responsible);
            break;

          case "TENANT":
            this.tenants.push(responsible);
            break;
            
          case "BUSINESS":
            this.business.push(responsible);
            break;

          case "MANAGER":
            this.managers.push(responsible);
            break;

          case "COMPANY":
            this.companies.push(responsible);
            break;

          default:
            this.tenants.push(responsible);
        }
      });
    },
    getUrl() {
      return window.location.href;
    },
    getDate() {
      let months = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
      ];
      let now = new Date();
      if (now.getDate() < 10) {
        return `0${now.getDate()} ${
          months[now.getMonth()]
        }. ${now.getFullYear()}`;
      } else {
        return `${now.getDate()} ${
          months[now.getMonth()]
        }. ${now.getFullYear()}`;
      }
    },
    formatDateYear(value) {
      if (!value) return null;
      return moment(value).format("YYYY");
    },
    openPicture(picture) {
      this.picture = picture;
      this.modal = true;
    }
  }
};
</script>


<style scoped>
.heading-block:after {
  margin-top: 0;
}
img:hover {
  opacity: 0.7;
}
.pictures{
  text-align: center;
}
</style>
