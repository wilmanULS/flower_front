<template>
	<v-container>
		<v-form ref="formDae" v-model="validForm" lazy-validation>
			<v-row>
				<v-col lg="12" style="padding:0px">
					<v-text-field label="Código DAE" outlined dense :rules="codeRules" v-model="daeModel.code"></v-text-field>
				</v-col>
				<v-col lg="12" style="padding:0px">
					<v-text-field
						label="Descripción"
						outlined
						dense
						:rules="descriptionRules"
						v-model="daeModel.description"
					></v-text-field>
				</v-col>
				<v-col lg="12" style="padding:0px">
					<v-select
						:items="countryList"
						outlined
						item-text="description"
						item-value="_id"
						dense
						label="Pais"
						:rules="countryRules"
						v-model="daeModel.paisId"
					>
					</v-select>
				</v-col>
			</v-row>

			<v-row justify="end">
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#ff433a" @click="cancelDialog()"
						><span style="text-transform:Capitalize">Cancelar</span></v-btn
					>
				</v-col>
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createDAE"
						><span style="text-transform:Capitalize">Registrar</span></v-btn
					>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>
<script>

import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["countryList"])
	},
	data: () => ({
		items: [{ name: "Chile" }, { name: "EE.UU" }, { name: "Kazajistán" }, { name: "Letonia" }, { name: "Rusia" }],
		validForm: true,
		codeRules: [(v) => !!v || "Código requerido"],
		countryRules: [(v) => !!v || "País requerido"],
		descriptionRules: [(v) => !!v || "Descrpición requerida"],
		daeModel: {
			code: "",
			description: "",
			paisId: ""
		}
	}),
	created() {
		this.$store.dispatch("getCountryList");
	},
	methods: {
		cancelDialog() {
			this.$refs.formDae.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		createDAE() {
			if (!this.$refs.formDae.validate()) {
				return;
			}
			this.$store.dispatch("createDae", this.daeModel).then((response) => {
				if (response.code == 200) {
					this.$store.dispatch("triggerSnackbar", {
						text: "Se ha creado correctamente",
						color: "success"
					});
				}
			});
		}
	}
};
</script>
