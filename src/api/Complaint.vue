
<script>
/* eslint-disable */
let axios = require('axios');

let serverUrl = process.env.ROOT_API;
// let serverUrl = "https://auster-api.espressolabs.com.br";

export default {
	getOptions: function () {
		let companyUrlCode = localStorage.getItem('companyUrlCode');
		
		if(!companyUrlCode) {
			return Promise.reject("ERR_INVALID_CODE");
		} else {
			return axios.post(`${serverUrl}/v1/complaint/getOptions`, {data: {companyUrlCode: companyUrlCode}})
				.then(response => response.data)
				.catch(error => {
					if (error.response.status === 404) return Promise.reject("ERR_INVALID_CODE");
					console.error(error);
					return Promise.reject("ERR_COMPLAINT");
				});
		}
	},
	send: function (data) {
		return axios.post(`${serverUrl}/v1/complaint/send`, {data: data})
			.then(response => response.data)
			.catch(error => {
				console.error(error);
				return Promise.reject("ERR_COMPLAINT");
			});
	},
	getByProtocolNumber: function (protocolNumber) {
		return axios.post(`${serverUrl}/v1/complaint/getByProtocolNumber`, {data: {protocolNumber: protocolNumber}})
			.then(response => response.data)
			.catch(error => {
				if (error.response.status === 404) return Promise.reject("ERR_COMPLAINT_NOT_FOUND");
				console.error(error);
				return Promise.reject("ERR_COMPLAINT");
			});
	}
}
</script>
