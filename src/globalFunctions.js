/* eslint-disable */
window.formatReadDatetime = (value) => {
	if (!value) return null;
	return value
	.substring(0, 10)
	.split("-")
	.reverse()
	.join("/");
}

window.formatWriteDatetime = (value) => {
	if (!value) return null;
	return value
		.split("/")
		.reverse()
		.join("-");
};

window.formatReadCurrency = (value) => {
	return `R$ ${(Number(value)/100).toFixed(2)}`;
};

window.formatWriteCurrency = (value) => {
	return value;
}
