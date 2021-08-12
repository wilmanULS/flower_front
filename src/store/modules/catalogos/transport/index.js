import TransportServices from "@/services/TransportServices";
import store from "../../../index";
const state = {
	transportList: []
};
const getters = {
	transportList: (state) => {
		return state.transportList;
	}
};
const actions = {
	createTransport(context, data) {
		return new Promise((resolve, reject) => {
			TransportServices.create(data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Transporte");
					resolve(response.data);
				}
			});
		});
	},
	updateTransport(context, data) {
		return new Promise((resolve, reject) => {
			TransportServices.edit(data.id, data.data).then((response) => {
				if (response.data.code == 200) {
					store.dispatch("doData", "Transporte");
					resolve(response.data);
				}
			});
		});
	},
	deleteTransport(context,data){
		return new Promise((resolve,reject)=>{
			TransportServices.deleteTransport(data.id,data.data).then((response)=>{
				if(response.data.code==200){
					store.dispatch("doData","Transporte");
					resolve(response.data);
				}
			}).catch(reject)
		})
	}
};
const mutations = {
	mSetTransportList(state, data) {
		state.transportList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
