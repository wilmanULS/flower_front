import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";

export default {
	create(data) {
		return axios.post(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.COLDROOM.PRIMARY, data);
	},
	edit(id, data) {
		return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.COLDROOM.PRIMARY, data, {
			params: {
				idColdRoom: id
			}
		});
	},
	list() {
		return axios.get(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.COLDROOM.LIST);
    },
    deleteColdRoom(id,data){
		return axios.put(
			process.env.VUE_APP_URL + ServicesConfig.CATALOGS.COLDROOM.CHANGE,data,{
				params:{
					idColdRoom:id
				}

			}
		);

	}
};
