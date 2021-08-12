<template>
	<v-container>
		<v-form ref="formTransport" v-model="validForm" lazy-validation>
			<div v-if="dataEditable.hasOwnProperty('_id')">
				<v-row>
					<v-text-field label="Nombre" outlined dense v-model="dataEditable.name" :rules="nameRules"></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Descripción"
						outlined
						dense
						v-model="dataEditable.description"
						:rules="descriptionRules"
					></v-text-field>
				</v-row>
			</div>
			<div v-else>
				<v-row>
					<v-text-field label="Nombre" outlined dense v-model="transportModel.name" :rules="nameRules"></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Descripción"
						outlined
						dense
						v-model="transportModel.description"
						:rules="descriptionRules"
					></v-text-field>
				</v-row>
			</div>

			<v-row justify="end">
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#ff433a" @click="cancelDialog()"
						><span style="text-transform:Capitalize">Cancelar</span></v-btn
					>
				</v-col>
				<v-col v-if="dataEditable.hasOwnProperty('_id')" cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="saveTransport"
						><span style="text-transform:Capitalize">Guardar</span></v-btn
					>
				</v-col>
				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="registerTransport"
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
		transportModel: { name: "", description: "" },
		nameRules: [(v) => !!v || "Nombre requerido"],
		descriptionRules: [(v) => !!v || "Descripción requerida"]
	}),
	methods: {
		cancelDialog() {
			this.$refs.formTransport.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		registerTransport() {
			if (!this.$refs.formTransport.validate()) {
				return;
			}
			this.$store
				.dispatch("createTransport", this.transportModel)
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
		saveTransport() {
			if (!this.$refs.formTransport.validate()) {
				return;
			}
			var id = this.dataEditable["_id"];
			delete this.dataEditable["_id"];
			delete this.dataEditable["createdAt"];
			delete this.dataEditable["updatedAt"];

			this.$store
				.dispatch("updateTransport", { id: id, data: this.dataEditable })
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
