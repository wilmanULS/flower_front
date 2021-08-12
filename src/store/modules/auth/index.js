/**
 * Authentication storage module
 * State machine to handle user and client authentication
 */
import AuthenticationServices from "@/services/AuthenticationServices";
const state = {
	isLogged: false,
	userToken: null
};

const getters = {
	isLogged: (state) => {
		return state.isLogged;
	},
	userToken: (state) => {
		return state.userToken;
	}
};

const actions = {
	doUserAuthentication(context, payload) {
		return new Promise((resolve, reject) => {
			AuthenticationServices.userLogin(payload)
				.then((response) => {
					if (response.data.code == 200) {
						sessionStorage.setItem("token", response.data.data.token);
						sessionStorage.setItem(
							"refreshToken",
							response.data.data.refreshToken
						);
						context.commit("mCheckLogged");
					}
					resolve(response.data);
				})
				.catch(reject);
		});
	},
	doLogout(context) {
		sessionStorage.clear();
	}
};
const mutations = {
	mCheckLogged(state, data) {
		state.isLogged = !!sessionStorage.getItem("token");
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};
