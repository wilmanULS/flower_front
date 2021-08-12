import BoxTypeServices from "@/services/BoxTypeServices";
import store from "../../../index";
const state = {
	boxtypeList: []
};
const getters = {
	boxtypeList: (state) => {
		return state.boxtypeList;
	}
};
const actions = {
	createBoxtype(context, data) {
		return new Promise((resolve, reject) => {
			BoxTypeServices.create(data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getBoxtypeList");
					store.dispatch("doData", "Tipo de Caja");
					resolve(response.data);
				}
			}).catch(reject);
		});
	},
	updateBoxtype(context, data) {
		return new Promise((resolve, reject) => {
			BoxTypeServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Tipo de Caja");
					context.dispatch("getBoxtypeList");
					resolve(response.data);
				}
			}).catch(reject);
		});
	},
	getBoxtypeList(context) {
		return new Promise((resolve, reject) => {
			BoxTypeServices.list().then((response) => {
				context.commit("mSetAirlineList", response.data);
				store.dispatch("doData", "Tipo de Caja");
				resolve(response.data);
			}).catch(reject);
		});
	},
	deleteBoxtype(context,data){
		return new Promise((resolve,reject)=>{
			BoxTypeServices.deleteBoxType(data.id,data.data).then((response)=>{
				store.dispatch("doData", "Tipo de Caja");
				resolve(response.data);
			}).catch(reject);		
		});
	},
};
const mutations = {
	mSetBoxtypeList(state, data) {
		state.boxtypeList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
