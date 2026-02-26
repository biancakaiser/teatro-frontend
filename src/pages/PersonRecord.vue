<template>
	<div>

		<section id="page-title" class="page-title-parallax page-title-dark" style="background: url('/static/images/teatro-colombo.png') center center no-repeat; background-size: cover; box-shadow:inset 0 0 0 2000px rgba(0,0,0,0.5); padding: 75px 0;"
		 data-bottom-top="background-position:0px 300px;" data-top-bottom="background-position:0px -300px;">

			<div class="container clearfix">
				<h1>Ficha de Pessoa</h1>
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
							<h3>{{ person.artistName }}</h3>
						</div>

						<p>
							<ul>
								<li v-if="person.civilName"><b>Nome civil:</b> {{ person.civilName }}</li>
								<li v-if="person.expertise"><b>Especialidade:</b> {{ person.expertise }}</li>
								<li v-if="person.gender"><b>Sexo:</b> {{ person.gender === "F" ? "Feminino" : (person.gender === "M" ? "Masculino" : null)}}</li>
								<li v-if="person.nationality"><b>Nacionalidade:</b> {{ person.nationality  }}</li>
								<li v-if="person.birthDate"><b>Data de nascimento:</b> {{ person.birthDate | formatDatetime }}</li>
								<li v-if="person.birthPlace"><b>Local de nascimento:</b> {{ person.birthPlace }}</li>
								<li v-if="person.deathDate"><b>Data de morte:</b> {{ person.deathDate | formatDatetime }}</li>
								<li v-if="person.deathPlace"><b>Local de morte:</b> {{ person.deathPlace }}</li>
								<li v-if="performances.length > 0"><b>Companhias com as quais trabalhou em São Paulo:</b></li>
							</ul>
						</p>

						<div id="accordion" v-if="performances.length > 0">
							<div class="card " v-for="(performance, index) in performances" :key="index">
								<div class="card-header" :id="`card${index}`" data-toggle="collapse" :data-target="`#collapse${index}`"
								 aria-expanded="false" aria-controls="collapseOne">
									<h5 class="mb-0">
										<button class="btn btn-link">
                      <span class="button-title">
                        Companhia: {{ performance.company }}
                      </span>
                       <router-link
                        :to="`/companhia/${performance.companyId}`"
                        target="_blank"
                        ><i class="icon-double-angle-right"></i>
                      </router-link>
										</button>
									</h5>
								</div>

								<div :id="`collapse${index}`" class="collapse" :aria-labelledby="`card${index}`" data-parent="#accordion">
									<div class="card-body">
										<ul class="iconlist iconlist-color nobottommargin">
											<li v-for="description in performance.descriptions" ><i class="icon-plus-sign"></i>
												<span v-if="description.firstDate !== null && description.lastDate !== null">{{ description.firstDate | formatDatetime }} a {{ description.lastDate | formatDatetime }} - Função: {{ description.role.name }}</span>
											  <span v-else-if="description.firstDate !== null">{{ description.firstDate | formatDatetime }} - Data final desconhecida - Função: {{ description.role.name }} </span>
												<span v-else-if="description.lastDate !== null">Data inicial desconhecida - {{ description.lastDate | formatDatetime }} - Função: {{ description.role.name }} </span>
												<span v-else>Datas desconhecidas - Função: {{ description.role.name }}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<p v-if="formattedConceptions.length > 0">
							<ul>
								<li><b>Espetáculos de cuja concepção participou:</b></li>
							</ul>
						</p>

						<div id="accordion" v-if="formattedConceptions.length > 0">
							<div class="card " v-for="(conception, index) in formattedConceptions" :key="index">
								<div class="card-header" :id="`secondCard${index}`" data-toggle="collapse" :data-target="`#secondCollapse${index}`"
								 aria-expanded="false" aria-controls="collapseOne">
									<h5 class="mb-0">
										<button class="btn btn-link">
                      <span class="button-title">
                        Título da peça: {{ conception.playName }}
                      </span>
                       <router-link
                        :to="`/peca/${conception.playId}`"
                        target="_blank"
                        ><i class="icon-double-angle-right"></i>
                      </router-link>
										</button>
									</h5>
								</div>

								<div :id="`secondCollapse${index}`" class="collapse" :aria-labelledby="`secondCard${index}`" data-parent="#accordion">
									<div class="card-body">
										<ul class="iconlist iconlist-color nobottommargin">
											<li v-for="description in conception.descriptions" >
                        <i class="icon-plus-sign"></i>
                        Função: {{ description.role.name }}
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<p v-if="person.personalPath || person.professionalPath || person.notes || person.bibliography">
							<ul>
								<br><li v-if="person.personalPath"><b>Trajetória pessoal:</b>  <span v-html="person.personalPath"> </span></li>
								<br><li v-if="person.professionalPath"><b>Trajetória artística:</b> <span v-html="person.professionalPath"> </span></li>
								<br><li v-if="person.notes"><b>Notas:</b> <span v-html="person.notes"> </span> </li>
								<br><li v-if="person.bibliography"><b>Bibliografia:</b> <span v-html="person.bibliography"> </span> </li>
							</ul>
						</p>

            <div class="fancy-title title-bottom-border">
							<h3>Como citar</h3>
						</div>

            <p>
              {{ getName() }} In: TEATRO musicado em São Paulo (1914-1934). Coord. por Virgínia de Almeida Bessa. Disponível em: <{{getUrl()}}>. Acesso em: {{getDate()}}
            </p>
					</div>

					<div class="col_two_fifth nobottommargin col_last">

						<div id="job-apply" class="heading-block highlight-me">
							<h2>Fotos</h2>
							<!-- <span>And we'll get back to you within 48 hours.</span> -->
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
							<h3>Não foi possível encontrar essa pessoa.</h3>
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
import Person from "@/api/Person.vue";
import modalPicture from "@/components/Modal.vue";
import moment from "moment";

export default {
  components: {
    modalPicture
  },
  data() {
    return {
      personId: this.$route.params.personId,
      person: {
        id: null,
        visible: 0,
        civilName: "",
        artistName: "",
        gender: null,
        race: null,
        roleId: null,
        expertiseId: null,
        birthDate: null,
        deathDate: "",
        deathPlace: "",
        personalPath: "",
        professionalPath: "",
        notes: "",
        bibliography: "",
        citation: "",
        nationalityId: null,
        nationality: null
      },
      success: true,
      jobs: [],
      conceptionJob: [],

      pictures: [],
      modal: false,
      picture: {
        url:
          "",
        description: "",
        origin: ""
      },
      conceptions: [],
      // //Elenco
      performances: [
        {
          company: "", companyId: "",
          descriptions: [{ firstDate: "", lastDate: "", role: "" }]
        }
      ],
      //Performances
      formattedConceptions: [
        {
          playId: "", playName: "",
          descriptions: [{ firstDate: "", lastDate: "", role: "" }]
        }
      ]
    };
  },
  mounted() {
    Person.getRecord(this.personId)
      .then(result => {
        if (result.person.visible === 0) {
          this.success = false;
        }

        this.person = result.person;
        this.jobs = result.jobs;
        this.conceptions = result.conceptions;
        this.pictures = result.pictures;
        this.filterJobs();
        this.orderString(this.performances);
        this.orderConceptionStrings();
      })
      .catch(error => {
        this.success = false;
        console.error(error);
      });
    this.getDate();
  },
  methods: {
    orderByDate() {
      this.performances.forEach(job => {
        job.descriptions.sort((a, b) => {
          return a.firstDate > b.firstDate;
        });
			});
    },
    openPicture(picture) {
      this.picture = picture;
      this.modal = true;
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
    getName() {
      let name = this.person.artistName.split(" ");
      name[name.length - 1] = name[name.length - 1].toLocaleUpperCase();
      name.unshift(name[name.length - 1]);
      name.splice([name.length - 1], 1);
      return name.join(" ");
    },
    orderString(items) {
      items.sort(function(a, b) {
        return a.name && b.name ? a.name.localeCompare(b.name) : 0;
      });
    },
    orderConceptionStrings(){
      this.formattedConceptions.sort((a, b) => {
        return a.playName && b.playName ? a.playName.localeCompare(b.playName) : 0;
      });
    },
    formatYear(value) {
      if (!value) return "";
      return moment(value).format("YYYY");
    },
    formatDate(value) {
      if (!value) return "";
      return moment(value).format("DD/MM/YYYY");
    },
    sortDates(array) {
      array.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        if (!a || !b) return 0;
        return new Date(a.lastDate) - new Date(b.lastDate);
      });
    },
    groupByCompany() {
      let groupedData = [];

      this.performances.forEach((performance) => {
        this.orderString(performance.descriptions)

        let exist = false
        performance.descriptions.forEach((performanceDescription) => {
          if (groupedData && groupedData.length) {
            groupedData.forEach((groupData) => {
              if (performance.companyId === groupData.companyId) {
                groupData.descriptions.push({
                  role: performanceDescription.role,
                  period: [{
                    firstDate: performanceDescription.firstDate,
                    lastDate:  performanceDescription.lastDate,
                  }],
                })
                exist = true;
              }
            })
          }

          if (!exist) {
            groupedData.push({
              company: performance.company,
              companyId: performance.companyId,
              descriptions: [{
                role: performanceDescription.role,
                period: [{
                  firstDate: performanceDescription.firstDate,
                  lastDate:  performanceDescription.lastDate,
                }],
              }]
            })
          }
        })
      })

      this.performances = groupedData;
    },
    groupByDate() {

      let groupedPeriods = [];

      this.performances.forEach((performance, index) => {

        performance.descriptions.forEach((description, index) => {

          this.sortDates(description.period);
          groupedPeriods.push({
            role: description.role,
            firstDate: formatDate(description.period[0].firstDate),
            lastDate: formatDate(description.period[0].lastDate),
          });

          for (let index = 1; index < description.period.length; index++){

            let dateTmp = formatDate(description.period[index].firstDate).split('/');
            const currentDateStart = new Date(dateTmp[2],dateTmp[1],dateTmp[0]);
            dateTmp = formatDate(description.period[index].lastDate).split('/');
            const currentDateFinal = new Date(dateTmp[2],dateTmp[1],dateTmp[0]);

            let added = 0;
            for (let indexGroup = 0; indexGroup < groupedPeriods.length; indexGroup++){

              dateTmp = groupedPeriods[indexGroup].firstDate.split('/');
              const groupDateStart = new Date(dateTmp[2],dateTmp[1],dateTmp[0]);
              dateTmp = groupedPeriods[indexGroup].lastDate.split('/');
              const groupDateFinal = new Date(dateTmp[2],dateTmp[1],dateTmp[0]);

              if (currentDateStart.getTime() <= groupDateStart.getTime() && currentDateFinal.getTime() <= groupDateFinal.getTime()) { // se o atual começou antes do próximo
              //atualiza a data inicial
                groupedPeriods[indexGroup].firstDate = formatDate(description.period[index].firstDate);

                added++;
                continue;
              }
              else if (currentDateStart.getTime() >= groupDateStart.getTime() &&currentDateFinal.getTime() >= groupDateFinal.getTime()){ //se o atual terminou depois do proximo
              //atualiza data final
                groupedPeriods[indexGroup].lastDate = formatDate(description.period[index].lastDate);
                added++;
                continue;
              } else if (currentDateStart.getTime() <= groupDateStart.getTime() &&currentDateFinal.getTime() >= groupDateFinal.getTime()) { // se o grupo tá no meio do atual, atualiza as duas datas
                groupedPeriods[indexGroup].firstDate = formatDate(description.period[index].firstDate);
                groupedPeriods[indexGroup].lastDate = formatDate(description.period[index].lastDate);

                added++;
                continue;
              }
            }
            if (added === 0) {
              groupedPeriods.push({
                role: description.role,
                firstDate: formatDate(description.period[index].firstDate),
                lastDate: formatDate(description.period[index].lastDate),
              });
            } else if (added > 1) {
              // se adicionou a data a mais de um grupo, existe intersecção entre grupos
              // logo, agrupar periodos
              for (let index = 0; index < groupedPeriods.length-1; index++){
                for (let index2 = index+1; index2 < groupedPeriods.length; index2++){

                  let shouldGroup = true;
                  const firstDate1 = (new Date(groupedPeriods[index].firstDate)).getTime();
                  const firstDate2 = (new Date(groupedPeriods[index2].firstDate)).getTime();
                  const lastDate1 = (new Date(groupedPeriods[index].lastDate)).getTime();
                  const lastDate2 = (new Date(groupedPeriods[index2].lastDate)).getTime();

                  if (firstDate1 > lastDate2 || firstDate2 > lastDate1) {
                    //no intersection between dates
                    shouldGroup = false;

                  } else if (firstDate1 === firstDate2 && lastDate1 <= lastDate2) {

                    groupedPeriods[index].lastDate = groupedPeriods[index2].lastDate;

                  } else if (lastDate1 === lastDate2 && firstDate1 >= firstDate2) {

                    groupedPeriods[index].firstDate = groupedPeriods[index2].firstDate;

                  }

                  if (shouldGroup) {
                    groupedPeriods.splice(index2, 1)
                  }
                }
              }
            }
          }
        })
        this.performances[index].descriptions = groupedPeriods;
        groupedPeriods = [];
      });
    },
    filterJobs() {
      this.jobs.filter(job => !!job).forEach(job => {
        let exist = false;
        //Verificar se a função eh de performance ou concepção
          this.performances.filter((performance, index) => {
            if (job.company.name === performance.company) {
              this.performances[index].descriptions.push({
                firstDate: job.firstDate,
                lastDate: job.lastDate,
                role: job.role
              });
              exist = true;
            }
          });
          if (!exist) {
            let data = {
              company: job.company.name,
              companyId: job.companyId,
              descriptions: [
                {
                  firstDate: job.firstDate,
                  lastDate: job.lastDate,
                  role: job.role
                }
              ]
            };
            this.performances.push(data);
          }
      });


      this.conceptions.forEach(conception => {
        let exist = false;
          this.formattedConceptions.filter((fConception, index) => {
            if (fConception.playId === conception.playId) {
              this.formattedConceptions[index].descriptions.push({
                role: conception.role
              });
              exist = true;
            }
          });
          if (!exist) {
            let data = {
              playId: conception.playId,
              playName: conception.play.name ? conception.play.name : conception.play.originalName,
              descriptions: [
                {
                  role: conception.role
                }
              ]
            };
            this.formattedConceptions.push(data);
          }
      });
      this.formattedConceptions.shift();
      this.performances.shift();
      this.orderByDate();
      this.groupByCompany();
      this.groupByDate();
    }
  }
};

let formatDate = function(value) {
  if (!value) return "";
  return value
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("/");
};
</script>


<style scoped>
#accordion {
  margin-bottom: 30px;
}

.heading-block:after {
  margin-top: 0;
}

.pictures{
  text-align: center;
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

.card-body {
  margin-left: 15px;
}

.btn-link:hover,
.btn-link:active,
.btn-link:focus {
  text-decoration: none;
}

.btn-link {
  color: black;
  margin-left: 15px;
  display: flex;
  align-items: center;
}

.btn-link a{
  /* margin-top: 5px; */
  margin-left: 10px;
  font-size: 20px;
}
</style>
