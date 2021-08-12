import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";

export default {
    create(data) {
        return axios.post(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.COORDINATION.PRIMARY, data)

    },
    edit(id, data) {
        return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.COORDINATION.PRIMARY, data, {
            params: {
                idCoordination: id
            }
        })

    },
    list() {
        return axios.get(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.COORDINATION.LIST)

    },
    deleteCoordination(id,data){
		return axios.put(
			process.env.VUE_APP_URL + ServicesConfig.CATALOGS.COORDINATION.CHANGE,data,{
				params:{
					idCoordination:id
				}

			}
		);

	}
}
