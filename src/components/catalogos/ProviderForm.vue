<template>
	<v-container grid-list-xs>
		<v-form ref="formProvider" v-model="validForm" lazy-validation>
			<div v-if="dataEditable.hasOwnProperty('_id')">
				<v-row>
					<v-text-field label="Nombres" dense outlined :rules="namesRules" v-model="dataEditable.names"></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Apellidos"
						dense
						outlined
						:rules="lastnamesRules"
						v-model="dataEditable.lastnames"
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Cédula"
						dense
						outlined
						:rules="identificationRules"
						v-model="dataEditable.identification"
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field label="Celular" dense outlined :rules="phonesRules" v-model="dataEditable.phone"></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Dirección"
						dense
						outlined
						:rules="addressRules"
						v-model="dataEditable.address"
					></v-text-field>
				</v-row>
			</div>

			<div v-else>
				<v-row>
					<v-text-field label="Nombres" dense outlined :rules="namesRules" v-model="providerModel.names"></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Apellidos"
						dense
						outlined
						:rules="lastnamesRules"
						v-model="providerModel.lastnames"
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Cédula"
						dense
						outlined
						:rules="identificationRules"
						v-model="providerModel.identification"
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Celular"
						dense
						outlined
						:rules="phonesRules"
						v-model="providerModel.phone"
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Dirección"
						dense
						outlined
						:rules="addressRules"
						v-model="providerModel.address"
					></v-text-field>
				</v-row>
			</div>
			<v-row justify="end">
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#ff433a" @click="cancelDialog()">
						<span style="text-transform:Capitalize">Cancelar</span>
					</v-btn>
				</v-col>
				<v-col v-if="dataEditable.hasOwnProperty('_id')" cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="guardarproveedor">
						<span style="text-transform:Capitalize">Guardar</span>
					</v-btn>
				</v-col>
				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createproveedor">
						<span style="text-transform:Capitalize">Registrar</span>
					</v-btn>
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
		identificationRules: [(v) => !!v || "Cédula requerida"],
		namesRules: [(v) => !!v || "Nombres requerido"],
		lastnamesRules: [(v) => !!v || "Apellidos requerido"],
		phonesRules: [(v) => !!v || "Teléfono requerido"],
		addressRules: [(v) => !!v || "Dirección requerido"],
		providerModel: {
			names: "",
			lastnames: "",
			identification: "",
			phone: "",
			address: ""
		}
	}),
	methods: {
		createproveedor() {
			if (!this.$refs.formProvider.validate()) {
				return;
			}
			this.$store
				.dispatch("createProvider", this.providerModel)
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
				});
		},
		cancelDialog() {
			this.$refs.formProvider.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		guardarproveedor() {
			if (!this.$refs.formProvider.validate()) {
				return;
			}
			var id = this.dataEditable["_id"];
			delete this.dataEditable["_id"];
			delete this.dataEditable["createdAt"];
			delete this.dataEditable["updatedAt"];
			this.$store
				.dispatch("updateProvider", { id: id, data: this.dataEditable })
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
				});
		},
		cancelDialog() {
			this.$refs.formProvider.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
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
