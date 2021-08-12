import CoordinationServices from "@/services/CoordinationServices";
import store from "../../../index";
const state = {
	coordinationList: []
};
const getters = {
	coordinationList: (state) => {
		return state.coordinationList;
	}
};
const actions = {
	createCoordination(context, data) {
		return new Promise((resolve, reject) => {
			CoordinationServices.create(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getCoordinationList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	updateCoordination(context, data) {
		return new Promise((resolve, reject) => {
			CoordinationServices.edit(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getCoordinationList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	getCoordinationList(context) {
		return new Promise((resolve, reject) => {
			CoordinationServices.list()
				.then((response) => {
					context.commit("mSetCoordinationList", response.data);
					store.dispatch("doData", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	},
	deleteCoordination(context,data){
		return new Promise((resolve,reject)=>{
			CoordinationServices.deleteCoordination(data.id,data.data).then((response)=>{
				store.dispatch("doData", "Coordinación");
				resolve(response.data);
			}).catch(reject);		
		});
	}

};
const mutations = {
	mSetCoordinationList(state, data) {
		state.coordinationList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
