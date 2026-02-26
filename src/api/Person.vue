<script>
import request from "./request.vue";

export default {
	/**
	 * @api {post} /person/getRecord Retorna todas as informações sobre uma pessoa
	 *
	 * @apiName getRecord
	 * @apiGroup Person
	 *
	 * @apiParam {Number} personId <code>ID</code> da pessoa
	 *
	 * @apiSuccess {Object} person Objeto com os dados da pessoa
	 * @apiSuccess {Object} pictures Objeto com as urls das fotos da pessoa
	 * @apiSuccess {Object} jobs Objeto com os dados dos trabalhos da pessoa
	 *
	 * @apiError {String} ERR_API_PERSON_NOT_FOUND Pessoa não encontrada
	 */
	getRecord(personId){
		return request.send("person", "getRecord", { personId })
			.then(response => {
				return response;
			});
	}
};
</script>