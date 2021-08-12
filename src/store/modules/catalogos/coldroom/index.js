import ColdRoomServices from "@/services/ColdRoomServices";
import store from "../../../index";
const state = {
	coldRoomList: []
};
const getters = {
	coldRoomList: (state) => {
		return state.coldRoomList;
	}
};
const actions = {
	createColdRoom(context, data) {
		return new Promise((resolve, reject) => {
			ColdRoomServices.create(data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getColdRoomList");
					store.dispatch("doData", "Cuartos Fríos");
					resolve(response.data);
				}
			});
		});
	},
	updateColdRoom(context, data) {
		return new Promise((resolve, reject) => {
			ColdRoomServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getColdRoomList");
					store.dispatch("doData", "Cuartos Fríos");
					resolve(response.data);
				}
			});
		});
	},
	getColdRoomList(context) {
		return new Promise((resolve, reject) => {
			ColdRoomServices.list().then((response) => {
				context.commit("mSetColdRoomList", response.data);
				resolve(response.data);
			});
		});
	},
	deleteColdRoom(context,data){
		return new Promise((resolve,reject)=>{
			ColdRoomServices.deleteColdRoom(data.id,data.data).then((response)=>{
				store.dispatch("doData", "Cuartos Fríos");
				resolve(response.data);
			}).catch(reject);		
		});
	}
};
const mutations = {
	mSetColdRoomList(state, data) {
		state.coldRoomList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
