import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";

export default {
	create(data) {
		return axios.post(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.DIALING.PRIMARY, data);
	},
	edit(id, data) {
		return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.DIALING.PRIMARY, data, {
			params: {
				idDialing: id
			}
		});
	},
	list() {
		return axios.get(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.DIALING.LIST);
	},
	deleteDialing(id, data) {
		return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.DIALING.CHANGE, data, {
			params: {
				idDialing: id
			}
		});
	}
};
