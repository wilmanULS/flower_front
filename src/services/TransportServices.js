import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";

export default {
	create(data) {
		return axios.post(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.TRANSPORT.PRIMARY, data);
	},
	edit(id, data) {
		return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.TRANSPORT.PRIMARY, data, {
			params: {
				idTransport: id
			}
		});
	},
	list() {
		return axios.get(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.TRANSPORT.LIST);
	},
	deleteTransport(id,data){
		return axios.put(
			process.env.VUE_APP_URL + ServicesConfig.CATALOGS.MARKET.CHANGE,data,{
				params:{
					idTransport:id
				}

			}
		);

	}
};
