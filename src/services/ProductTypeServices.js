import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";

export default {
    create(data) {
        return axios.post(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.PRODUCTTYPE.PRIMARY, data)

    },
    edit(id, data) {
        return axios.put(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.PRODUCTTYPE.PRIMARY, data, {
            params: {
                idProductType: id
            }
        })

    },
    list() {
        return axios.get(process.env.VUE_APP_URL + ServicesConfig.CATALOGS.PRODUCTTYPE.LIST)

    }
}
