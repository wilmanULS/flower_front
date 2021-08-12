import CategoriesServices from "@/services/CategoriesServices";
import store from "../../../index";
const state = {
	categoriesList: []
};
const getters = {
	categoriesList: (state) => {
		return state.categoriesList;
	}
};
const actions = {
	createCategories(context, data) {
		return new Promise((resolve, reject) => {
			CategoriesServices.create(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getCategoriesList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	updateCategories(context, data) {
		return new Promise((resolve, reject) => {
			CategoriesServices.edit(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getCategoriesList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	getCategoriesList(context) {
		return new Promise((resolve, reject) => {
			CategoriesServices.list()
				.then((response) => {
					context.commit("mSetCategoriesList", response.data);
					store.dispatch("doData", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	}
};
const mutations = {
	mSetCategoriesList(state, data) {
		state.categoriesList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
