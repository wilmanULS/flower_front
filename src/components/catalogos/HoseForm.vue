<template class="scrollOff">
	<v-container grid-list-xs>
		<v-form ref="form" v-model="validForm" lazy-validation>
			<v-row>
				<v-col>
					<v-text-field
						dense
						label="Descripción"
						outlined
						:rules="descripcionRules"
						required
						v-model="cargueraModel.description"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="pt-0" cols="12" md="6" xs="6" lg="6">
					<h4>Agregar Teléfonos</h4>
				</v-col>
				<v-col align="end" class="pt-0" cols="12" lg="6" md="6" xs="6">
					<v-btn @click="AddPhones" fab dark x-small color="primary">
						<v-icon dark>mdi-plus</v-icon>
					</v-btn>
				</v-col>
				<v-col v-if="alertPhones" class="pt-0 pb-0 ">
					<v-span style="color:red">Mínimo un teléfono</v-span>
				</v-col>
			</v-row>
			<v-row fluid="true" v-for="(phone, index) in phones" :key="index">
				<v-col class="pt-0" cols="12" md="5" lg="5">
					<v-text-field
						dense
						label="Teléfono"
						outlined
						v-model="phone.number"
						required
						:rules="phonesRules"
					></v-text-field>
				</v-col>
				<v-col class="pt-0" md="5" lg="5">
					<v-select
						dense
						item-text="name"
						item-value="code"
						:items="typesPhones"
						label="Tipo de Teléfono"
						outlined
						:rules="selectRules"
						required
						v-model="phone.type"
					></v-select>
				</v-col>
				<v-col class="pt-1" md="2" lg="2">
					<v-btn @click="RemovePhone(index)" class="mx-2" fab dark x-small color="primary">
						<v-icon dark>mdi-minus</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col md="10" lg="10">
					<h4>Agregar Correos Electrónicos</h4>
				</v-col>
				<v-col align="end" md="2" lg="2">
					<v-btn @click="AddCorreos" fab dark x-small color="primary">
						<v-icon dark>mdi-plus</v-icon>
					</v-btn>
				</v-col>
				<v-col v-if="alertEmail" class="pt-0">
					<v-span style="color:red">Mínimo un correo</v-span>
				</v-col>
			</v-row>
			<v-row v-for="(email, index) in correos" :key="index">
				<v-col cols="12" md="9" lg="9" xs="9">
					<v-text-field
						dense
						label="Email"
						outlined
						required
						:rules="emailRules"
						v-model="correos[index]"
					></v-text-field>
				</v-col>
				<v-col align="end" cols="12" md="3" lg="3">
					<v-btn @click="RemoveCorreos(index)" fab dark x-small color="primary">
						<v-icon dark>mdi-minus</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" class="pt-0">
					<v-text-field
						dense
						label="Contacto"
						outlined
						required
						:rules="contacRules"
						v-model="cargueraModel.contact"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row justify="end">
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#ff433a" @click="cancelDialog()"
						><span style="text-transform:Capitalize">Cancelar</span></v-btn
					>
				</v-col>
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createHose"
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
	components: {
		VuePerfectScrollbar
	},
	data: () => ({
		validForm: true,
		settings: {
			maxScrollbarLength: 60
		},
		descripcionRules: [(v) => !!v || "Descripción requerida"],
		selectRules: [(v) => !!v || "Campo requerido"],
		phonesRules: [(v) => !!v || "Teléfono requerido", (v) => (v && v.length == 10) || "Debe tener 10 dígitos"],
		emailRules: [
			(v) => !!v || "Correo requerido",
			(v) =>
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					v
				) || "Correo Inválido"
		],
		contacRules: [(v) => !!v || "Contacto requerido"],
		phones: [],
		typesPhones: [
			{ name: "Convencional", code: 1 },
			{ name: "Celular", code: 2 },
			{ name: "Fax", code: 3 }
		],
		cargueraModel: {
			description: "",
			phones: [],
			email: [],
			contact: ""
		},
		correos: [""],
		alertPhones: false,
		alertEmail: false
	}),
	methods: {
		AddPhones() {
			this.phones.push({ number: "", type: 1 });
		},
		RemovePhone(index) {
			this.phones.splice(index, 1);
		},
		AddCorreos() {
			this.correos.push("");
		},
		RemoveCorreos(index) {
			this.correos.splice(index, 1);
		},
		cancelDialog() {
			this.$refs.form.resetValidation();
			this.$store.dispatch("doActiveDialog", {
				isEditable: false,
				activeDialog: false
			});
		},
		createHose() {
			if (!this.$refs.form.validate()) {
				return;
			}
			this.cargueraModel.phones = this.phones;
			this.cargueraModel.email = this.correos;

			if (this.phones.length <= 0) {
				this.alertPhones = true;
				setTimeout(() => {
					this.alertPhones = false;
				}, 1500);
			} else if (this.correos.length <= 0) {
				this.alertEmail = true;
				setTimeout(() => {
					this.alertEmail = false;
				}, 1500);
			} else {
					this.$store.dispatch("createHose", this.cargueraModel).then((response) => {
				if (response.code == 200) {
					this.$store.dispatch("triggerSnackbar", {
						text: "Se ha creado correctamente",
						color: "success"
					});
				} else {
					this.$store.dispatch("triggerSnackbar", {
						text: "Ha ocurrido un error, por favor revise sus datos",
						color: "error"
					});
				}
			});
			}
		},
		updateHose() {
			if (!this.$refs.form.validate()) {
				return;
			}
			this.cargueraModel.phones = this.phones;
			this.cargueraModel.email = this.correos;
			/* 	this.$store
				.dispatch("createCarguera", this.cargueraModel)
				.then((response) => {
					if (response.code == 200) {
						this.$store.dispatch("triggerSnackbar", {
							text: "Se ha creado correctamente",
							color: "success"
						});
					}
				}); */
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
