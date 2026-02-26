<script>
let axios = require("axios");
let serverUrl = process.env.API_URL || "http://localhost:8090";

export default {
  send: async function(apiName, command, data) {
    let config = {
      url: `${serverUrl}/v1/${apiName}/${command}`,
      method: "post",
      data: {
        data: data
      }
    };

    try {
      let response = await axios.request(config);
      if (!response.data.success) throw response;
      return response.data;
    } catch (response) {
      let error = response.data.error;
      console.error(error);
      if (error === "Network Error") throw Error("API_CONNECTION_ERROR");

      switch (response.status) {
        case 401:
          throw(Error("API_UNAUTHORIZED")); // no authorization / invalid authorization was detected
        case 403:
          throw Error("API_FORBIDDEN"); // user does not have correct privileges
        case 404:
          throw Error("API_NOT_FOUND");
        case 429:
          throw Error("API_RATE_LIMIT");
        case 500:
          throw Error("API_SERVER_ERROR");
        default:
          throw response.data;
      }
    }
  }
};
</script>
