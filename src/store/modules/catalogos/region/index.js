import RegionServices from "@/services/RegionServices";
import store from "../../../index";
const state = {
	regionList: []
};
const getters = {
	regionList: (state) => {
		return state.regionList;
	}
};
const actions = {
	createRegion(context, data) {
		return new Promise((resolve, reject) => {
			RegionServices.create(data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Regiones");
					resolve(response.data);
				}
			});
		});
	},
	updateRegion(context, data) {
		return new Promise((resolve, reject) => {
			RegionServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Regiones");
					resolve(response.data);
				}
			});
		});
	},
	getRegionList(context) {
		return new Promise((resolve, reject) => {
			RegionServices.list().then((response) => {
				context.commit("mSetRegionList", response.data);
				resolve(response.data);
			});
		});
	}
};
const mutations = {
	mSetRegionList(state, data) {
		state.regionList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
