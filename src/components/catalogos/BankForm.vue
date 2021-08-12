<template>
	<v-container grid-list-xs>
		<v-form ref="formBank" v-model="validForm" lazy-validation>
			<div v-if="dataEditable.hasOwnProperty('_id')">
				<v-row>
					<v-text-field
						label="Nombre del Banco"
						outlined
						dense
						:rules="bankRules"
						v-model="dataEditable.bank"
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="N° Cuenta"
						outlined
						dense
						:rules="accountRules"
						v-model="dataEditable.account"
					></v-text-field>
				</v-row>
				<v-row>
					<v-select
						dense
						attach
						item-text="name"
						item-value="code"
						:items="typesAccount"
						label="Tipo de Cuenta"
						outlined
						:rules="typeRules"
						required
						v-model="dataEditable.type"
					></v-select>
				</v-row>
			</div>
			<div v-else>
				<v-row>
					<v-text-field
						label="Nombre del Banco"
						outlined
						dense
						:rules="bankRules"
						v-model="bankModel.bank"
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="N° Cuenta"
						outlined
						dense
						:rules="accountRules"
						v-model="bankModel.account"
					></v-text-field>
				</v-row>
				<v-row>
					<v-select
						dense
						attach
						item-text="name"
						item-value="code"
						:items="typesAccount"
						label="Tipo de Cuenta"
						outlined
						:rules="typeRules"
						required
						v-model="bankModel.type"
					></v-select>
				</v-row>
			</div>
			<v-row justify="end">
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#ff433a" @click="cancelDialog()"
						><span style="text-transform:Capitalize">Cancelar</span></v-btn
					>
				</v-col>
				<v-col v-if="dataEditable.hasOwnProperty('_id')" cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="saveBank"
						><span style="text-transform:Capitalize">Guardar</span></v-btn
					>
				</v-col>
				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createBank"
						><span style="text-transform:Capitalize">Registrar</span></v-btn
					>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
export default {
	props: {
		dataEditable: Object
	},
	data: () => ({
		validForm: true,
		descriptionRules: [(v) => !!v || "Descripción requerida"],
		bankRules: [(v) => !!v || "Banco requerido"],
		accountRules: [(v) => !!v || "Cuenta requerida"],
		typeRules: [(v) => !!v || "Tipo requerido"],
		typesAccount: [
			{
				name: "Ahorros",
				code: 1
			},
			{
				name: "Corriente",
				code: 2
			}
		],
		bankModel: {
			bank: "",
			account: "",
			type: ""
		}
	}),
	methods: {
		createBank() {
			if (!this.$refs.formBank.validate()) {
				return;
			}
			this.$store
				.dispatch("createBank", this.bankModel)
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
		saveBank() {
			if (!this.$refs.formBank.validate()) {
				return;
			}
			var id = this.dataEditable["_id"];
			delete this.dataEditable["_id"];
			delete this.dataEditable["createdAt"];
			delete this.dataEditable["updatedAt"];

			this.$store
				.dispatch("updateBank", { id: id, data: this.dataEditable })
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
			this.$refs.formBank.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		}
	}
};
</script>

<style scoped></style>
