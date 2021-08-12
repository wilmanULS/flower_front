<template>
	<v-container grid-list-xs>
		<v-form ref="formAirline" v-model="validForm" lazy-validation>
			<div v-if="dataEditable.hasOwnProperty('_id')">
				<v-row>
					<v-text-field
						label="Aerolinea"
						outlined
						dense
						:rules="airlineRules"
						v-model="dataEditable.airline"
					></v-text-field>
				</v-row>
				<v-row
					><v-text-field
						label="Código Guía"
						outlined
						dense
						:rules="codeRules"
						v-model="dataEditable.guideCode"
						type="number"
					></v-text-field>
				</v-row>
			</div>
			<div v-else>
				<v-row>
					<v-text-field
						label="Aerolinea"
						outlined
						dense
						:rules="airlineRules"
						v-model="airlineModel.airline"
					></v-text-field>
				</v-row>
				<v-row
					><v-text-field
						label="Código Guía"
						outlined
						dense
						:rules="codeRules"
						v-model="airlineModel.guideCode"
						type="number"
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
					v-if="dataEditable.hasOwnProperty('_id')"
					cols="12"
					xs="6"
					lg="6"
					md="6"
				>
					<v-btn outlined block dark color="#022D3C" @click="guardarAirline"
						><span style="text-transform:Capitalize">Guardar</span></v-btn
					>
				</v-col>
				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createAirline"
						><span style="text-transform:Capitalize">Registrar</span></v-btn
					>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>
<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";
export default {
	props: {
		dataEditable: Object
	},
	computed: {
		...mapGetters(["countryList", "airlineList"])
	},
	data: () => ({
		settings: {
			maxScrollbarLength: 60
		},
		validForm: true,
		airlineRules: [(v) => !!v || "Aerolinea requerida"],
		codeRules: [(v) => !!v || "Código requerido"],
		airlineModel: {
			airline: "",
			guideCode: null
		}
	}),
	watch: {
		dataEditable(newVal, oldVal) {
			if (!oldVal) {
				this.airlineModel = newVal;
			} else {
				this.airlineModel = this.dataEditable;
			}
		}
	},
	methods: {
		createAirline() {
			if (!this.$refs.formAirline.validate()) {
				return;
			}
			this.$store
				.dispatch("createAirline", this.airlineModel)
				.then((response) => {
					if (response.code == 200) {
						this.$store.dispatch("triggerSnackbar", {
							text: "Se ha creado correctamente",
							color: "success"
						});
					}
				})
				.finally(() => {
					this.cancelDialog();
					this.$store.dispatch("doData", "Aerolineas");
				});
		},
		cancelDialog() {
			this.$refs.formAirline.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		guardarAirline() {
			if (!this.$refs.formAirline.validate()) {
				return;
			}
			var id = this.dataEditable["_id"];
			delete this.dataEditable["_id"];
			delete this.dataEditable["createdAt"];
			delete this.dataEditable["updatedAt"];
			this.$store
				.dispatch("updateAirline", { id: id, data: this.dataEditable })
				.then((response) => {
					if (response.code == 200) {
						this.$store.dispatch("triggerSnackbar", {
							text: "Se ha actualizado correctamente",
							color: "success"
						});
					}
				})
				.finally(() => {
					this.cancelDialog();
					this.$store.dispatch("doData", this.airlineList);
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
