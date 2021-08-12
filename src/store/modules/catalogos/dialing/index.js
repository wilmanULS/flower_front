import DialingServices from "@/services/DialingServices";
const state = {
	DialingList: []
};
const getters = {
	DialingList: (state) => {
		return state.DialingList;
	}
};
const actions = {
	createDialing(context, data) {
		return new Promise((resolve, reject) => {
			DialingServices.create(data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getDialingList");
					resolve(response.data);
				}
			});
		});
	},
	updateDialing(context, data) {
		return new Promise((resolve, reject) => {
			DialingServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getDialingList");
					resolve(response.data);
				}
			});
		});
	},
	getDialingList(context) {
		return new Promise((resolve, reject) => {
			if (context.getters.DialingList.length > 0) {
				resolve();
				return;
			}
			DialingServices.list()
				.then((response) => {
					context.commit("mSetDialingList", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetDialingList(state, data) {
		state.DialingList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
