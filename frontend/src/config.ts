// if (window.location.search) {
// 	const search = window.location.search.slice(1);
// 	const items = search.split("&").forEach((item) => {
// 		const [key, value] = item.split("=");
// 		localStorage.setItem(key, value);
// 	});
// 	window.location.href = window.location.origin + window.location.pathname;
// }

class Config {
	private access_token: string | null;
	// private client_id: string | null;

	constructor() {
		this.access_token = localStorage.getItem("access_token");
		// this.access_token = localStorage.getItem("access_token");
	}

	private setItem(key: string, value: string) {
		(this as any)[key] = localStorage.setItem(key, value);
		return value;
	}

	private getItem(key: string) {
		return localStorage.getItem(key);
	}

	public get(key: "access_token") {
		return this[key];
	}
}

export const config = {
	access_token: localStorage.getItem("access_token"),
	// client_id: localStorage.getItem("client_id"),
}
