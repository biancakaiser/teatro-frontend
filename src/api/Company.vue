<script>
import request from "./request.vue";

export default {
  /**
   * @api {post} /company/getRecord Retorna os dados de uma companhia
   *
   * @apiName getRecord
   * @apiGroup Company
   *
   * @apiParam {Number} companyId <code>ID</code> da companhia
   *
   * @apiSuccess {Object} company Dados da companhia
   * @apiSuccess {Object} pictures Objeto com todas as fotos e sua informações
   * @apiSuccess {Object} jobs Objeto com os dados dos trabalhos e pessoas que o executaram
   *
   * @apiError {String} ERR_API_COMPANY_NOT_FOUND Companhia não encontrada
   */
	getRecord(companyId){
		return request.send("company", "getRecord", { companyId })
			.then(response => {
				return response;
			});
	}
};
</script>