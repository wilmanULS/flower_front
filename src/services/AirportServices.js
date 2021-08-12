import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";

export default {
	create(data) {
		return axios.post(
			process.env.VUE_APP_URL + ServicesConfig.CATALOGS.AIRPORT.PRIMARY,
			data
		);
	},
	edit(id, data) {
		return axios.put(
			process.env.VUE_APP_URL + ServicesConfig.CATALOGS.AIRPORT.PRIMARY,
			data,
			{
				params: {
					idAirport: id
				}
			}
		);
	},
	list() {
		return axios.get(
			process.env.VUE_APP_URL + ServicesConfig.CATALOGS.AIRPORT.LIST
		);
	},
	deleteAirport(id,data){
		return axios.put(
			process.env.VUE_APP_URL + ServicesConfig.CATALOGS.AIRPORT.CHANGE,data,{
				params:{
					idAirport:id
				}

			}
		);

	}
};
