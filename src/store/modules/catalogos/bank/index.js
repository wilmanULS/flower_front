import BankServices from "@/services/BankServices";
import store from "../../../index";
const state = {
	bankList: []
};
const getters = {
	bankList: (state) => {
		return state.bankList;
	}
};
const actions = {
	createBank(context, data) {
		return new Promise((resolve, reject) => {
			BankServices.create(data)
				.then((response) => {
					if (response.data.code == 200) {
						context.dispatch("getBankList");
						store.dispatch("doData", "Bancos");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	updateBank(context, data) {
		return new Promise((resolve, reject) => {
			BankServices.edit(data.id, data.data)
				.then((response) => {
					if (response.data.code == 200) {
						store.dispatch("doData", "Bancos");
						context.dispatch("getBankList");
						resolve(response.data);
					}
				})
				.catch(reject);
		});
	},
	getBankList(context) {
		return new Promise((resolve, reject) => {
			BankServices.list()
				.then((response) => {
					store.dispatch("doData", "Bancos");
					context.commit("mSetBankList", response.data);
					resolve(response.data);
				})
				.catch(reject);
		});
	},
	deleteBank(context,data){
		return new Promise((resolve,reject)=>{
			BankServices.deleteBank(data.id,data.data).then((response)=>{
				store.dispatch("doData", "Bancos");
				resolve(response.data);
			}).catch(reject);		
		});
	},
};
const mutations = {
	mSetBankList(state, data) {
		state.bankList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
