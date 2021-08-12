import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";

export default {
	create(data) {
		return axios.post(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.VARIETY.PRIMARY, data);
	},
	edit(id, data) {
		return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.VARIETY.PRIMARY, data, {
			params: {
				idVariety: id
			}
		});
	},
	list() {
		return axios.get(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.VARIETY.LIST);
	},
	delete(id, data) {
		return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.VARIETY.CHANGE, data, {
			params: {
				idVariety: id
			}
		});
	}
};
