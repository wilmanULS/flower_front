import CountryServices from "@/services/CountryServices";
import store from "../../../index";
const state = {
	countryList: []
};
const getters = {
	countryList: (state) => {
		return state.countryList;
	}
};
const actions = {
	createCountry(context, data) {
		return new Promise((resolve, reject) => {
			CountryServices.create(data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Países");
					resolve(response.data);
				}
			});
		});
	},
	updateCountry(context, data) {
		return new Promise((resolve, reject) => {
			CountryServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Países");
					resolve(response.data);
				}
			});
		});
	},
	getCountryList(context) {
		return new Promise((resolve, reject) => {
			CountryServices.list()
				.then((response) => {
					context.commit("mSetCountryList", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	},
	deleteCountry(context,data){
		return new Promise((resolve,reject)=>{
			CountryServices.deleteCountry(data.id,data.data).then((response)=>{
				store.dispatch("doData", "Países");
				resolve(response.data);
			}).catch(reject);		
		});
	}

};
const mutations = {
	mSetCountryList(state, data) {
		state.countryList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
