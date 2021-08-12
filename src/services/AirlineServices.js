import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";

export default {
	create(data) {
		return axios.post(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.AIRLINE.PRIMARY, data);
	},
	edit(id, data) {
		return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.AIRLINE.PRIMARY, data, {
			params: {
				idAirline: id
			}
		});
	},
	list() {
		return axios.get(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.AIRLINE.LIST);
	},
	deleteAirlines(id, data) {
		return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.AIRLINE.CHANGE, data, {
			params: {
				idAirline: id
			}
		});
	}
};
