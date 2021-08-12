import TransportServices from "@/services/TransportServices";
import AirlineServices from "@/services/AirlineServices";
import AirportServices from "@/services/AirportServices";
import BankServices from "@/services/BankServices";
import HoseServices from "@/services/HoseServices";
import ClientServices from "@/services/ClientServices";
import ColdRoomServices from "@/services/ColdRoomServices";
import MarketServices from "@/services/MarketServices";
import Headers from "@/constants/HeadersConfig";
import RegionServices from "@/services/RegionServices";
import DaeServices from "@/services/DaeServices";
import CountryServices from "@/services/CountryServices";
import ProviderServices from "@/services/ProviderServices";
import VarietyServices from "@/services/VarietyServices";

const state = {
	categoryKey: "",
	dataHeader: [],
	dataTable: [],
	editableData: {},
	isActiveDialog: false
};
const getters = {
	categoryKey: (state) => {
		return state.categoryKey;
	},
	isActiveDialog: (state) => {
		return state.isActiveDialog;
	},
	dataTable: (state) => {
		return state.dataTable;
	},
	dataHeader: (state) => {
		return state.dataHeader;
	},
	editableData: (state) => {
		return state.editableData;
	}
};
const actions = {
	doDataDialog(context, data) {
		context.commit("setDataDialog", data);
	},
	doData(context, data) {
		switch (data) {
			case "Aerolineas":
				return new Promise((resolve, reject) => {
					AirlineServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.AIRLINES);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Aeropuertos":
				return new Promise((resolve, reject) => {
					AirportServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.AIRPORT);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Bancos":
				return new Promise((resolve, reject) => {
					BankServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.BANK);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Cargueras":
				return new Promise((resolve, reject) => {
					HoseServices.list()
						.then((response) => {
							console.log(response);
							context.commit("mSetDataHeader", Headers.HOSE);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Clientes":
				return new Promise((resolve, reject) => {
					ClientServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.CLIENT);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Cuartos Fríos":
				return new Promise((resolve, reject) => {
					ColdRoomServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.COLDROOM);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "DAE":
				return new Promise((resolve, reject) => {
					DaeServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.DAE);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Distritos":
				return new Promise((resolve, reject) => {
					ColdRoomServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.BANK);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Mercado":
				return new Promise((resolve, reject) => {
					MarketServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.MARKET);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Países":
				return new Promise((resolve, reject) => {
					CountryServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.COUNTRY);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Regiones":
				return new Promise((resolve, reject) => {
					RegionServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.REGION);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Transporte":
				return new Promise((resolve, reject) => {
					TransportServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.TRANSPORT);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Proveedor":
				return new Promise((resolve, reject) => {
					ProviderServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.PROVIDER);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;
			case "Variedades":
				return new Promise((resolve, reject) => {
					VarietyServices.list()
						.then((response) => {
							context.commit("mSetDataHeader", Headers.VARIETY);
							context.commit("mSetData", response.data.data);
							resolve(response.data);
						})
						.catch(reject);
				});
				break;

			default:
				context.commit("mSetData", []);
				break;
		}
	},
	doActiveDialog(context, data) {
		console.log(data);
		if (data.isEditable) {
			context.commit("mSetActiveDialogEdit", data);
		} else {
			context.commit("mSetActiveDialog", data);
		}
	},
	doCleanData(context) {
		context.commit("mCleanData");
	},
	clearEditData(context) {
		context.commit("mCleanDataEditable");
	}
};

const mutations = {
	setDataDialog(state, data) {
		state.categoryKey = data.categoryKey;
	},
	mSetData(state, data) {
		state.dataTable = data;
	},
	mSetDataHeader(state, data) {
		state.dataHeader = data;
	},
	mSetActiveDialogEdit(state, data) {
		if (data.isEditable == true) {
			state.isActiveDialog = data.activeDialog;
			state.editableData = data.data;
		} else {
			state.isActiveDialog = data.activeDialog;
			state.editableData = {};
		}
	},
	mSetActiveDialog(state, data) {
		if (data.isEditable == true) {
			state.isActiveDialog = data.activeDialog;
			state.editableData = data.data;
		} else {
			state.isActiveDialog = data.activeDialog;
			state.editableData = {};
		}
	},

	mCleanData(state) {
		state.dataTable = [];
		state.dataHeader = [];
		state.editableData = {};
	},
	mCleanDataEditable(state) {
		state.editableData = {};
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
