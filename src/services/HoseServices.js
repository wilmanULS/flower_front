import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";

export default {
    create(data) {
        return axios.post(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.HOSE.PRIMARY, data)

    },
    edit(id, data) {
        return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.HOSE.PRIMARY, data, {
            params: {
                idHose: id
            }
        })
    },
    list() {
        return axios.get(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.HOSE.LIST)
    },
    deleteHose(id,data){
		return axios.put(
			process.env.VUE_APP_URL + ServicesConfig.CATALOGS.HOSE.CHANGE,data,{
				params:{
					idHose:id
				}

			}
		);

	}
}
