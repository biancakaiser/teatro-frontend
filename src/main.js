// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import "./globalFilters";
import "./globalFunctions";

// Plugins
import VueTheMask from "vue-the-mask";
// import VeeValidate from 'vee-validate'
// import VueSweetalert2 from 'vue-sweetalert2'
import AsyncComputed from "vue-async-computed";
import VueEditor from "vue2-editor";

Vue.use(AsyncComputed);
Vue.use(VueTheMask);
Vue.use(VueEditor);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
