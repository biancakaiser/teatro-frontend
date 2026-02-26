<script>
import request from "./request.vue";

export default {
  /**
   * @api {post} /theater/getRecord Retorna todas as informações de um teatro
   *
   * @apiName getRecord
   * @apiGroup Theater
   *
   * @apiParam {Number} theaterId <code>ID</code> do teatro
   *
   * @apiSuccess {Object} theater Objeto com os dados do teatro
   * @apiSuccess {Object} pictures Objeto com os dados e url das fotos do teatro
   * @apiSuccess {Object} responsibles Objeto com todos que já foram responsaveis pelo teatro
   *
   * @apiError {String} ERR_API_THEATER_NOT_FOUND Teatro não encontrado
   */
	getRecord(theaterId){
		return request.send("theater", "getRecord", { theaterId })
			.then(response => {
				return response;
			});
	}
};
</script>