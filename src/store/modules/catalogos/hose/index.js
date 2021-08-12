import HoseServices from "@/services/HoseServices";
import store from "../../../index";
const state = {
	hoseList: []
};
const getters = {
	hoseList: (state) => {
		return state.hoseList;
	}
};
const actions = {
	createHose(context, data) {
		return new Promise((resolve, reject) => {
			HoseServices.create(data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getHoseList");
					store.dispatch("doData", "Cargueras");
					resolve(response.data);
				}
				resolve(response.data);
			});
		});
	},
	updateHose(context, data) {
		return new Promise((resolve, reject) => {
			HoseServices.edit(data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getHoseList");
					resolve(response.data);
				}
			});
		});
	},
	getHoseList(context) {
		return new Promise((resolve, reject) => {
			HoseServices.list().then((response) => {
				context.commit("mSetHoseList", response.data);
				resolve(response.data);
			});
		});
	},
	deleteHose(context, data) {
		return new Promise((resolve, reject) => {
			HoseServices.deleteHose(data.id, data.data)
				.then((response) => {
					store.dispatch("doData", "Cargueras");
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetHoseList(state, data) {
		state.hoseList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
