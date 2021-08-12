import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import snackbar from "./modules/snackbar";
import bank from "./modules/catalogos/bank";
import dialog from "./modules/dialog";
import hose from "./modules/catalogos/hose";
import client from "./modules/catalogos/client";
import country from "./modules/catalogos/country";
import coldroom from "./modules/catalogos/coldroom";
import region from "./modules/catalogos/region";
import city from "./modules/catalogos/city";
import market from "./modules/catalogos/market";
import airline from "./modules/catalogos/airline";
import airport from "./modules/catalogos/airport";
import transport from "./modules/catalogos/transport";
import provider from "./modules/catalogos/provider";
import variety from "./modules/catalogos/variety";
import product from "./modules/products";
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth,
		snackbar,
		dialog,
		hose,
		client,
		coldroom,
		country,
		region,
		city,
		market,
		airline,
		airport,
		bank,
		transport,
		provider,
		variety,
		product
	}
});
