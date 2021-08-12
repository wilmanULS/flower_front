import VarietyServices from "@/services/VarietyServices";
import store from "../../../index";
const state = {
	varietyList: []
};
const getters = {
	varietyList: (state) => {
		return state.varietyList;
	}
};
const actions = {
	createVariety(context, data) {
		return new Promise((resolve, reject) => {
			VarietyServices.create(data)
				.then((response) => {
					if (response.data.code == 200) {
						store.dispatch("doData", "Variedades");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	updateVariety(context, data) {
		return new Promise((resolve, reject) => {
			VarietyServices.edit(data.id, data.data)
				.then((response) => {
					if (response.data.code == 200) {
						store.dispatch("doData", "Variedades");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	getVarietyList(context) {
		return new Promise((resolve, reject) => {
			VarietyServices.list()
				.then((response) => {
					context.commit("mSetVarietyList", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	},
	deleteVariety(context,data) {
		return new Promise((resolve, reject) => {
			VarietyServices.delete(data.id, data.data)
				.then((response) => {
					store.dispatch("doData", "Variedades");
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetVarietyList(state, data) {
		state.varietyList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
