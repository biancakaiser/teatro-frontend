<script>
import request from "./request.vue";

export default {
  /**
   * @api {post} /play/getRecord Retorna todas as informações de uma peça
   *
   * @apiName getRecord
   * @apiGroup Play
   *
   * @apiParam {Number} playId <code>ID</code> do teatro
   *
   * @apiSuccess {Object} play Objeto com os dados do teatro
   * @apiSuccess {Object} settings Objeto com todas as montagens da peça
   *
   * @apiError {String} ERR_API_PLAY_NOT_FOUND Peça não encontrado
   */
	getRecord(playId){
		return request.send("play", "getRecord", { playId })
			.then(response => {
				return response;
			});
	}
};
</script>