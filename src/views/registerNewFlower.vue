<template>
	<VuePerfectScrollbar class="scroll-area" :settings="settings">
		<v-container grid-list-xs>
			<v-row>
				<v-col xl="4" lg="4" md="4">
					<form-register></form-register>
				</v-col>
				<v-col cols="12" xl="8" lg="8" md="7" sm="12" style="border:solid 1px gray">
					<v-card flat color="transparent">
						<v-card-title>
							<v-spacer></v-spacer>
							<v-text-field
								v-model="search"
								append-icon="mdi-search-web"
								label="Search"
								single-line
								hide-details
							></v-text-field>
						</v-card-title>
						<v-data-table :custom-filter="searchCustom" :headers="headers" :items="productList" :search="search">
							<template v-slot:item.action="{ item }">
								<v-tooltip bottom>
									<template v-slot:activator="{ on }">
										<v-icon small v-on="on">
											mdi-plus-box
										</v-icon>
									</template>
									<span>Agregar Producción</span>
								</v-tooltip>

								<v-tooltip bottom>
									<template v-slot:activator="{ on }">
										<v-icon small v-on="on">
											mdi-minus-box
										</v-icon>
									</template>
									<span>Anular Producción</span>
								</v-tooltip>
								<v-tooltip bottom>
									<template v-slot:activator="{ on }">
										<v-icon small v-on="on">
											mdi-arrow-down-bold-circle
										</v-icon>
									</template>
									<span>Degrade</span>
								</v-tooltip>
							</template>
							<template v-slot:item.market="{ item }">{{ item.market.name }}</template>
							<template v-slot:item.provider="{ item }">{{ item.provider.names }}</template>
							<template v-slot:item.variety="{ item }">{{ item.variety.description }}</template>
						</v-data-table>
					</v-card>

					<v-row>
						<v-col align="right" cols="12" xs="6" md="6" lg="6">
							<span class="textTotal">TOTAL BOUNCHES</span>
						</v-col>
						<v-col align="center" cols="12" xs="6" md="6" lg="6">
							<span class="textNumber">NULE</span>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</VuePerfectScrollbar>
</template>
<script>
import headRegister from "../components/registerFlower/headRegisterFlower";
import FormRegister from "../components/registerFlower/FormRegister";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";
import { type } from "os";
export default {
	computed: {
		...mapGetters(["productList"])
	},
	data() {
		return {
			search: "",
			headers: [
				{
					text: "Mercado",
					align: "left",
					sortable: false,
					value: "market"
				},
				{ text: "Calidad", value: "quality" },
				{
					text: "Variedad",
					value: "variety"
				},
				{ text: "Proveedor", value: "provider" },
				{ text: "Longitud", value: "length" },
				{ text: "Total Bounche", value: "numberBounche" },
				{ text: "Acciones", value: "action", sortable: false }
			],
			settings: {
				maxScrollbarLength: 60
			}
		};
	},
	components: {
		VuePerfectScrollbar,
		"head-register": headRegister,
		"form-register": FormRegister
	},
	created() {
		this.$store.dispatch("getProductList", { statusP: 1 });
	},
	methods: {
		searchCustom(value, search, item) {
			if (typeof value === "object") {
				if (value["name"]) {
					return value != null && search != null && value.name.toString().indexOf(search) !== -1;
				} else if (value["description"]) {
					return value != null && search != null && value.description.toString().indexOf(search) !== -1;
				}
			} else if (typeof value === "number") {
				return value.toString().indexOf(search) !== -1;
			} else if (typeof value === "string") {
				return value.toString().indexOf(search) !== -1;
			}
		}
	}
};
</script>
<style scope>
.scroll-area {
	position: relative;
	margin: auto;
	height: 90vh;
}
.textTotal {
	font-size: 26px;
	color: black;
	font-weight: 800;
}
.textNumber {
	font-size: 26px;
	color: red;
	font-weight: 800;
}
</style>
