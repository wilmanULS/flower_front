<template>
	<v-row justify="center">
		<v-dialog
			v-model="model"
			fullscreen
			transition="dialog-bottom-transition"
			class="scrollOff"
		>
			<v-card tile>
				<v-toolbar flat dark color="#022D3C">
					<v-toolbar-title>{{ categoryKey }}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark @click="$emit('onClose')">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-card-text style="padding: 0px">
					<VuePerfectScrollbar class="scroll-area" v-once :settings="settings">
						<dinamic-table v-if="dataTable && dataHeader"></dinamic-table>
					</VuePerfectScrollbar>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-row>
</template>
<script>
import DinamicTable from "./catalogos/tables/DinamicTable";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["categoryKey", "isActiveDialog", "dataTable", "dataHeader"]),
		dataTable: {
			get() {
				return this.$store.getters.dataTable;
			}
		},
		dataHeader: {
			get() {
				return this.$store.getters.dataHeader;
			}
		}
	},
	 watch: {
    dialogCatalog (val) {
      val || this.close()
    },
  },
	components: {
		VuePerfectScrollbar,
		"dinamic-table": DinamicTable
	},
	data() {
		return {
			
			dialogCatalog: false,
			airline: false,
			airportForm: false,
			coldRoom: false,
			bankForm: false,
			hoseForm: false,
			cityForm: false,
			clientForm: false,
			countryForm: false,
			marketForm: false,
			providerForm: false,
			regionForm: false,
			daeForm: false,
			coordinationForm: false,
			transportForm: false,
			settings: {
				maxScrollbarLength: 60
			},
			headers: [],
			editedIndex: -1,
			editedItem: {
				name: "",
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0
			},
			defaultItem: {
				name: "",
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0
			}
		};
	},
	props: {
		model: Boolean,
		principalTitle: String
	},

	methods: {},
	beforeDestroy() {
		this.$store.dispatch("doCleanData");
	}
};
</script>
<style scope>
.scrollOff {
  overflow-x: hidden;
  overflow-y: hidden;
}
.scroll-area {
  position: relative;
  margin: auto;
  height: 100;
}
</style>
