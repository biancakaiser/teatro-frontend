<template>
	<div>

		<section id="page-title" class="page-title-parallax page-title-dark" style="background: url('/static/images/teatro-colombo.png') center center no-repeat; background-size: cover; box-shadow:inset 0 0 0 2000px rgba(0,0,0,0.5); padding: 75px 0;"
		 data-bottom-top="background-position:0px 300px;" data-top-bottom="background-position:0px -300px;">

			<div class="container clearfix">
				<h1>Ficha de Companhia</h1>
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
							<h3>{{company.name | capitalize}}</h3>
						</div>

						<p>
							<ul>
								<li v-if="company.otherNames"><b>Outros nomes:</b> {{company.otherNames |capitalize }}</li>
								<li v-if="company.nationality"><b>Nacionalidade:</b> {{ company.nationality|capitalize }}</li>
								<li v-if="company.foundationDate"><b>Data de fundação:</b> {{company.foundationDate | formatDatetime }}</li>
								<li v-if="company.foundationPlace"><b>Local de fundação:</b> {{company.foundationPlace|capitalize }} </li>
								<li v-if="company.dissolutionDate"><b>Data de dissolução:</b> {{company.dissolutionDate | formatDatetime }}</li>
                <li v-if="formattedAndAggregatedJobs.length > 0"><b>Membros:</b> </li>
							</ul>
						</p>


           <div id="accordion" v-if="formattedAndAggregatedJobs.length > 0">
							<div class="card" v-for="(aggregatedJob, index) in formattedAndAggregatedJobs" :key="index">
								<div class="card-header" :id="`card${index}`" data-toggle="collapse" :data-target="`#collapse${index}`"
								 aria-expanded="true" aria-controls="collapseOne">
									<h5 class="mb-0">
										<button class="btn btn-link">
										{{ aggregatedJob.role }}
										</button>
									</h5>
								</div>

								<div :id="`collapse${index}`" class="collapse" aria-labelledby="`card${index}`" data-parent="#accordion">
									<div class="card-body">
										<ul class="iconlist iconlist-color nobottommargin">
                      <li v-for="period in aggregatedJob.periods">
                        <i class="icon-plus-sign"></i>
                        <span v-for="person in period.members">
                          <span v-if="person.visible === '0' || person.visible === 0">{{ person.name|capitalize }}</span>
                          <router-link
                            v-else
                            :to="`/pessoa/${person.id}`"
                            target="_blank">{{person.name|capitalize}}</router-link>,&nbsp;
                        </span>
                      <span v-if="(period.startDate === null  && period.finalDate === null )">
                        Datas desconhecidas
                      </span>
                      <span v-else-if="(period.startDate !== null  && period.finalDate !== null )">
                        {{` ${period.startDate} a ${period.finalDate}`}}
                      </span>
                      <span v-else-if="period.startDate !== null  ">
                        {{` ${period.startDate} - Data final desconhecida`}}
                      </span>
                      <span v-else>
                        {{` Data inicial desconhecida - ${period.finalDate}`}}
                      </span>
                      </li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<p v-if="company.path || company.notes || company.bibliography">
							<ul>
                                <br><li v-if="company.path"><b>Trajetória:</b> <span v-html="company.path"> </span></li>
								<br><li v-if="company.notes"><b>Notas:</b> <span v-html="company.notes"> </span></li>
								<br><li v-if="company.bibliography"><b>Bibliografia:</b> <span v-html="company.bibliography"> </span> </li>
							</ul>
						</p>

            <div class="fancy-title title-bottom-border">
							<h3>Como citar</h3>
						</div>

            <p>
              COMPANHIA {{company.name|capitalize}}. In: TEATRO musicado em São Paulo (1914-1934). Coord. por
									Virgínia de Almeida Bessa. Disponível em: < {{getUrl()}} >. Acesso em: {{getDate()}}
            </p>

					</div>

					<div class="col_two_fifth nobottommargin col_last">

						<div id="job-apply" class="heading-block highlight-me">
							<h2>Fotos</h2>
						</div>
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
							<h3>Não foi possível encontrar essa companhia.</h3>
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
import CompanyAPI from "@/api/Company.vue";
import modalPicture from "@/components/Modal.vue";
import moment from "moment";

export default {
  components: {
    modalPicture
  },
  data() {
    return {
      companyId: this.$route.params.companyId,
      company: {},
      jobs: [],
      castJobs:['Ator/Atriz','Cantor(a)', 'Ator-cantor/Atriz-cantora', 'Bailarino'],
      conceptionJobs: ['Autor do texto', 'Autor da música', 'Arranjador da música', 'Tradutor', 'Adaptador', 'Arranjador'],
      pictures: [],
      modal: false,
      finalMembers: [],
      wasConcatenated: true,
      formattedAndAggregatedJobs: [],
      picture: {
        url: "",
        description: "",
        origin: ""
      },
      date: null,
      months: [
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
      ],
      success: true
    };
  },
  mounted() {
    CompanyAPI.getRecord(this.companyId)
      .then(result => {
        if (result.company.visible === 0) this.success = false;
        this.company = result.company;
        this.jobs = result.jobs;
        this.pictures = result.pictures;
        this.formattedAndAggregatedJobs = this.filterAndAggregateJobs(this.jobs);
      })
      .catch(error => {
        //alert(error);
        if (error.error === "ERR_API_COMPANY_NOT_FOUND") {
          this.success = false;
        }
        console.error(error);
      });
  },
  methods: {
    openPicture(picture) {
      this.picture = picture;
      this.modal = true;
    },
    getUrl() {
      return window.location.href;
    },
    getDate() {
      let now = new Date();
      if (now.getDate() < 10)
        return `0${now.getDate()} ${
          this.months[now.getMonth()]
        }. ${now.getFullYear()}`;
      else
        return `${now.getDate()} ${
          this.months[now.getMonth()]
        }. ${now.getFullYear()}`;
    },
    formatYear(value) {
      if (!value) return "";
      return moment(value).format("YYYY");
    },
    formatDate(value ) {
      if (!value) return null;
      return moment(value).format("DD/MM/YYYY");
    },
    removeDay(value){
      if (!value || value == undefined) return null;
      return moment(value).format("MM/YYYY")
    },

    filterAndAggregateJobs(jobs) {
      let formattedJobs = [];

      // Organiza todos os jobs em objetos de cada role
      jobs.forEach(job => {
        // COMENTAR ESSE IF SE FOR PARA MOSTRAR TRABALHOS DE CONCEPÇÃO
        if (this.conceptionJobs.includes(job.person.role)){
          return;
        }

        let roleIndex = formattedJobs.findIndex(member => member.role === job.person.role);
        if (roleIndex === -1) {
          roleIndex = (formattedJobs.push({ role: job.person.role, description: [] })) - 1;
        }

        formattedJobs[roleIndex].description.push({
          name: job.person.artistName,
          id: job.personId,
          startDate: job.firstDate ? this.formatDate(job.firstDate) : null,
          finalDate: job.lastDate ? this.formatDate(job.lastDate) : null,
          visible: job.person.visible
        });
      });

      const aggregatedJobsByPerson = this.aggregateByPerson(formattedJobs);
      const aggregatedJobsByPeriod = this.aggregateMembersByPeriod(aggregatedJobsByPerson);
      this.orderRoles(aggregatedJobsByPeriod);
      this.orderPeriods(aggregatedJobsByPeriod);

      return aggregatedJobsByPeriod;
    },

    aggregateByPerson(formattedJobs){ // by name and update dates
      formattedJobs.forEach(formattedJob => {
        formattedJob.description.forEach((job, index) => {
          if (job.startDate && job.finalDate) {
            let dateTmp = job.startDate.split('/');
            let currentDateStart = new Date(dateTmp[2],dateTmp[1],dateTmp[0]);
            dateTmp = job.finalDate.split('/');
            let currentDateFinal = new Date(dateTmp[2],dateTmp[1],dateTmp[0]);

            for (let j = index + 1; j < formattedJob.description.length; j++) {
              let nextJob = formattedJob.description[j];

              if (job.name != nextJob.name) { // não é a mesma pessoa? então pula
                continue;
              }

              dateTmp = nextJob.startDate.split('/');
              let nextDateStart = new Date(dateTmp[2],dateTmp[1],dateTmp[0]);
              dateTmp = nextJob.startDate.split('/');
              let nextDateFinal = new Date(dateTmp[2],dateTmp[1],dateTmp[0]);

              if (currentDateStart.getTime() <= nextDateStart.getTime() && currentDateFinal.getTime() > nextDateStart.getTime()) { // se o atual começou antes/junto e terminou no meio do próximo
                // atualiza a data final
                formattedJob.description[index].finalDate = formattedJob.description[j].finalDate;
              } else if (currentDateStart.getTime() > nextDateStart.getTime() && currentDateStart.getTime() < nextDateFinal.getTime()){ //se o atual começou depois e terminou depois/junto do proximo
                // atualiza data inicial
                formattedJob.description[index].startDate = formattedJob.description[j].startDate;
              } else if (currentDateStart.getTime() > nextDateStart.getTime() && currentDateFinal.getTime() < nextDateFinal.getTime()) { // se o atual está contido no próximo
                // atualiza ambas as datas
                formattedJob.description[index].finalDate = formattedJob.description[j].finalDate;
                formattedJob.description[index].startDate = formattedJob.description[j].startDate;
              } else {
                return; // evitar splice abaixo, caso não haja fusão de períodos
              }

              // tira o próximo da lista
              formattedJob.description.splice(j, 1);
            }
          }
        });
      });

      return formattedJobs;
    },

    aggregateMembersByPeriod(aggregatedJobsByPerson){
      let uniqueRoles = new Set(aggregatedJobsByPerson.map(job => job.role));
      let finalList = [...uniqueRoles].map(role => ({ role, periods: [] }));

      aggregatedJobsByPerson.forEach(personJob => {
        let finalListRoleIndex = finalList.findIndex(job => job.role === personJob.role);

        personJob.description.forEach(roleJobMember => {
          let periodIndex = finalList[finalListRoleIndex].periods.findIndex(job => job.startDate === roleJobMember.startDate && job.finalDate === roleJobMember.finalDate);
          if (periodIndex === -1) {
            periodIndex = (finalList[finalListRoleIndex].periods.push({
              startDate: roleJobMember.startDate,
              finalDate: roleJobMember.finalDate,
              members: [],
            })) - 1;
          }

          finalList[finalListRoleIndex].periods[periodIndex].members.push({
            id: roleJobMember.id,
            name: roleJobMember.name,
            visible: roleJobMember.visible,
          });
        });
      });
      return finalList;
    },
    orderPeriods(jobs) {
      jobs.forEach(job => {
        if (job && job.periods.length) {
          job.periods.sort((a, b) => a.startDate && b.startDate ? a.startDate.localeCompare(b.startDate) : 0);
        }
      });

    },
    orderRoles(roles) {
      if (roles && roles.length) {
        roles.sort((a, b) => a.role && b.role ? a.role.localeCompare(b.role) : 0);
      }
    }
  }
};
</script>


<style scoped>
#accordion {
  margin-bottom: 30px;
}

.heading-block:after {
  margin-top: 0;
}

img:hover {
  opacity: 0.7;
}

.card {
  margin-bottom: 5px;
}

.card-header {
  padding: 5px;
  cursor: pointer;
  background-color: #eee;
}

.card-header:hover {
  background-color: #f5f5f5;
}

.btn-link {
  color: black;
  margin-left: 15px;
}

.card-body {
  margin-left: 15px;
}

.btn-link:hover,
.btn-link:active,
.btn-link:focus {
  text-decoration: none;
}
.pictures{
  text-align: center;
}
</style>
