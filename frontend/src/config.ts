if (window.location.search) {
	const search = window.location.search.slice(1);
	const items = search.split("&").forEach((item) => {
		const [key, value] = item.split("=");
		localStorage.setItem(key, value);
	});
	window.location.href = window.location.origin + window.location.pathname;
}

export default {
	access_token: localStorage.getItem("access_token"),
	client_id: localStorage.getItem("client_id"),
}