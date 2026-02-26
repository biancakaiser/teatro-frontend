<script>
import request from "./request.vue";

export default {
  //caches para listas
  searchEntriesCache: null,
  nationalitiesPresentationCache: null,
  nationalitiesPersonCache: null,
  sponsorCache: null,
  /**
   * @api {post} /search/presentations Busca espetáculos
   *
   * @apiName presentations
   * @apiGroup Search
   *
   * @apiParam {String} playName Nome da peça
   * @apiParam {String} dateStart Data de início da busca *não implementado
   * @apiParam {String} dateEnd Data de término da busca *não implementado
   * @apiParam {Number} theaterId Id do teatro
   * @apiParam {Number} companyId Id da companhia
   * @apiParam {Number} playGenreId Id do gênero da peça
   * @apiParam {Number} settingGenreId Id do gênero da montagem
   * @apiParam {Number} playId Id da peça
   *
   * @apiSuccess {Object[]} presentations Lista de espetáculos
   */
	getPresentations(data){
		return request.send("search", "presentations", data)
			.then(response => {
				return response;
			});
  },
  /**
   * @api {post} /search/people Busca pessoas
   *
   * @apiName people
   * @apiGroup Search
   *
   * @apiParam {String} personName Nome da pessoa
   * @apiParam {String} gender Gênero da pessoa
   * @apiParam {String} race Etnia da pessoa
   * @apiParam {Number} roleId Id do cargo principal
   * @apiParam {Number} expertiseId Id do cargo de expertise
   *
   * @apiSuccess {Object[]} people Lista de pessoas encontradas
   */
  getPeople(data){
		return request.send("search", "people", data)
			.then(response => {
				return response.people;
			});
  },
  getSponsors() {
    if(!this.sponsorCache) {
  		const response =  request.send("lists", "getSponsors")
			.then(response => {
				return response;
			});
			this.sponsorCache = response;
    }
    return this.sponsorCache;
  },
  async getSearchEntries(){
    if(!this.searchEntriesCache){
  		const response =  await request.send("lists", "getSearchEntries", {})
			.then(response => {
				return response;
			});
			this.searchEntriesCache = response;
    }

    return this.searchEntriesCache;
  },
  async getNationalitiesPresentation(){
    if(!this.nationalitiesPresentationCache) {
  		const response =  request.send("lists", "getNationalitiesPresentation", {})
			.then(response => {
				return response;
			});
			this.nationalitiesPresentationCache = response;
    }
    return this.nationalitiesPresentationCache;
  },
  async getNationalitiesPerson(){
    if(!this.nationalitiesPersonCache){
  		const response = await request.send("lists", "getNationalitiesPerson", {})
			.then(response => {
				return response;
			});

			this.nationalitiesPersonCache =response;
    }
    return this.nationalitiesPersonCache;
	},
};
</script>
