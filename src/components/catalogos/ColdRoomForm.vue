<template>
	<v-container grid-list-xs>
		<v-form ref="formCF" v-model="validForm" lazy-validation>
			<div v-if="dataEditable.hasOwnProperty('_id')">
				<v-row>
					<v-text-field
						label="Cuarto Frio"
						outlined
						dense
						v-model="dataEditable.name"
						:rules="nameRules"
					></v-text-field>
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
					<v-text-field label="Cuarto Frio" outlined dense v-model="cuartoModel.name" :rules="nameRules"></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						label="Descripción"
						outlined
						dense
						v-model="cuartoModel.description"
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
					<v-btn outlined block dark color="#022D3C" @click="saveColdRoom"
						><span style="text-transform:Capitalize">Guardar</span></v-btn
					>
				</v-col>
				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createCuartoFrio"
						><span style="text-transform:Capitalize">Registrar</span></v-btn
					>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
	props: {
		dataEditable: Object
	},
	components: {
		VuePerfectScrollbar
	},
	data: () => ({
		settings: {
			maxScrollbarLength: 60
		},
		validForm: true,
		cuartoModel: {
			name: "",
			description: ""
		},
		nameRules: [(v) => !!v || "Nombre requerido"],
		descriptionRules: [(v) => !!v || "Descripción requerida"]
	}),
	methods: {
		cancelDialog() {
			this.$refs.formCF.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		saveColdRoom() {
			if (!this.$refs.formCF.validate()) {
				return;
			}

			var id = this.dataEditable["_id"];
			delete this.dataEditable["_id"];
			delete this.dataEditable["createdAt"];
			delete this.dataEditable["updatedAt"];
			delete this.dataEditable["status"];

			this.$store
				.dispatch("updateColdRoom", { id: id, data: this.dataEditable })
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
		createCuartoFrio() {
			if (!this.$refs.formCF.validate()) {
				return;
			}
			this.$store
				.dispatch("createColdRoom", this.cuartoModel)
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
}
</style>
