import CityServices from "@/services/CityServices"
const state = {
    cityList: [],

}
const getters = {
    cityList: state => {
        return state.cityList
    },

}
const actions = {
    createCity(context, data) {
        return new Promise((resolve, reject) => {
            CityServices.create(data).then(response => {
                if (response.data.code == 200) {
                    context.dispatch("getCityList")
                    resolve(response.data)
                }
            })
        })
    },
    updateCity(context, data) {
        return new Promise((resolve, reject) => {
            CityServices.edit(data).then(response => {
                if (response.data.code == 200) {
                    context.dispatch("getCityList")
                    resolve(response.data)
                }
            })
        })
    },
    getCityList(context) {
        return new Promise((resolve, reject) => {
            CityServices.list().then(response => {
                context.commit("mSetCityList", response.data)
                resolve(response.data)
            })
        })
    }
}
const mutations = {
    mSetCityList(state, data) {
        state.cityList = data.data
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
};