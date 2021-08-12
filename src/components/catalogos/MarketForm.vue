<template>
	<v-container grid-list-xs>
		<v-form ref="formMercado" v-model="validForm" lazy-validation>
			<div v-if="dataEditable.hasOwnProperty('_id')">
				<v-row>
					<v-text-field
						dense
						label="Nombre del mercado"
						outlined
						denser
						v-model="dataEditable.name"
						:rules="nameRules"
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						dense
						label="Descripción"
						outlined
						denser
						v-model="dataEditable.description"
						:rules="descriptionRules"
					></v-text-field>
				</v-row>
			</div>
			<div v-else>
				<v-row>
					<v-text-field
						dense
						label="Nombre del mercado"
						outlined
						denser
						v-model="mercadoModel.name"
						:rules="nameRules"
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						dense
						label="Descripción"
						outlined
						denser
						v-model="mercadoModel.description"
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
					<v-btn outlined block dark color="#022D3C" @click="saveMarket"
						><span style="text-transform:Capitalize">Guardar</span></v-btn
					>
				</v-col>

				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createMercado"
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
		nameRules: [(v) => !!v || "Nombre requerido"],
		descriptionRules: [(v) => !!v || "Descripción requerida"],
		validForm: true,
		mercadoModel: {
			name: "",
			description: ""
		}
	}),
	methods: {
		cancelDialog() {
			this.$refs.formMercado.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		saveMarket() {
			if (!this.$refs.formMercado.validate()) {
				return;
			}
			var id = this.dataEditable["_id"];
			delete this.dataEditable["_id"];
			delete this.dataEditable["createdAt"];
			delete this.dataEditable["updatedAt"];
			delete this.dataEditable["status"];

			this.$store
				.dispatch("updateMarket", { id: id, data: this.dataEditable })
				.then((response) => {
					if (response.code == 200) {
						this.$store.dispatch("triggerSnackbar", {
							text: "Se ha guardado correctamente",
							color: "success"
						});
					}
				})
				.finally(() => {
					this.cancelDialog();
				});
		},
		createMercado() {
			if (!this.$refs.formMercado.validate()) {
				return;
			}

			this.$store
				.dispatch("createMarket", this.mercadoModel)
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
