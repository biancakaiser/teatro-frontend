<template>
	<div>

		<section id="page-title" class="page-title-parallax page-title-dark" style="background: url('/static/images/teatro-colombo.png') center center no-repeat; background-size: cover; box-shadow:inset 0 0 0 2000px rgba(0,0,0,0.5); padding: 75px 0;" data-bottom-top="background-position:0px 300px;" data-top-bottom="background-position:0px -300px;">

			<div class="container clearfix">
				<h1>Ficha de Peça</h1>
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
							<h3>{{play.name ?  play.name : play.originalName | capitalize}}</h3>
						</div>

						<p>
							<ul>
                <li v-if="play.originalName && play.name"><b>Título original:</b> {{play.originalName | capitalize}} </li>
								<li v-if="play.genre"><b>Gênero:</b> {{play.genre|capitalize}} </li>
                <li v-if="play.nationality"><b>Nacionalidade:</b> {{play.nationality|capitalize}} </li>

                <li v-if="filteredConceptions.textAuthor && filteredConceptions.textAuthor.length > 0"><b>Autor do texto:</b> <span v-for="(textAuthor, index) in filteredConceptions.textAuthor"> {{textAuthor.person.length === (index - 1) ? `${textAuthor.person.artistName}, ` : `${textAuthor.person.artistName}.`  }} </span> </li>

                <li v-if="play.referencePlay"><b>Obra de referência:</b> {{ play.referencePlay | capitalize }} </li>

                <li v-if="filteredConceptions.translator && filteredConceptions.translator.length > 0"><b>Tradutor:</b> <span v-for="(translator, index) in filteredConceptions.translate"> {{translator.person.length === (index - 1) ? `${translator.person.artistName}, ` : `${translator.person.artistName}.`  }} </span> </li>

                <li v-if="filteredConceptions.adapter && filteredConceptions.adapter.length > 0"> <b>Adaptador:</b> <span v-for="(adapter, index) in filteredConceptions.adapter"> {{adapter.person.length === (index - 1) ? `${adapter.person.artistName}, ` : `${adapter.person.artistName}.`  }} </span></li>

                <li v-if="filteredConceptions.musicAuthor && filteredConceptions.musicAuthor.length > 0"><b>Autor da música:</b> <span v-for="(musicAuthor, index) in filteredConceptions.musicAuthor"> {{musicAuthor.person.length === (index - 1) ? `${musicAuthor.person.artistName}, ` : `${musicAuthor.person.artistName}.`  }} </span> </li>

                <li v-if="filteredConceptions.musicArranjer && filteredConceptions.musicArranjer.length > 0"><b>Arranjador da música:</b> <span v-for="(musicArranjer, index) in filteredConceptions.musicArranjer"> {{musicArranjer.person.length === (index - 1) ? `${musicArranjer.person.artistName}, ` : `${musicArranjer.person.artistName}.`  }} </span> </li>

                <li v-if="play.globalFirstDate"><b>Estreia mundial:</b> {{ play.globalFirstDate }} </li>
								<li v-if="play.spFirstDate"><b>Estreia em São Paulo:</b> {{ play.spFirstDate }} </li>
								<li v-if="groupedSettings.length > 0"><b>Montagens em São Paulo:</b></li>
							</ul>
						</p>

						<div id="accordion" v-if="groupedSettings.length > 0">
							<div class="card" v-for="(setting, index) in groupedSettings" :key="index">
								<div class="card-header" :id="`card${index}`" data-toggle="collapse" :data-target="`#collapse${index}`" aria-expanded="true"
										 aria-controls="collapseOne">
									<h5 class="mb-0">
										<button class="btn btn-link">

                      <span class="button-title">
                        Companhia: {{ setting.company |capitalize }}
                      </span>
                       <router-link
                        :to="`/companhia/${setting.companyId}`"
                        target="_blank"
                        ><i class="icon-double-angle-right"></i>
                      </router-link>


										</button>
									</h5>
								</div>
								<div :id="`collapse${index}`" class="collapse" aria-labelledby="`card${index}`" data-parent="#accordion">
									<div class="card-body">
										<ul class="iconlist iconlist-color nobottommargin">
										<li v-for="(setting, index) in setting.data" ><i class="icon-plus-sign"></i>Gênero: {{play.genre |capitalize}} - Idioma: {{setting.language ? setting.language : 'Desconhecido'}} - Ano: {{setting.year}}</li>
									</ul>
									</div>
								</div>
							</div>
						</div>
						<p v-if="play.pressReleases || play.pressReviews || play.bibliography || play.source ">
							<ul>
                <br><li v-if="play.pressReleases"><b>Trajetória:</b> <span v-html="play.pressReleases"> </span></li>
                <br><li v-if="play.pressReviews"><b>Críticas na imprensa:</b> <span v-html="play.pressReviews"> </span></li>
								<br><li v-if="play.bibliography"><b>Bibliografia:</b> <span v-html="play.bibliography"> </span> </li>
								<br><li v-if="play.source"><b>Fontes primárias:</b> <span v-html="play.source"> </span></li>
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
							<h3>Não foi possível encontrar essa peça.</h3>
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
import PlayAPI from "@/api/Play.vue";
import modalPicture from "@/components/Modal.vue";

export default {
  components: {
    modalPicture
  },
  data() {
    return {
      playId: this.$route.params.playId,
      play: {},
      settings: [],
      // conceptions: [],
      // pictures: [],
      groupedSettings: [
        {
          company: "",
          companyId: '',
          data: [{ year: "", genre: "", language: "" }]
        }
      ],
      filteredConceptions: {
        musicAuthor: null,
        translator: null,
        adapter: null,
        musicArranjer: null,
        textAuthor: null,
      },
      pictures: [],
      modal: false,
      picture: {
        url:
          "",
        description: "",
        origin: ""
      },
      conceptions: [],
      success: true
    };
  },
  mounted() {
    PlayAPI.getRecord(this.playId)
      .then(result => {
        if (result.play.visible === 0) this.success = false;
        this.play = result.play;
        this.settings = result.settings;
        this.conceptions = result.conceptions;
        this.pictures = result.pictures;
        this.settings.forEach(setting => {
          let exist = false;
          this.groupedSettings.filter((groupedSetting, index) => {
            if (setting.company.name === groupedSetting.company) {
              let registerDate = this.groupedSettings[index].data.find(data => {
                return data.year === setting.year;
              });
              if (!registerDate) {
                this.groupedSettings[index].data.push({
                  genre: setting.genre,
                  year: setting.year,
                  language: setting.language
                });
              }
              exist = true;
            }
          });
          if (!exist) {
            let data = {
              company: setting.company.name,
              companyId: setting.companyId,
              data: [
                {
                  genre: setting.genre,
                  year: setting.year,
                  language: setting.language
                }
              ]
            };
            this.groupedSettings.push(data);
          }
          // this.play.musicAuthor = setting.castMembers.filter(member => {
          //   return member.role === "Autor da música";
          // });
        });
        this.groupedSettings.shift();
        this.orderString(this.groupedSettings);
        this.orderByYear();
        this.filterConceptions();
      })
      .catch(error => {
        this.success = false;
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
    getName(){
      let name = [];
      if(this.play.name){
        name = this.play.name.split(" ");
      }
      else if (this.play.originalName){
        name  = this.play.originalName.split(" ");
      }

      if(name[0]) {
        if(name[0].length < 3){
      // getName(){
      //   let name = this.play.originalName.split(" ");
      //   if (name[0].length < 3) {
          name[0] = name[0].toLocaleUpperCase();
          name[1] = name[1].toLocaleUpperCase();
        } else {
          name[0] = name[0].toLocaleUpperCase();
        }
        return name.join(" ");
      }
    },
    orderString(items) {
      items.sort(function(a, b) {
        return a.company && b.company ? a.company.localeCompare(b.company) : 0;
      });
    },
    orderByYear() {
      this.groupedSettings.forEach(setting => {
        setting.data.sort(function(a, b) {
          if (!a || !b) return 0;
          return a.year - b.year;
        });
      });
    },
    filterConceptions(){
      this.filteredConceptions.musicAuthor =  this.conceptions.filter(conception => {
        return conception.role.name === "Autor da música";
      });
      this.filteredConceptions.translator =  this.conceptions.filter(conception => {
        return conception.role.name === "Tradutor";
      })
      this.filteredConceptions.adapter =  this.conceptions.filter(conception => {
        return conception.role.name === "Adaptador";
      })
      this.filteredConceptions.musicArranjer =  this.conceptions.filter(conception => {
        return conception.role.name === "Arranjador da música";
      })
      this.filteredConceptions.textAuthor =  this.conceptions.filter(conception => {
        return conception.role.name === "Autor do texto";
      })
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
  display: flex;
  align-items: center;
}

.card-body {
  margin-left: 15px;
}

.btn-link:hover,
.btn-link:active,
.btn-link:focus {
  text-decoration: none;
}

.btn-link a{
  /* margin-top: 5px; */
  margin-left: 10px;
  font-size: 20px;
}

.pictures{
  text-align: center;
}
</style>
