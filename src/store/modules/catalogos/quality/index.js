import QualityServices from "@/services/QualityServices";
import store from "../../../index";
const state = {
	qualityList: []
};
const getters = {
	qualityList: (state) => {
		return state.qualityList;
	}
};
const actions = {
	createQuality(context, data) {
		return new Promise((resolve, reject) => {
			QualityServices.create(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getQualityList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	updateQuality(context, data) {
		return new Promise((resolve, reject) => {
			QualityServices.edit(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getQualityList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	getQualityList(context) {
		return new Promise((resolve, reject) => {
			QualityServices.list()
				.then((response) => {
					context.commit("mSetQualityList", response.data);
					store.dispatch("doData", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetQualityList(state, data) {
		state.qualityList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
