import AirportServices from "@/services/AirportServices";
import store from "../../../index";
const state = {
	airportList: []
};
const getters = {
	airportList: (state) => {
		return state.airportList;
	}
};
const actions = {
	createAirport(context, data) {
		return new Promise((resolve, reject) => {
			AirportServices.create(data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Aeropuertos");
					resolve(response.data);
				}
			});
		});
	},
	updateAirport(context, data) {
		return new Promise((resolve, reject) => {
			AirportServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Aeropuertos");
					resolve(response.data);
				}
			});
		});
	},
	getAirportList(context) {
		return new Promise((resolve, reject) => {
			AirportServices.list().then((response) => {
				context.commit("mSetAirportList", response.data);
				store.dispatch("doData", response.data);
				resolve(response.data);
			});
		});
	},
	deleteAirport(context,data){
		return new Promise((resolve,reject)=>{
			AirportServices.deleteAirport(data.id,data.data).then((response)=>{
				store.dispatch("doData", "Aeropuertos");
				resolve(response.data);
			}).catch(reject);		
		});
	},
};
const mutations = {
	mSetAirportList(state, data) {
		state.airportList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
