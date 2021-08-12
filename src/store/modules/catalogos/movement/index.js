import MovimentServices from "@/services/MovimentServices"
const state = {
    movimentList: [],

}
const getters = {
    movimentList: state => {
        return state.movimentList
    },
    
}
const actions = {
    createMoviment(context, data) {
        return new Promise((resolve, reject) => {
            MovimentServices.create(data).then(response => {
                if (response.data.code == 200) {
                    context.dispatch("getMovimentList")
                    resolve(response.data)
                }
            })
        })
    },
    updateMoviment(context, data) {
        return new Promise((resolve, reject) => {
            MovimentServices.edit(data).then(response => {
                if (response.data.code == 200) {
                    context.dispatch("getMovimentList")
                    resolve(response.data)
                }
            })
        })
    },
    getMovimentList(context) {
        return new Promise((resolve, reject) => {
            MovimentServices.list().then(response => {
                context.commit("mSetMovimentList", response.data)
                resolve(response.data)
            })
        })
    }
}
const mutations = {
    mSetMovimentList(state, data) {
        state.movimentList = data.data
    },

}
export default {
    state,
    getters,
    actions,
    mutations,
};