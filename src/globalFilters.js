/* eslint-disable */
import Vue from "vue";
import moment from "moment";

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('formatDatetime', function (value) {
	if (!value) return ''
	return value
		.substring(0, 10)
		.split("-")
		.reverse()
		.join("/");
});

Vue.filter('formatTime', function (value) {
	if (!value) return "";
	return moment(value).format("DD/MM HH:mm");
});

Vue.filter('formatYear', function (value) {
	if (!value) return "";
	return moment(value).format("YYYY");
});

Vue.filter('formatCurrency', function(val) {
	return `R$ ${(Number(val)/100).toFixed(2)}`;
});

Vue.filter('formatOrderStatus', function(val) {
	switch(val){
		case "OPEN": return "Aberto";
		case "AWAITING_PAYMENT": return "Pagamento pendente";
		case "DELIVERY_PENDING": return "Entrega pendente";
		case "IN_DELIVERY": return "Em entrega";
		case "FULFILLED": return "Concluído";
		default: return "";
	}
});

Vue.filter('formatPaymentStatus', function(val) {
	switch(val){
		case "PENDENT": return "Pendente";
		case "IN_ANALYSIS": return "Em análise";
		case "COMPLETED": return "Completado";
		default: return "";
	}
});

Vue.filter('formatClientKind', function(val) {
	switch(val){
		case "COMMON": return "Comum";
		case "PROFESSIONAL": return "Profissional";
		case "STUDENT": return "Estudante";
		case "INFLUENCER": return "Influenciador";
		default: return "";
	}
});

Vue.filter('limitText', function(text, maxLength = 100) {
	if (text.length > maxLength) {
		return text.substr(0, maxLength) + "...";
	}
	return text;
});