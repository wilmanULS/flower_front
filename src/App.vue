<template>
	<v-app>
		<v-content>
			<router-view></router-view>
			<v-snackbar v-model="snackbar.active" :bottom="snackbar.bottom" :right="snackbar.right" :color="snackbar.color">
				{{ snackbar.text }}
				<!--  <v-btn color="pink" flat @click="closeSnackbar">{{snackbar.closeBtnText}}</v-btn> -->
			</v-snackbar>
		</v-content>
	</v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "App",
	data: () => ({
		//
	}),
	computed: {
		...mapGetters(["isLogged", "getSnackbarData"]),
		snackbar: {
			get() {
				return this.$store.getters.getSnackbarData;
			}
		}
	},
	methods: {
		closeSnackbar() {
			this.$store.dispatch("closeSnackbar");
		}
	}
};
</script>
<style lang="css">
body {
	overflow-x: hidden;
	overflow-y: hidden;
}
.scroll-off {
	overflow-x: hidden;
	overflow-y: hidden;
}
</style>
