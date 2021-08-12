<template>
	<v-container grid-list-xs>
		<v-form ref="formAirport" v-model="validForm" lazy-validation>
			<div v-if="airportEditable.hasOwnProperty('_id')">
				<v-row>
					<v-text-field
						label="Aeropuerto"
						outlined
						dense
						:rules="descriptionRules"
						v-model="airportEditable.description"
					></v-text-field>
				</v-row>
			</div>
			<div v-else>
				<v-row>
					<v-text-field
						label="Aeropuerto"
						outlined
						dense
						:rules="descriptionRules"
						v-model="airportModel.description"
					></v-text-field>
				</v-row>
			</div>

			<v-row justify="end">
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#ff433a" @click="cancelDialog()"
						><span style="text-transform:Capitalize">Cancelar</span></v-btn
					>
				</v-col>
				<v-col
					v-if="airportEditable.hasOwnProperty('_id')"
					cols="12"
					xs="6"
					lg="6"
					md="6"
				>
					<v-btn outlined block dark color="#022D3C" @click="updateAirport"
						><span style="text-transform:Capitalize">Guardar</span></v-btn
					>
				</v-col>
				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createAirport"
						><span style="text-transform:Capitalize">Registrar</span></v-btn
					>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";
import Vue from "vue";
import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";
import { log } from "util";
export default {
	props: {
		airportEditable: Object
	},
	components: {
		VuePerfectScrollbar
	},
	computed: {
		...mapGetters(["countryList", "regionList"])
	},
	watch: {
		dataEditable(newVal, oldVal) {
			if (!oldVal) {
				this.airportModel = newVal;
			} else {
				this.airportModel = this.dataEditable;
			}
		}
	},
	data: () => ({
		settings: {
			maxScrollbarLength: 60
		},
		validForm: true,
		descriptionRules: [(v) => !!v || "Descripción requerida"],
		paisRules: [(v) => !!v || "País requerido"],
		regionRules: [(v) => !!v || "Region requerido"],
		airportModel: {
			description: ""
		}
	}),

	methods: {
		cancelDialog() {
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		createAirport() {
			if (!this.$refs.formAirport.validate()) {
				return;
			}
			this.$store
				.dispatch("createAirport", this.airportModel)
				.then((response) => {
					if (response.code == 200) {
						this.$store.dispatch("triggerSnackbar", {
							text: "Se ha creado correctamente",
							color: "success"
						});
					}
				})
				.finally(() => {
					this.$store.dispatch("doData", "Aeropuertos");
					this.cancelDialog();
				});
		},
		updateAirport() {
			if (!this.$refs.formAirport.validate()) {
				return;
			}
			var id = this.airportEditable["_id"];
			delete this.airportEditable["_id"];
			delete this.airportEditable["createdAt"];
			delete this.airportEditable["updatedAt"];
			this.$store
				.dispatch("updateAirport", {
					id: id,
					data: this.airportEditable
				})
				.then((response) => {
					if (response.code == 200) {
						this.$store.dispatch("triggerSnackbar", {
							text: "Se ha actualizado correctamente",
							color: "success"
						});
					}
				})
				.finally(() => {
					this.$store.dispatch("doData", "Aeropuertos");
					this.cancelDialog();
				});
		}
	}
};
</script>
<style scope>
.scrollOff {
	overflow: hidden;
}
.scroll-area {
	position: relative;
	margin: auto;
	height: 100vh;
}
</style>
