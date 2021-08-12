<template>
	<v-container grid-list-xs>
		<v-form ref="formCliente" v-model="validForm" lazy-validation>
			<div v-if="dataEditable.hasOwnProperty('_id')">
				<v-row>
					<v-col>
						<v-text-field label="Nombre" outlined dense :rules="nameRules" v-model="dataEditable.name"></v-text-field>
					</v-col>
					<v-col>
						<v-text-field
							label="Dirección"
							outlined
							dense
							:rules="addressRules"
							v-model="dataEditable.address"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col class="pt-0">
						<v-text-field label="Email" outlined dense :rules="emailRules" v-model="dataEditable.email"></v-text-field>
					</v-col>
					<v-col class="pt-0">
						<v-text-field
							label="Teléfono"
							outlined
							dense
							:rules="phoneRules"
							v-model="dataEditable.phone"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row></v-row>
				<v-row>
					<v-col class="pt-0">
						<v-text-field
							label="Contacto"
							outlined
							dense
							:rules="contactRules"
							v-model="dataEditable.contact"
						></v-text-field>
					</v-col>
					<v-col class="pt-0">
						<v-text-field
							label="Código país"
							outlined
							dense
							:rules="countryCodeRules"
							v-model="dataEditable.countryCode"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col class="pt-0">
						<v-text-field
							label="Balance Inicial"
							outlined
							dense
							:rules="balanceRules"
							type="number"
							v-model="dataEditable.initial_balance"
						></v-text-field>
					</v-col>
					<v-col class="pt-0">
						<v-text-field
							label="Créditos del Día"
							outlined
							dense
							:rules="creditsRules"
							v-model="dataEditable.credit_days"
							type="number"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col class="pt-0">
						<v-text-field
							label="Descripción"
							outlined
							dense
							:rules="descriptionRules"
							v-model="dataEditable.description"
						></v-text-field>
					</v-col>
				</v-row>
			</div>

			<div v-else>
				<v-row>
					<v-col>
						<v-text-field label="Nombre" outlined dense :rules="nameRules" v-model="clientModel.name"></v-text-field>
					</v-col>
					<v-col>
						<v-text-field
							label="Dirección"
							outlined
							dense
							:rules="addressRules"
							v-model="clientModel.address"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col class="pt-0">
						<v-text-field label="Email" outlined dense :rules="emailRules" v-model="clientModel.email"></v-text-field>
					</v-col>
					<v-col class="pt-0">
						<v-text-field
							label="Teléfono"
							outlined
							dense
							:rules="phoneRules"
							v-model="clientModel.phone"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row></v-row>
				<v-row>
					<v-col class="pt-0">
						<v-text-field
							label="Contacto"
							outlined
							dense
							:rules="contactRules"
							v-model="clientModel.contact"
						></v-text-field>
					</v-col>
					<v-col class="pt-0">
						<v-text-field
							label="Código país"
							outlined
							dense
							:rules="countryCodeRules"
							v-model="clientModel.countryCode"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col class="pt-0">
						<v-text-field
							label="Balance Inicial"
							outlined
							dense
							:rules="balanceRules"
							type="number"
							v-model="clientModel.initial_balance"
						></v-text-field>
					</v-col>
					<v-col class="pt-0">
						<v-text-field
							label="Créditos del Día"
							outlined
							dense
							:rules="creditsRules"
							v-model="clientModel.credit_days"
							type="number"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col class="pt-0">
						<v-text-field
							label="Descripción"
							outlined
							dense
							:rules="descriptionRules"
							v-model="clientModel.description"
						></v-text-field>
					</v-col>
				</v-row>
			</div>

			<v-row justify="end">
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#ff433a" @click="cancelDialog()"
						><span style="text-transform:Capitalize">Cancelar</span></v-btn
					>
				</v-col>
				<v-col v-if="dataEditable.hasOwnProperty('_id')" cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="saveClient"
						><span style="text-transform:Capitalize">Guardar</span></v-btn
					>
				</v-col>
				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createClient"
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
		phones: [{ number: "", type: 1 }],
		typesPhones: [
			{ name: "Celular", code: 1 },
			{ name: "Convencional", code: 2 },
			{ name: "Fax", code: 3 }
		],
		validForm: true,
		nameRules: [(v) => !!v || "Nombre requerido"],
		emailRules: [
			(v) => !!v || "Correo requerido",
			(v) =>
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					v
				) || "Correo Inválido"
		],
		phoneRules: [(v) => !!v || "Teléfono requerida", (v) => (v && v.length == 10) || "Debe tener 10 dígitos"],
		addressRules: [(v) => !!v || "Dirección requerida"],
		descriptionRules: [(v) => !!v || "Descripción requerida"],
		contactRules: [(v) => !!v || "Contacto requerido"],
		countryCodeRules: [(v) => !!v || "Código requerido"],
		balanceRules: [(v) => !!v || "Balance Inicial requerido"],
		creditsRules: [(v) => !!v || "Créditos requeridos"],
		clientModel: {
			countryCode: "",
			name: "",
			address: "",
			phone: "",
			email: "",
			contact: "",
			description: "",
			initial_balance: 0,
			credit_days: 0
		}
	}),
	methods: {
		cancelDialog() {
			this.$refs.formCliente.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		saveClient() {
			if (!this.$refs.formCliente.validate()) {
				return;
			}

			var id = this.dataEditable["_id"];
			delete this.dataEditable["_id"];
			delete this.dataEditable["createdAt"];
			delete this.dataEditable["updatedAt"];
			delete this.dataEditable["status"];

			this.$store
				.dispatch("updateClient", { id: id, data: this.dataEditable })
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
		createClient() {
			if (!this.$refs.formCliente.validate()) {
				return;
			}

			this.$store
				.dispatch("createClient", this.clientModel)
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
