<template>
	<div>

		<section id="page-title" class="page-title-parallax page-title-dark" style="background: url('/static/images/teatro-colombo.png') center center no-repeat; background-size: cover; box-shadow:inset 0 0 0 2000px rgba(0,0,0,0.5); padding: 75px 0;" data-bottom-top="background-position:0px 300px;" data-top-bottom="background-position:0px -300px;">

			<div class="container clearfix">
				<h1>Busca de Pessoas</h1>
			</div>

		</section><!-- #page-title end -->

		<!-- Content
		============================================= -->
		<section id="content">

			<div class="content-wrap">

				<div class="container clearfix">

					<div class="col-12">

						<div class="fancy-title title-bottom-border">
							<h3>Filtros de pesquisa</h3>
						</div>

						<form @submit.prevent="submitSearch">

							<div class="row">
								<div class="col-12 search-input">
									<label>Nome artístico ou civil</label>
									<input type="text" class="form-control" v-model="searchParameters.personName">
								</div>
							</div>

							<div class="row">
								<div class="divcenter">
									<h3>ou</h3>
								</div>
							</div>

							<div class="row">
								<div class="col-12 col-md-6 search-input">
									<label>Sexo</label>
									<select class="form-control" v-model="searchParameters.gender">
										<option :value="null" >Escolha uma opção</option>
										<option :value="'F'">Feminino</option>
										<option :value="'M'">Masculino</option>
										<!-- <option :value="'O'">Outro</option> -->
									</select>
								</div>
								<div class="col-12 col-md-6 search-input">
									<label>Nacionalidade</label>
									<select class="form-control" style="" v-model="searchParameters.nationalityId">
										<option :value="null" >Escolha uma opção</option>
										<option v-for="(item, index) in nationalitiesPerson.nationalitiesPerson" :key="index" :value="item.nationalityId">{{ item.nationalityName |capitalize }}</option>
									</select>
								</div>
							</div>

							<div class="row" >
								<div class="col-12 search-input">
									<input style="margin-right: 10px;margin-top: 0px;" type="checkbox" v-model="roleSearch" id="roleSearch">
									<label for="roleSearch">Filtrar por atividades</label>
								</div>
							</div>

							<div v-if="roleSearch">
								<div class="fancy-title title-bottom-border">
									<h3>Filtros de atividade</h3>
								</div>

								<div class="row">
									<div class="col-12 col-md-5 offset-md-1">
										<div class="row" v-for="(item, index) in entries.roles" :key="index">
											<input style="margin-right: 10px;margin-top: 3px;" type="checkbox" :id="item.id" :value="item.name|capitalize" v-model="selectedRolesNames">
											<label :for="item.id">{{ item.name|capitalize}}</label>
										</div>
									</div>

									<div class="col-12 col-md-4 offset-md-2" style="padding-top: 1rem;">
										<label>Restrição de atividades</label>
											<div class="row">
												<input style="margin-right: 10px" v-model="allRoles" :value="true" type="radio" id="allRoles">
												<label for="allRoles">Todas</label>
											</div>
											<div class="row">
												<input style="margin-right: 10px" v-model="allRoles" :value="false" type="radio" id="notAllRoles">
												<label for="notAllRoles">Qualquer</label>
											</div>
									</div>
								</div>

							</div>

							<div class="row">
								<div class="col-12 col-md-6 divcenter" style="margin-bottom: 30px; margin-top: 30px; text-align: center;">
									<button v-if="showButton" class="button" type="submit" style="border-radius: 5px;">Pesquisar</button>
									 <button v-if="showButton" class="button" style="border-radius: 5px;"  @click.prevent="clearData">
                    Limpar Filtros
                  </button>
									<div v-if="!showButton" class="spinner">
									<rotate-square2></rotate-square2>
								</div>
								</div>

							</div>

						</form>

					</div>

				</div>

				<div class="container clearfix">

					<div class="table-responsive">
						<table id="datatable1" class="table table-striped table-bordered" cellspacing="0" width="100%">
							<thead>
								<tr>
									<th>Nome artístico</th>
									<th>Nome Civil</th>
									<th>Nascimento</th>
									<th>Morte</th>
									<!-- <th>Trabalhos</th> -->
								</tr>
							</thead>
							<tbody>

								<tr v-for="(person, index) in filteredPeople" :key="index"  :style="person.visible ? `cursor: pointer;` : `cursor: default;`">
									<td>
                    <p v-if="!person.visible" class="mb-0">{{ person.artistName }}</p>
                    <router-link v-else :to="`/pessoa/${person.id}`" target="_blank">{{ person.artistName }}</router-link>
                  </td>
									<td>{{ person.civilName }}</td>
									<td>{{ person.birthDate | formatDatetime }}</td>
									<td>{{ person.deathDate | formatDatetime }}</td>
									<!-- <td style="padding-left: 2rem;">
										<ul style="margin: 0;">
											<li v-for="(job, index) in person.jobs" :key="index">{{ job }}</li>
										</ul>
									</td> -->
								</tr>

								<tr v-if="!filteredPeople.length">
									<td>Nenhum encontrado</td>
									<td></td><td></td><td></td><td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>



<script>
import Search from "@/api/Search.vue";
import { RotateSquare2 } from "vue-loading-spinner";

export default {
  name: "PersonSearch",
  components: {
    RotateSquare2
  },
  data() {
    return {
      searchParameters: {
        personName: "",
        nationalityId: null,
        gender: ""
        // race: null,
      },
      entries: {
        nationalities: [],
        genres: [],
        companies: [],
        theaters: [],
        plays: [],
        success: null
	  },
	  nationalitiesPerson: [],
      showButton: true,
      people: [],
      allRoles: false,
      selectedRolesNames: [],
      roleSearch: false
    };
  },
  mounted() {
    $(".bt-switch").bootstrapSwitch();
    // $('#datatable1').dataTable();

    Search.getSearchEntries()
      .then(response => {
				this.entries = response;
				this.orderString(this.entries.nationalities);
				this.orderString(this.entries.roles);
      })
      .catch(error => {
        console.error(error);
        alert("Erro na consulta do servidor");
	  });

	  Search.getNationalitiesPerson()
	  .then(response => {
		this.nationalitiesPerson = response;
      })
      .catch(error => {
        console.log(error);
        this.showFailSwal("Erro na consulta do servidor.");
	  });
  },
  methods: {
    submitSearch() {
      this.showButton = false;
      Search.getPeople(this.searchParameters)
        .then(response => {
          this.people = response;
          this.showButton = true;
        })
        .catch(error => {
          this.showButton = true;
          console.error(error);
          alert("Erro: error");
        });
		},
		orderString(items) {
      items.sort(function(a, b) {
        return a.name && b.name ? a.name.localeCompare(b.name) : 0;
      });
    },
		clearData(){
			this.searchParameters.personName = '';
      this.searchParameters. nationalityId =  null;
			this.searchParameters.gender = "";
			this.selectedRolesNames = [];
			this.roleSearch = false;
		}
	},
  computed: {
    filteredPeople() {
      if (!this.roleSearch || !this.selectedRolesNames.length) return this.people;

      return this.people
        .map(person => {
          const jobsIncluded = this.selectedRolesNames.map(name => person.jobs.includes(name));

          if (!this.allRoles && jobsIncluded.includes(true) || this.allRoles && !jobsIncluded.includes(false)) {
						return person;
					}
        })
        .filter(element => element !== undefined);
		}
  }
};
</script>


<style>
.heading-block:after {
  margin-top: 0;
}

.search-input {
  margin-bottom: 40px;
}

.table td {
  vertical-align: middle !important;
}

.spinner {
  margin: 30px auto 50px auto;
}

#spinner:after {
  background: #ef5342 !important;
  width: 50px !important;
  height: 50px !important;
}

#spinner:before {
  width: 50px !important;
}

.pcfhb-input .validate-group {
  margin: 0px;
}
</style>
