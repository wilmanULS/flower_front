<template>
	<v-container>
		<v-form ref="formVariety" v-model="validForm" lazy-validation>
			<div v-if="dataEditable.hasOwnProperty('_id')">
				<v-row>
					<v-text-field
						label="Descripción"
						dense
						outlined
						v-model="dataEditable.description"
						:rules="descriptionRules"
					></v-text-field>
				</v-row>
				<v-row>
					<v-menu
						ref="menu1"
						v-model="menu1"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						full-width
						max-width="290px"
						min-width="290px"
					>
						<template v-slot:activator="{ on }">
							<v-text-field
								dense
								v-model="date"
								label="Fecha"
								persistent-hint
								prepend-icon="mdi-calendar"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker v-model="date" no-title locale="es" @input="menu1 = false"></v-date-picker>
					</v-menu>
				</v-row>
			</div>

			<div v-else>
				<v-row>
					<v-text-field
						label="Descripción"
						dense
						outlined
						v-model="varietyModel.description"
						:rules="descriptionRules"
					></v-text-field>
				</v-row>
				<v-row>
					<v-menu
						ref="menu1"
						v-model="menu1"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						full-width
						max-width="290px"
						min-width="290px"
					>
						<template v-slot:activator="{ on }">
							<v-text-field
								dense
								v-model="date"
								label="Fecha"
								persistent-hint
								prepend-icon="mdi-calendar"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker v-model="date" no-title locale="es" @input="menu1 = false"></v-date-picker>
					</v-menu>
				</v-row>
			</div>

			<v-row justify="end">
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#ff433a" @click="cancelDialog()">
						<span style="text-transform:Capitalize">Cancelar</span>
					</v-btn>
				</v-col>
				<v-col v-if="dataEditable.hasOwnProperty('_id')" cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="saveVariety"
						><span style="text-transform:Capitalize">Guardar</span></v-btn
					>
				</v-col>
				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createVariety">
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
	data: () => ({
		settings: {
			maxScrollbarLength: 60
		},
		date: new Date().toISOString().substr(0, 10),
		menu1: false,
		validForm: true,
		descriptionRules: [(v) => !!v || "Descripción requerida"],
		varietyModel: {
			description: "",
			dateInt: null
		}
	}),
	mounted() {
		if (this.dataEditable) {
			this.date = new Date(this.dataEditable.dateInt).toISOString().substr(0, 10);
		}
	},
	methods: {
		createVariety() {
			if (!this.$refs.formVariety.validate()) {
				return;
			}

			this.varietyModel.dateInt = this.date;
			this.$store
				.dispatch("createVariety", this.varietyModel)
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
			this.$refs.formVariety.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		saveVariety() {
			if (!this.$refs.formVariety.validate()) {
				return;
			}
			this.varietyModel.dateInt = this.date;
			var id = this.dataEditable["_id"];
			delete this.dataEditable["_id"];
			delete this.dataEditable["createdAt"];
			delete this.dataEditable["updatedAt"];
			this.$store
				.dispatch("updateVariety", { id: id, data: this.dataEditable })
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
		}
	}
};
</script>
