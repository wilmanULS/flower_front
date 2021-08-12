import ProviderServices from "@/services/ProviderServices";
import store from "../../../index";
const state = {
	providerList: []
};
const getters = {
	providerList: (state) => {
		return state.providerList;
	},
	idEdit: (state) => {
		return state.idEdit;
	}
};
const actions = {
	createProvider(context, data) {
		return new Promise((resolve, reject) => {
			ProviderServices.create(data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Proveedor");
					resolve(response.data);
				}
			});
		});
	},
	updateProvider(context, data) {
		return new Promise((resolve, reject) => {
			ProviderServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Proveedor");
					resolve(response.data);
				}
			});
		});
	},
	deleteProvider(context, data) {
		return new Promise((resolve, reject) => {
			ProviderServices.delete(data.id, data.data)
				.then((response) => {
					store.dispatch("doData", "Proveedor");
					resolve(response.data);
				})
				.catch(reject);
		});
	},
	getProviderList(context) {
		return new Promise((resolve, reject) => {
			ProviderServices.list().then((response) => {
				context.commit("mSetProviderList", response.data);
				resolve(response.data);
			});
		});
	}
};
const mutations = {
	mSetProviderList(state, data) {
		state.providerList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
