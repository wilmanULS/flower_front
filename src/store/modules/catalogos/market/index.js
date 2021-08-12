import MarketServices from "@/services/MarketServices";
import store from "../../../index";
const state = {
	marketList: []
};
const getters = {
	marketList: (state) => {
		return state.marketList;
	}
};
const actions = {
	createMarket(context, data) {
		return new Promise((resolve, reject) => {
			MarketServices.create(data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getMarketList");
					store.dispatch("doData", "Mercado");
					resolve(response.data);
				}
			});
		});
	},
	updateMarket(context, data) {
		return new Promise((resolve, reject) => {
			MarketServices.edit(data.id,data.data).then((response) => {
				if (response.data.code == 200) {
					context.dispatch("getMarketList");
					store.dispatch("doData", "Mercado");
					resolve(response.data);
				}
			});
		});
	},
	getMarketList(context) {
		return new Promise((resolve, reject) => {
			MarketServices.list().then((response) => {
				context.commit("mSetMarketList", response.data);
				resolve(response.data);
			});
		});
	},
	deleteMarket(context,data){
		return new Promise((resolve,reject)=>{
			MarketServices.deleteMarket(data.id,data.data).then((response)=>{
				store.dispatch("doData", "Mercado");
				resolve(response.data);
			}).catch(reject);		
		});
	}
};
const mutations = {
	mSetMarketList(state, data) {
		state.marketList = data.data;
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
