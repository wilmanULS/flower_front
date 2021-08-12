import ClientServices from "@/services/ClientServices";
import store from "../../../index";
const state = {
	clientList: []
};
const getters = {
	clientList: (state) => {
		return state.clientList;
	}
};
const actions = {
	createClient(context, data) {
		return new Promise((resolve, reject) => {
			ClientServices.create(data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Clientes");
					resolve(response.data);
				}
			});
		});
	},
	updateClient(context, data) {
		return new Promise((resolve, reject) => {
			ClientServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Clientes");
					resolve(response.data);
				}
			});
		});
	},
	getClientList(context) {
		return new Promise((resolve, reject) => {
			ClientServices.list().then((response) => {
				context.commit("mSetClientList", response.data);
				resolve(response.data);
			});
		});
	},
	deleteClient(context,data){
		return new Promise((resolve,reject)=>{
			ClientServices.deleteClient(data.id,data.data).then((response)=>{
				store.dispatch("doData", "Clientes");
				resolve(response.data);
			}).catch(reject);		
		});
	}
};
const mutations = {
	mSetClientList(state, data) {
		state.clientList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
