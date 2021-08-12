import BouncheTypeServices from "@/services/BouncheTypeServices";
import store from "../../../index";
const state = {
	bouncheTList: []
};
const getters = {
	bouncheTList: (state) => {
		return state.bouncheTList;
	}
};
const actions = {
	createBouncheType(context, data) {
		return new Promise((resolve, reject) => {
			BouncheTypeServices.create(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getBouncheTypeList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	updateBouncheType(context, data) {
		return new Promise((resolve, reject) => {
			BouncheTypeServices.edit(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getBouncheTypeList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	getBouncheTypeList(context) {
		return new Promise((resolve, reject) => {
			BouncheTypeServices.list()
				.then((response) => {
					context.commit("mSetBouncheTypeList", response.data);
					store.dispatch("doData", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetBouncheTypeList(state, data) {
		state.bouncheTList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
