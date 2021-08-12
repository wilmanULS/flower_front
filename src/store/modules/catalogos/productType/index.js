import ProductTypeServices from "@/services/ProductTypeServices";
import store from "../../../index";
const state = {
	productTList: []
};
const getters = {
	productTList: (state) => {
		return state.productTList;
	}
};
const actions = {
	createProductType(context, data) {
		return new Promise((resolve, reject) => {
			ProductTypeServices.create(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getProductTypeList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	updateProductType(context, data) {
		return new Promise((resolve, reject) => {
			ProductTypeServices.edit(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getProductTypeList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	getProductTypeList(context) {
		return new Promise((resolve, reject) => {
			ProductTypeServices.list()
				.then((response) => {
					context.commit("mSetProductTypeList", response.data);
					store.dispatch("doData", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetProductTypeList(state, data) {
		state.productTList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
