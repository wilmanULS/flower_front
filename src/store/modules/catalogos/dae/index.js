import DaeServices from "@/services/DaeServices";
const state = {
	daeList: []
};
const getters = {
	daeList: (state) => {
		return state.daeList;
	}
};
const actions = {
	createDae(context, data) {
		return new Promise((resolve, reject) => {
			DaeServices.create(data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getDaeList");
					resolve(response.data);
				}
			});
		});
	},
	updateDae(context, data) {
		return new Promise((resolve, reject) => {
			DaeServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getDaeList");
					resolve(response.data);
				}
			});
		});
	},
	getDaeList(context) {
		return new Promise((resolve, reject) => {
			if (context.getters.daeList.length > 0) {
				resolve();
				return;
			}
			DaeServices.list()
				.then((response) => {
					context.commit("mSetDaeList", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetDaeList(state, data) {
		state.daeList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
