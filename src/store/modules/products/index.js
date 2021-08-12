import ProductServices from "@/services/ProductServices";
const state = {
	productList: []
};
const getters = {
	productList: (state) => {
		return state.productList;
	}
};
const actions = {
	createProduct(context, data) {
		return new Promise((resolve, reject) => {
			ProductServices.create(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getProductList", { statusP: 1 });
						resolve(response.data);
					}
					resolve(response.data);
				})
				.catch(reject);
		});
	},
	editProduct(context, data) {
		return new Promise((resolve, reject) => {
			ProductServices.edit(data.id, data.data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getProductList", { statusP: 1 });
						resolve(response.data);
					}
					resolve(response.data);
				})
				.catch(reject);
		});
	},
	getProductList(context, data) {
		return new Promise((resolve, reject) => {
			ProductServices.list(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.commit("mSetList", response.data.data);
						resolve(response.data);
					}
					resolve(response.data);
				})
				.catch(reject);
		});
	},
	getProductListStandBy(context) {
		return new Promise((resolve, reject) => {
			ProductServices.list()
				.then((response) => {
					if (response.data.code == 200) {
						context.commit("mSetList", response.data.data);
						resolve(response.data);
					}
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetList(state, data) {
		state.productList = data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
