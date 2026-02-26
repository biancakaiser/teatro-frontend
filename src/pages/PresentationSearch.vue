<template>
  <div>
    <section
      id="page-title"
      class="page-title-parallax page-title-dark"
      style="background: url('/static/images/teatro-colombo.png') center center no-repeat; background-size: cover; box-shadow:inset 0 0 0 2000px rgba(0,0,0,0.5); padding: 75px 0;"
      data-bottom-top="background-position:0px 300px;"
      data-top-bottom="background-position:0px -300px;"
    >
      <div class="container clearfix">
        <h1>Busca de Espetáculos</h1>
      </div>
    </section>
    <!-- #page-title end -->
    <!-- Content
    =============================================-->
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div class="col-12">
            <div class="fancy-title title-bottom-border">
              <h3>Dados da Peça</h3>
            </div>

            <form @submit.prevent="validate()">
              <div class="row">
                <div class="col-12 col-md-5 search-input">
                  <label>Título da peça</label>
                  <select class="form-control" style v-model="playParameters.playId">
                    <option :value="null">Todos</option>
                    <option
                      v-for="(item, index) in entries.plays"
                      :key="index"
                      :value="item.id"
                    >{{ item.name |capitalize }}</option>
                  </select>
                </div>
                <div class="col-12 col-md-2">
                  <div class="divcenter verticalMiddle" style="text-align: center;">
                    <p style="font-size: 1.3rem; font-weight: bold; margin: 0;">ou</p>
                  </div>
                </div>
                <div class="col-12 col-md-5 search-input">
                  <label>Busca por palavras do título</label>
                  <input type="text" class="form-control" v-model="playParameters.playName">
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-md-6 search-input">
                  <label>Gênero</label>
                  <select class="form-control" style v-model="playParameters.genreId">
                    <option :value="null">Todos</option>
                    <option
                      v-for="(item, index) in entries.genres"
                      :key="index"
                      :value="item.id"
                    >{{ item.name |capitalize}}</option>
                  </select>
                </div>
                <div class="col-12 col-md-6 search-input">
                  <label>Nacionalidade da peça</label>
                  <select class="form-control" style v-model="playParameters.nationalityId">
                    <option :value="null">Todos</option>
                    <option
                      v-for="(item, index) in nationalitiesPresentation.nationalitiesPlay"
                      :key="index"
                      :value="item.nationalityId"
                    >
                      {{ item.nationalityName |capitalize
                      }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-md-6 search-input">
                  <label>Autor do texto</label>
                  <select class="form-control" style v-model="playParameters.playAuthorPersonId">
                    <option :value="null">Todos</option>
                    <option
                      v-for="(item, index) in entries.jobs['Autor do texto']"
                      :key="index"
                      :value="item.id"
                    >
                      {{
                      item.name | capitalize }}
                    </option>
                  </select>
                </div>
                <div class="col-12 col-md-6 search-input">
                  <label>Tradutor</label>
                  <select
                    class="form-control"
                    style
                    v-model="playParameters.playTranslatorPersonId"
                  >
                    <option :value="null">Todos</option>
                    <option
                      v-for="(item, index) in entries.jobs['Tradutor']"
                      :key="index"
                      :value="item.id"
                    >
                      {{
                      item.name | capitalize}}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-md-4 search-input">
                  <label>Adaptador</label>
                  <select class="form-control" style v-model="playParameters.playAdaptorPersonId">
                    <option :value="null">Todos</option>
                    <option
                      v-for="(item, index) in entries.jobs['Adaptador']"
                      :key="index"
                      :value="item.id"
                    >
                      {{
                      item.name | capitalize }}
                    </option>
                  </select>
                </div>
                <div class="col-12 col-md-4 search-input">
                  <label>Autor da música</label>
                  <select class="form-control" style v-model="playParameters.musicAuthorPersonId">
                    <option :value="null">Todos</option>
                    <option
                      v-for="(item, index) in entries.jobs['Autor da música']"
                      :key="index"
                      :value="item.id"
                    >
                      {{
                      item.name | capitalize }}
                    </option>
                  </select>
                </div>
                <div class="col-12 col-md-4 search-input">
                  <label>Arranjador</label>
                  <select class="form-control" style v-model="playParameters.musicArrangerPersonId">
                    <option :value="null">Todos</option>
                    <option
                      v-for="(item, index) in entries.jobs['Arranjador']"
                      :key="index"
                      :value="item.id"
                    >
                      {{
                      item.name | capitalize }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <div class="fancy-title title-bottom-border" style="margin-top: 50px">
                  <h3>Dados de montagem</h3>
                </div>

                <div class="row">
                  <div class="col-12 col-md-5 search-input">
                    <label>Companhia</label>
                    <select class="form-control" style v-model="settingParameters.companyId">
                      <option :value="null">Todos</option>
                      <option
                        v-for="(item, index) in entries.companies"
                        :key="index"
                        :value="item.id"
                      >{{ item.name|capitalize }}</option>
                    </select>
                  </div>
                  <div class="col-12 col-md-2">
                    <div class="divcenter verticalMiddle" style="text-align: center;">
                      <p style="font-size: 1.3rem; font-weight: bold; margin: 0;">ou</p>
                    </div>
                  </div>
                  <div class="col-12 col-md-5 search-input">
                    <label>Busca por palavras do nome da Companhia</label>
                    <input type="text" class="form-control" v-model="settingParameters.companyName">
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-md-6 search-input">
                    <label>Nacionalidade da Companhia</label>
                    <select
                      class="form-control"
                      style
                      v-model="settingParameters.companyNationalityId"
                    >
                      <option :value="null">Todos</option>
                      <option
                        v-for="(item, index) in nationalitiesPresentation.nationalitiesCompany"
                        :key="index"
                        :value="item.nationalityId"
                      >
                        {{ item.nationalityName|capitalize
                        }}
                      </option>
                    </select>
                  </div>
                  <div class="col-12 col-md-6 search-input">
                    <label>Teatro</label>
                    <select class="form-control" style v-model="settingParameters.theaterId">
                      <option :value="null">Todos</option>
                      <option
                        v-for="(item, index) in entries.theaters"
                        :key="index"
                        :value="item.id"
                      >{{ item.name|capitalize }}</option>
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-md-6 search-input">
                    <label>Tipo de espetáculo</label>
                    <select class="form-control" v-model="settingParameters.kind">
                      <option :value="null">Todos</option>
                      <option :value="'COMPLETE'">Completo</option>
                      <option :value="'SESSIONS'">Sessões</option>
                      <option :value="'STAGE_SCREEN'">Palco e Tela</option>
                    </select>
                  </div>
                  <div class="col-12 col-md-6 search-input">
                    <label>Idioma da representação</label>
                    <select class="form-control" style v-model="settingParameters.languageId">
                      <option :value="null">Todos</option>
                      <option
                        v-for="(item, index) in entries.languages"
                        :key="index"
                        :value="item.id"
                      >{{ item.name|capitalize }}</option>
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-md-6 search-input">
                    <label>Data Inicial</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="settingParameters.startDate"
                      v-validate="'date_format:DD/MM/YYYY'"
                      v-mask="['##/##/####']"
                      placeholder="DD/MM/AAAA"
                    >
                  </div>
                  <div class="col-12 col-md-6 search-input">
                    <label>Data Final</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="settingParameters.endDate"
                      v-validate="'date_format:DD/MM/YYYY'"
                      v-mask="['##/##/####']"
                      placeholder="DD/MM/AAAA"
                    >
                  </div>
                </div>
              </div>

              <div class="row">
                <div
                  class="col-12 col-md-6 divcenter"
                  style="margin-bottom: 30px; margin-top: 30px; text-align: center;"
                >
                  <button v-if="showButton" class="button" type="submit" style="border-radius: 5px;">Pesquisar</button>
                  <button v-if="showButton" class="button" style="border-radius: 5px;"  @click.prevent="clearData">
                    Limpar Filtros
                  </button>
                  <div v-if="!showButton" class="spinner">
                    <rotate-square2 id="spinner"></rotate-square2>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="container clearfix" v-if="searched">
          <div class="row">
            <div class="col-12 search-input">
              <label>Resultados</label>
              <select class="form-control" style v-model="resultType">
                <option value="COMPLETE">Completos</option>
                <option value="COMPANY">Resumidos por companhia</option>
                <option value="PLAY">Resumidos por peça</option>
              </select>
            </div>
          </div>

          <div class="table-responsive" v-if="resultType === 'COMPLETE'">
            <h2>Resultados completos</h2>
            <h4>Total de representações: {{ allPresentations }}</h4>

            <div class="row">
              <div class="col-12" style="width: 50%; margin: 20px auto; text-align: center">
                Mostrando {{presentations.length}}
                de {{totalPresentations}} resultados de busca
              </div>
              <div class="col-12">
                <div
                  class="dataTables_paginate paging_simple_numbers"
                  style="width: 50%; margin: 0 auto;"
                >
                  <ul class="pagination">
                    <div class="row" style="margin: 0 auto; width: 100%;">
                      <div
                        v-for="pageNumber in totalPages"
                        style="margin: 10px auto; width: 40px; text-align:center"
                      >
                        <li
                          style="margin: 0 auto;"
                          class="paginate_button page-item"
                          :class="{active: resultsPage === pageNumber}"
                        >
                          <a
                            @click.prevent="submitSearch(pageNumber)"
                            href="#"
                            aria-controls="datatable1"
                            data-dt-idx="1"
                            tabindex="0"
                            class="page-link"
                          >{{ pageNumber }}</a>
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>

            <table
              id="datatable1"
              class="table table-striped table-bordered"
              cellspacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Teatro</th>
                  <th>Companhia</th>
                  <th style="width: 105px;">Tipo Espet.</th>
                  <th>Nac. Cia.</th>
                  <th>Título da Peça</th>
                  <th>Rep.</th>
                  <th>Gênero</th>
                  <th>Idioma</th>
                  <th>Nac. Peça.</th>
                  <th>Autores</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(presentation, index) in filteredPresentations" :key="index">
                  <td>{{ presentation.presentationDate | formatDatetime}}</td>
                  <td>
                    <router-link
                      :to="`/teatro/${presentation.theaterId}`"
                      target="_blank"
                    >{{ presentation.theaterName }}</router-link>
                  </td>
                  <td>
                    <router-link
                      :to="`/companhia/${presentation.companyId}`"
                      target="_blank"
                    >{{ presentation.companyName }}</router-link>
                  </td>
                  <td style="width: 105px;">{{ presentation.kind | formatSettingKind}}</td>
                  <td>{{ presentation.companyNationality }}</td>
                  <td>
                    <p v-if="!presentation.playVisible" class="mb-0">{{ presentation.playName }}</p>
                    <router-link
                      v-else
                      :to=" `/peca/${presentation.playId}`"
                      target="_blank"
                    >{{ presentation.playName }}</router-link>
                  </td>
                  <td>{{ presentation.sessionsNumber }}</td>
                  <td>{{ presentation.playGenre }}</td>
                  <td>{{ presentation.language }}</td>
                  <td>{{ presentation.playNationality }}</td>

                  <td style="padding-left: 2rem;">
                    <ul style="margin: 0;">
                      <li v-for="(member, index) in presentation.conceptions" :key="index">
                        {{ member.role }}:
                        <p v-if="member.visible === '0' || member.visible === 0" class="mb-0">{{ member.name }}</p>
                        <router-link
                          v-else
                          :to="`/pessoa/${member.personId}`"
                          target="_blank"
                        >{{ member.name }}</router-link>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr v-if="!filteredPresentations.length">
                  <td colspan="14">Nenhum encontrado</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-responsive" v-if="resultType === 'COMPANY'">
            <h2>Resultados resumidos por companhia</h2>
            <h4>Total de companhias: {{ companyCount }}</h4>
            <h4>Total de representações: {{ allPresentations }}</h4>

            <div class="row">
              <div class="col-12" style="width: 50%; margin: 20px auto; text-align: center">
                Mostrando {{presentations.length}}
                de {{totalPresentations}} resultados de busca
              </div>
              <div class="col-12">
                <div
                  class="dataTables_paginate paging_simple_numbers"
                  style="width: 50%; margin: 0 auto;"
                >
                  <ul class="pagination">
                    <div class="row" style="margin: 0 auto; width: 100%;">
                      <div
                        v-for="pageNumber in totalPages"
                        style="margin: 10px auto; width: 40px; text-align:center"
                      >
                        <li
                          style="margin: 0 auto;"
                          class="paginate_button page-item"
                          :class="{active: resultsPage === pageNumber}"
                        >
                          <a
                            @click.prevent="submitSearch(pageNumber)"
                            href="#"
                            aria-controls="datatable1"
                            data-dt-idx="1"
                            tabindex="0"
                            class="page-link"
                          >{{ pageNumber }}</a>
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>

            <table
              id="datatable2"
              class="table table-striped table-bordered"
              cellspacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th>Companhia</th>
                  <th>Nac. Cia.</th>
                  <th>Título da Peça</th>
                  <th>Gênero</th>
                  <th>Idioma</th>
                  <th>Autores</th>
                  <th>Data</th>
                  <th>Teatro</th>
                  <th style="width: 105px;">Tipo Espet.</th>
                  <th>Rep.</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(company, companyIndex) in presentationsByCompany">
                  <template v-for="(play, playIndex) in company.plays">
                    <template v-for="(presentation, presentationIndex) in play.presentations">
                      <tr>
                        <td
                          v-if="playIndex === 0 && presentationIndex === 0"
                          :rowspan="company.linesTable"
                        >
                          <router-link
                            :to="`/companhia/${company.id}`"
                            target="_blank"
                          >{{ company.name }}</router-link>
                        </td>

                        <td
                          v-if="playIndex === 0 && presentationIndex === 0"
                          :rowspan="company.linesTable"
                        >
                          {{
                          company.nationality }}
                        </td>

                        <td v-if="presentationIndex === 0" :rowspan="play.presentations.length">
                          <router-link :to="`/peca/${play.id}`" target="_blank">{{ play.name }}</router-link>
                        </td>

                        <td
                          v-if="presentationIndex === 0"
                          :rowspan="play.presentations.length"
                        >{{ play.genre }}</td>

                        <td
                          v-if="presentationIndex === 0"
                          :rowspan="play.presentations.length"
                        >{{ play.language }}</td>

                        <td
                          v-if="presentationIndex === 0"
                          :rowspan="play.presentations.length"
                          style="padding-left: 2rem;"
                        >
                          <ul style="margin: 0;">
                            <li v-for="(member, index) in play.jobs" :key="index">
                              {{ member.role }}:
                              <p v-if="member.visible === '0' || member.visible === 0" class="mb-0">{{ member.name }}</p>
                              <router-link
                                v-else
                                :to="`/pessoa/${member.personId}`"
                                target="_blank"
                              >{{ member.name }}</router-link>
                            </li>
                          </ul>
                        </td>

                        <td>{{ presentation.date }}</td>
                        <td>
                          <router-link
                            :to="`/teatro/${presentation.theaterId}`"
                            target="_blank"
                          >{{ presentation.theater }}</router-link>
                        </td>
                        <td>{{ presentation.kind | formatSettingKind }}</td>
                        <td>{{ presentation.sessionsNumber }}</td>
                      </tr>
                      <tr v-if="!filteredPresentations.length">
                        <td colspan="14">Nenhum encontrado</td>
                      </tr>
                    </template>
                  </template>
                </template>
              </tbody>
            </table>
          </div>

          <div class="table-responsive" v-if="resultType === 'PLAY'">
            <h2>Resultados resumidos por peça</h2>
            <h4>Total de peças: {{ allPlays }}</h4>
            <h4>Total de representações: {{ allPresentations }}</h4>

            <div class="row">
              <div class="col-12" style="width: 50%; margin: 20px auto; text-align: center">
                Mostrando {{presentations.length}}
                de {{totalPresentations}} resultados de busca
              </div>
              <div class="col-12">
                <div
                  class="dataTables_paginate paging_simple_numbers"
                  style="width: 50%; margin: 0 auto;"
                >
                  <ul class="pagination">
                    <div class="row" style="margin: 0 auto; width: 100%;">
                      <div
                        v-for="pageNumber in totalPages"
                        style="margin: 10px auto; width: 40px; text-align:center"
                      >
                        <li
                          style="margin: 0 auto;"
                          class="paginate_button page-item"
                          :class="{active: resultsPage === pageNumber}"
                        >
                          <a
                            @click.prevent="submitSearch(pageNumber)"
                            href="#"
                            aria-controls="datatable1"
                            data-dt-idx="1"
                            tabindex="0"
                            class="page-link"
                          >{{ pageNumber }}</a>
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>

            <table
              id="datatable3"
              class="table table-striped table-bordered"
              cellspacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th>Título da Peça</th>
                  <th>Gênero</th>
                  <th>Nac. Peça.</th>
                  <th>Idioma</th>
                  <th>Companhia</th>
                  <th>Nac. Cia.</th>
                  <th>Autores</th>
                  <th>Ano</th>
                  <th>Teatro</th>
                  <th style="width: 105px;">Tipo Espet.</th>
                  <th>Rep.</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(play, playIndex) in presentationsByPlay">
                  <template v-for="(company, companyIndex) in play.companies">
                    <template v-for="(presentation, presentationIndex) in company.presentations">
                      <tr>
                        <td
                          v-if="companyIndex === 0 && presentationIndex === 0"
                          :rowspan="play.linesTable"
                        >
                          <router-link :to="`/peca/${play.id}`" target="_blank">{{ play.name }}</router-link>
                        </td>
                        <td
                          v-if="companyIndex === 0 && presentationIndex === 0"
                          :rowspan="play.linesTable"
                        >
                          {{ play.genre
                          }}
                        </td>
                        <td
                          v-if="companyIndex === 0 && presentationIndex === 0"
                          :rowspan="play.linesTable"
                        >
                          {{
                          play.nationality }}
                        </td>
                        <td
                          v-if="companyIndex === 0 && presentationIndex === 0"
                          :rowspan="play.linesTable"
                        >
                          {{
                          play.language }}
                        </td>
                        <td v-if="presentationIndex === 0" :rowspan="company.presentations.length">
                          <router-link
                            :to="`/companhia/${company.id}`"
                            target="_blank"
                          >{{ company.name }}</router-link>
                        </td>
                        <td
                          v-if="presentationIndex === 0"
                          :rowspan="company.presentations.length"
                        >{{ company.nationality }}</td>
                        <td
                          v-if="presentationIndex === 0"
                          :rowspan="company.presentations.length"
                          style="padding-left: 2rem;"
                        >
                          <ul style="margin: 0;">
                            <li v-for="(member, index) in company.jobs" :key="index">
                              {{ member.role }}:
                              <p v-if="member.visible === '0' || member.visible === 0" class="mb-0">{{ member.name }}</p>
                              <router-link
                                v-else
                                :to="`/pessoa/${member.personId}`"
                                target="_blank"
                              >{{ member.name }}</router-link>
                            </li>
                          </ul>
                        </td>
                        <td>{{ presentation.date }}</td>
                        <td>
                          <router-link
                            :to="`/teatro/${presentation.theaterId}`"
                            target="_blank"
                          >{{ presentation.theater }}</router-link>
                        </td>
                        <td>{{ presentation.kind | formatSettingKind }}</td>
                        <td>{{ presentation.sessionsNumber }}</td>
                      </tr>
                      <tr v-if="!filteredPresentations.length">
                        <td colspan="14">Nenhum encontrado</td>
                      </tr>
                    </template>
                  </template>
                </template>
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
import moment from "moment";
import Vue from "vue";
import VeeValidate from "vee-validate";
import swal from "sweetalert2";

// Vue.use(VueSweetalert2);
Vue.use(VeeValidate);

const getISODate = slashDate =>
  slashDate ? moment(slashDate, "DD-MM-YYYY").format("YYYY-MM-DD") : null;

export default {
  name: "PresentationSearch",
  components: {
    RotateSquare2
  },
  data() {
    return {
      playParameters: {
        playId: null,
        playName: "",
        genreId: null,
        nationalityId: null,
        playAuthorPersonId: null,
        playTranslatorPersonId: null,
        playAdaptorPersonId: null,
        musicAuthorPersonId: null,
        musicArrangerPersonId: null
      },
      settingParameters: {
        companyId: null,
        companyName: "",
        companyNationalityId: null,
        theaterId: null,
        kind: null,
        languageId: null,
        startDate: null,
        endDate: null
      },
      entries: {
        nationalities: [],
        genres: [],
        companies: [],
        theaters: [],
        plays: [],
        languages: [],
        jobs: {
          "Autor do texto": [],
          Tradutor: [],
          Adaptador: [],
          "Autor da música": [],
          "Arranjador da música": []
        },
        success: null
      },
      nationalitiesPresentation: {
        nationalitiesPlay: [],
        nationalitiesCompany: []
      },
      searched: false,
      showButton: true,
      resultType: "COMPLETE",
      presentations: [],
      resultsPage: 1,
      totalPresentations: null,
      totalPages: null,
      sumPresentations: null,
      companyCount: 0,
    };
  },
  mounted() {
    $(".bt-switch").bootstrapSwitch();
    // $('#datatable1').dataTable();

    Search.getSearchEntries()
      .then(response => {
        this.entries = response;
        this.orderString(this.entries.nationalities);
        this.orderString(this.entries.genres);
        this.orderString(this.entries.companies);
        this.orderString(this.entries.languages);
        this.orderString(this.entries.theaters);
        this.orderString(this.entries.plays);
      })
      .catch(error => {
        console.error(error);
        this.showFailSwal("Erro na consulta do servidor.");
      });

    Search.getNationalitiesPresentation()
      .then(response => {
        this.nationalitiesPresentation = response;
      })
      .catch(error => {
        console.log(error);
        this.showFailSwal("Erro na consulta do servidor.");
      });
  },
  methods: {
    orderString(items) {
      if(items) {
        items.sort(function(a, b) {
          return a.name && b.name ? a.name.localeCompare(b.name) : 0;
        });
      }
    },
    clearData() {
      this.sumPresentations = 0;
      let playParameters = {
        playId: null,
        playName: "",
        genreId: null,
        nationalityId: null,
        playAuthorPersonId: null,
        playTranslatorPersonId: null,
        playAdaptorPersonId: null,
        musicAuthorPersonId: null,
        musicArrangerPersonId: null
      };
      let settingParameters = {
        companyId: null,
        companyName: "",
        companyNationalityId: null,
        theaterId: null,
        kind: null,
        languageId: null,
        startDate: null,
        endDate: null
      };
      this.playParameters = playParameters;
      this.settingParameters = settingParameters;
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.submitSearch();
        } else {
          this.showFailSwal("Preencha as datas corretamente.");
        }
      });
    },
    submitSearch(pageNumber = 1) {
      this.showButton = false;
      this.sumPresentations = 0;
      this.resultsPage = pageNumber;

      const presentationSearchParameters = {
        playName: this.playParameters.playName,
        playId: this.playParameters.playId,
        dateStart: getISODate(this.settingParameters.startDate),
        dateEnd: getISODate(this.settingParameters.endDate),
        theaterId: this.settingParameters.theaterId,
        companyId: this.settingParameters.companyId,
        playGenreId: this.playParameters.genreId,
        languageId: this.settingParameters.languageId,
        settingGenreId: null,
        companyName: this.settingParameters.companyName,
        companyNationalityId: this.settingParameters.companyNationalityId,
        playNationalityId: this.playParameters.nationalityId,
        settingKind: this.settingParameters.kind,
        playAuthorPersonId: this.playParameters.playAuthorPersonId,
        playTranslatorPersonId: this.playParameters.playTranslatorPersonId,
        playAdaptorPersonId: this.playParameters.playAdaptorPersonId,
        musicAuthorPersonId: this.playParameters.musicAuthorPersonId,
        musicArrangerPersonId: this.playParameters.musicArrangerPersonId,
        page: pageNumber
      };

      Search.getPresentations(presentationSearchParameters)
        .then(response => {
          this.presentations = [];
          let presents = response.presentations;

          // Ordena apresentações
          this.presentations = response.presentations.sort((a, b) => {
            if (!a || !b) return 0;
            return a.presentationDate > b.presentationDate ? 1 : -1;
          });

          //Total de representações
          this.sumPresentations = this.presentations.reduce((acc, element) => {
            if (element && !!element.sessionsNumber) {
              acc += element.sessionsNumber;
            }
            return parseInt(acc);
          }, []);


          this.totalPresentations = response.total;
          this.totalPages = response.totalPages;
          this.searched = true;
          this.showButton = true;
          this.allPresentations = response.allPresentations;
          this.companyCount = response.companyCount;
          this.allPlays = response.allPlays;
        })
        .catch(error => {
          this.showButton = true;
          console.error(error);
          alert("Erro: error");
        });
    },
    formatDateYear(value) {
      if (!value) return null;
      return moment(value).format("YYYY");
    },
    showFailSwal(message = "Houve uma falha no servidor.") {
      swal({
        title: "Erro",
        text: message,
        type: "error",
        confirmButtonClass: "btn btn-danger",
        confirmButtonColor: "#f53c2e",
        buttonsStyling: false,
        animation: false
      });
    }
  },
  computed: {
    filteredPresentations() {
      console.log("TCL: filteredPresentations -> this.presentations", this.presentations)


      return this.presentations.filter(presentation => !!presentation);
    },
    presentationsByCompany() {
      this.sumPresentations = 0;
      let companies = this.filteredPresentations.reduce(
        (companies, presentation) => {
          let company = companies.find(
            company => company.name === presentation.companyName
          );
          if (!company) {
            company = {
              id: presentation.companyId,
              name: presentation.companyName,
              nationality: presentation.companyNationality,
              plays: [],
              totalPresentations: 0
            };
            companies.push(company);
          }
          let play = company.plays.find(
            play => play.settingId === presentation.settingId
          );
          if (!play) {
            play = {
              id: presentation.playId,
              name: presentation.playName,
              nationality: presentation.playNationality,
              genre: presentation.playGenre,
              language: presentation.language,
              jobs: presentation.conceptions,
              settingId: presentation.settingId,
              presentations: []
            };
            company.plays.push(play);
          }
          play.presentations.push({
            id: presentation.presentationId,
            date: presentation.presentationDate,
            theater: presentation.theaterName,
            theaterId: presentation.theaterId,
            sessionsNumber: presentation.sessionsNumber,
            kind: presentation.kind
          });
          company.totalPresentations++;

          return companies;
        },
        []
      );

      companies.forEach(company => {
        company.linesTable = 0;
        company.plays.forEach(play => {
          let formattedPresentations = [
            {
              id: null,
              date: null,
              theater: "",
              sessionsNumber: "",
              theaterId: "",
              kind: ""
            }
          ];
          play.presentations.forEach(presentation => {
            let exist = false;
            presentation.date = this.formatDateYear(presentation.date);

            formattedPresentations.filter(formatPresentation => {
              if (
                formatPresentation.date === presentation.date &&
                formatPresentation.theater === presentation.theater
              ) {
                formatPresentation.sessionsNumber +=
                  presentation.sessionsNumber;

                exist = true;
              }
            });
            if (!exist) {
              let data = {
                id: presentation.id,
                date: presentation.date,
                theater: presentation.theater,
                sessionsNumber: presentation.sessionsNumber,
                theaterId: presentation.theaterId,
                kind: presentation.kind
              };
              formattedPresentations.push(data);
            }
            this.sumPresentations += presentation.sessionsNumber;
          });
          formattedPresentations.shift();
          play.presentations = formattedPresentations;
          company.linesTable += play.presentations.length;
        });
      });

      return companies;
    },

    presentationsByPlay() {
      this.sumPresentations = 0;
      let plays = this.filteredPresentations.reduce((plays, presentation) => {
        let play = plays.find(play => play.id === presentation.playId);
        if (!play) {
          play = {
            id: presentation.playId,
            name: presentation.playName,
            nationality: presentation.playNationality,
            language: presentation.playLanguage,
            genre: presentation.playGenre,
            totalPresentations: 0,
            companies: []
          };
          plays.push(play);
        }

        let company = play.companies.find(
          company => company.id === presentation.companyId
        );
        if (!company) {
          company = {
            id: presentation.companyId,
            name: presentation.companyName,
            nationality: presentation.companyNationality,
            jobs: presentation.conceptions,
            presentations: []
          };
          play.companies.push(company);
        }

        company.presentations.push({
          id: presentation.presentationId,
          date: presentation.presentationDate,
          theater: presentation.theaterName,
          theaterId: presentation.theaterId,
          kind: presentation.kind,
          sessionsNumber: presentation.sessionsNumber
        });

        play.totalPresentations++;
        return plays;
      }, []);

      plays.forEach(play => {
        play.linesTable = 0;
        play.companies.forEach(company => {
          let formattedPresentations = [
            {
              id: null,
              date: null,
              theater: "",
              sessionsNumber: "",
              theaterId: "",
              kind: ""
            }
          ];
          company.presentations.forEach(presentation => {
            presentation.date = this.formatDateYear(presentation.date);
            let exist = false;
            formattedPresentations.filter((formatPresentation, index) => {
              if (
                formatPresentation.date === presentation.date &&
                formatPresentation.theater === presentation.theater
              ) {
                formatPresentation.sessionsNumber +=
                  presentation.sessionsNumber;

                exist = true;
              }
            });
            if (!exist) {
              let data = {
                id: presentation.id,
                date: presentation.date,
                theater: presentation.theater,
                sessionsNumber: presentation.sessionsNumber,
                theaterId: presentation.theaterId,
                kind: presentation.kind
              };
              formattedPresentations.push(data);
            }
            this.sumPresentations += presentation.sessionsNumber;
          });
          formattedPresentations.shift();
          company.presentations = formattedPresentations;
          play.linesTable += company.presentations.length;
        });
      });
      return plays;
    }
  },
  filters: {
    formatSettingKind(kind) {
      switch (kind) {
        case "COMPLETE":
          return "Completo";
        case "SESSIONS":
          return "Sessões";
        case "STAGE_SCREEN":
          return "Palco e tela";
        default:
          return "";
      }
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

.verticalMiddle {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
