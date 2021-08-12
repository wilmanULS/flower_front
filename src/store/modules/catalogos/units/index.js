import UnitsServices from "@/services/UnitsServices";
import store from "../../../index";
const state = {
	unitsList: []
};
const getters = {
	unitsList: (state) => {
		return state.unitsList;
	}
};
const actions = {
	createUnits(context, data) {
		return new Promise((resolve, reject) => {
			UnitsServices.create(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getUnitsList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	updateUnits(context, data) {
		return new Promise((resolve, reject) => {
			UnitsServices.edit(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getUnitsList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	getUnitsList(context) {
		return new Promise((resolve, reject) => {
			UnitsServices.list()
				.then((response) => {
					context.commit("mSetUnitsList", response.data);
					store.dispatch("doData", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetUnitsList(state, data) {
		state.unitsList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
