<template>
	<v-container grid-list-xs>
		<v-form lazy-validation v-model="validForm" ref="formProduct">
			<v-row>
				<v-radio-group v-model="radios" row :mandatory="false">
					<v-radio label="Guardar" value="1"></v-radio>
					<v-radio label="Imprimir" value="2"></v-radio>
				</v-radio-group>
			</v-row>
			<v-row>
				<v-menu
					v-model="menuR"
					:close-on-content-click="false"
					:nudge-right="40"
					transition="scale-transition"
					offset-y
					min-width="290px"
				>
					<template v-slot:activator="{ on }">
						<v-text-field
							v-model="dateRegister"
							label="Fecha"
							prepend-icon="mdi-calendar"
							:rules="dateRules"
							readonly
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker locale="es" v-model="dateRegister" @input="menuR = false"></v-date-picker>
				</v-menu>
			</v-row>
			<v-row>
				<v-col class="pb-0" cols="12" sm="12">
					<v-select
						dense
						:items="typeProducts"
						v-model="productModel.typeProduct"
						:rules="typeProductRules"
						attach
						label="Tipo de Producto"
						outlined
					></v-select>
				</v-col>
				<v-col class="pb-0 pt-0" cols="12" sm="12">
					<v-select
						dense
						:rules="typeBounchRules"
						:items="typeBounche"
						v-model="productModel.typeBounch"
						label="Tipo Bounche"
						outlined
					></v-select>
				</v-col>
				<v-col class="pb-0 pt-0" cols="12" sm="12">
					<v-select
						attach
						dense
						:rules="marketRules"
						v-model="productModel.market"
						:items="marketList"
						item-text="name"
						item-value="_id"
						label="Mercado"
						outlined
					></v-select>
				</v-col>
				<v-col class="pb-0 pt-0" cols="12" sm="12">
					<v-select
						dense
						v-model="productModel.provider"
						:rules="providerRules"
						:items="providerList"
						item-value="_id"
						item-text="names"
						label="Provedor"
						outlined
					></v-select>
				</v-col>
				<v-col class="pb-0 pt-0" cols="12" sm="12">
					<v-select
						dense
						:rules="varietyRules"
						v-model="productModel.variety"
						:items="varietyList"
						item-text="description"
						item-value="_id"
						label="Variedad"
						outlined
					></v-select>
				</v-col>
				<v-col class="pb-0 pt-0" cols="6" md="6">
					<v-select
						dense
						:rules="lengthRules"
						:items="longitud"
						v-model="productModel.length"
						label="Longitud"
						outlined
					></v-select>
				</v-col>
				<v-col class="pb-0 pt-0" cols="6" sm="6">
					<v-select
						dense
						:rules="qualityRules"
						:items="calidad"
						v-model="productModel.quality"
						label="Calidad"
						outlined
					></v-select>
				</v-col>
				<v-col class="pb-0 pt-0" cols="6" sm="6">
					<v-text-field
						dense
						:rules="quantityRules"
						v-model="productModel.quantity"
						label="Cantidad"
						value="25"
						outlined
						min="1"
						type="number"
					></v-text-field>
				</v-col>
				<v-col class="pb-0 pt-0" cols="6" sm="6">
					<v-text-field
						dense
						:rules="numberBouncheRules"
						v-model="productModel.numberBounche"
						label="N° Bunches"
						outlined
						min="1"
						type="number"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row align="center" justify="center">
				<div class="align-center">
					<v-btn block dark color="#022D3C" @click="registerProduct">Registrar</v-btn>
				</div>
			</v-row>
		</v-form>
	</v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["marketList", "providerList", "varietyList"])
	},
	data: () => ({
		radios: "1",
		validForm: false,
		dateRegister: new Date().toISOString().substr(0, 10),
		menuR: false,
		items: ["Foo", "Bar", "Fizz", "Buzz"],
		calidad: ["Exportación", "Exportacón Tipo B", " Composición Especial", "Nacional"],
		longitud: [],
		typeBounche: ["Solido", "Rainbow"],
		typeProducts: ["Exportanción", "Nacional", "Yemas"],
		dateRules: [(v) => !!v || "Fecha requerido"],
		typeProductRules: [(v) => !!v || "Tipo de Producto requerido"],
		typeBounchRules: [(v) => !!v || "Tipo de Bounche requerido"],
		marketRules: [(v) => !!v || "Mercado requerido"],
		providerRules: [(v) => !!v || "Proveedor requerido"],
		varietyRules: [(v) => !!v || "Variedad requerido"],
		lengthRules: [(v) => !!v || "Longitud requerido"],
		qualityRules: [(v) => !!v || "Calidad requerida"],
		quantityRules: [(v) => !!v || "Cantidad requerida"],
		numberBouncheRules: [(v) => !!v || "N° Bounches requerido"],
		statusRules: [(v) => !!v || "Opción requerida"],
		productModel: {
			date: "",
			typeProduct: "",
			typeBounch: "",
			market: "",
			provider: "",
			variety: "",
			length: "",
			quality: "",
			quantity: null,
			numberBounche: null,
			observation: "",
			status: null
		}
	}),
	created() {
		this.longitudes();
		this.$store.dispatch("getMarketList");
		this.$store.dispatch("getProviderList");
		this.$store.dispatch("getVarietyList");
	},
	methods: {
		longitudes() {
			var long = 40;
			while (long <= 100) {
				this.longitud.push(long);
				long += 10;
			}
		},
		registerProduct() {
			if (!this.$refs.formProduct.validate()) {
				return;
			}
			this.productModel.status = parseInt(this.radios);
			this.productModel.date = this.dateRegister;
			this.$store
				.dispatch("createProduct", this.productModel)
				.then((response) => {
					if (response.code == 200) {
						this.$store.dispatch("triggerSnackbar", {
							text: "Se ha creado correctamente",
							color: "success"
						});
					} else {
						this.$store.dispatch("triggerSnackbar", {
							text: "Ha ocurrido un erro al registrar",
							color: "error"
						});
					}
				})
				.finally(() => {
					this.$refs.formProduct.reset();
				});
		}
	}
};
</script>
