import AirlineServices from "@/services/AirlineServices";
import store from "../../../index";
const state = {
	airlineList: []
};
const getters = {
	airlineList: (state) => {
		return state.airlineList;
	}
};
const actions = {
	createAirline(context, data) {
		return new Promise((resolve, reject) => {
			AirlineServices.create(data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getAirlineList");
					store.dispatch("doData", "Aerolineas");
					resolve(response.data);
				}
			}).catch(reject);
		});
	},
	updateAirline(context, data) {
		return new Promise((resolve, reject) => {
			AirlineServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Aerolineas");
					context.dispatch("getAirlineList");
					resolve(response.data);
				}
			}).catch(reject);
		});
	},
	getAirlineList(context) {
		return new Promise((resolve, reject) => {
			AirlineServices.list().then((response) => {
				context.commit("mSetAirlineList", response.data);
				store.dispatch("doData", "Aerolineas");
				resolve(response.data);
			}).catch(reject);
		});
	},
	deleteAirlines(context,data){
		return new Promise((resolve,reject)=>{
			AirlineServices.deleteAirlines(data.id,data.data).then((response)=>{
				store.dispatch("doData", "Aerolineas");
				resolve(response.data);
			}).catch(reject);		
		});
	},
};
const mutations = {
	mSetAirlineList(state, data) {
		state.airlineList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
