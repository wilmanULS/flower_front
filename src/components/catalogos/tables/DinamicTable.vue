<template>
  <v-container fluid class="ma-0 pa-1">
    <!-- 	<v-row class="pa-3">
			<v-col>Lista de {{ categoryKey }}</v-col>
			<v-col align="end"><v-btn color="success">text</v-btn></v-col>
    </v-row>-->
    <v-data-table
      :headers="dataHeader"
      :items="dataTable"
      class="elevation-1"
      :footer-props="{ itemsPerPageText: 'Filas por página' }"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista {{ categoryKey }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            :fullscreen="$vuetify.breakpoint.xsOnly"
            persistent
            v-model="isActiveDialog"
            max-width="450"
            class="scroll-off"
          >
            <template v-slot:activator={"on"} >
              <v-btn color="success" dark class="mb-2" @click="openCatalogDialog(categoryKey)">Nuevo</v-btn>
            </template>
            <v-card style="overflow-y:hidden !important">
              <v-toolbar color="#022D3C" dark dense>
                <v-toolbar-title>
                  <span class="headline">{{ categoryKey }}</span>
                </v-toolbar-title>
              </v-toolbar>

              <v-card-text class="pb-0 pt-3" style="overflow-y:hidden !important">
                <VuePerfectScrollbar class="scroll-area" :settings="settings">
                  <airline-form v-if="actionsDialog.airline" :dataEditable.sync="editableData"></airline-form>
                  <airport-form
                    v-if="actionsDialog.airportForm"
                    :airportEditable.sync="editableData"
                  ></airport-form>
                  <cold-room v-if="actionsDialog.coldRoomForm" :dataEditable.sync="editableData"></cold-room>
                  <bank-form v-if="actionsDialog.bankForm" :dataEditable.sync="editableData"></bank-form>
                  <city-form v-if="actionsDialog.cityForm" :dataEditable.sync="editableData"></city-form>
                  <client-form v-if="actionsDialog.clientForm" :dataEditable.sync="editableData"></client-form>
                  <hose-form v-if="actionsDialog.hoseForm"></hose-form>
                  <market-form v-if="actionsDialog.marketForm" :dataEditable.sync="editableData"></market-form>
                  <provide-form v-if="actionsDialog.providerForm" :dataEditable.sync="editableData"></provide-form>
                  <region-form v-if="actionsDialog.regionForm" :dataEditable.sync="editableData"></region-form>
                  <dae-form v-if="actionsDialog.daeForm"></dae-form>
                  <country-form v-if="actionsDialog.countryForm" :dataEditable.sync="editableData"></country-form>
                  <coordination-form v-if="actionsDialog.coordinationForm"></coordination-form>
                  <transport-form
                    v-if="actionsDialog.transportForm"
                    :dataEditable.sync="editableData"
                  ></transport-form>
                  <boxtype-form v-if="actionsDialog.boxtypeForm" :dataEditable.sync="editableData"></boxtype-form>
                  <variety-form v-if="actionsDialog.varietyForm" :dataEditable.sync="editableData"></variety-form>
                  <dialing-form v-if="actionsDialog.dialingForm" :dataEditable.sync="editableData"></dialing-form>
                </VuePerfectScrollbar>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <delete-dialog
          :titleDeleteDialog="categoryKey"
          :itemDelete="itemCase"
          :model="activateDeleteDialog"
          @onClose="closeDeleteDialog()"
          @onConfirm="deleteItem(item, categoryKey)"
        ></delete-dialog>
        <v-icon small class="mr-2" @click="editItem(item, categoryKey)">mdi-pencil</v-icon>
        <v-icon small @click="openDeleteDialog(item, categoryKey)">mdi-delete</v-icon>
      </template>
      <template v-if="categoryKey == 'Bancos'" v-slot:item.type="{ item }">
        {{
        item.type == 1 ? "Ahorros" : "Corriente"
        }}
      </template>
      <template v-slot:no-data>
        <span>Datos no encontrados</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteDialog from "../../DeleteDialog";
import AirportForm from "../AirportForm";
import BankForm from "../BankForm";
import ColdRoom from "../ColdRoomForm";
import CityForm from "../CityForm";
import ClientForm from "../ClientForm";
import CountryForm from "../CountryForm";
import HoseForm from "../HoseForm";
import MarketForm from "../MarketForm";
import ProviderForm from "../ProviderForm";
import RegionForm from "../RegionForm";
import AirlineForm from "../AirlineForm";
import DaeForm from "../DaeForm";
import CoordinationForm from "../CoordinationForm";
import TransportForm from "../TransportForm";
import BoxTypeForm from "../BoxTypeForm";
import VarietyForm from "../VarietyForm";
import DialingForm from "../DialingForm";

import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  computed: {
    ...mapGetters([
      "categoryKey",
      "isActiveDialog",
      "dataTable",
      "dataHeader",
      "editableData"
    ]),
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
  components: {
    VuePerfectScrollbar,
    "delete-dialog": DeleteDialog,
    "bank-form": BankForm,
    "cold-room": ColdRoom,
    "city-form": CityForm,
    "client-form": ClientForm,
    "country-form": CountryForm,
    "hose-form": HoseForm,
    "market-form": MarketForm,
    "provide-form": ProviderForm,
    "region-form": RegionForm,
    "airport-form": AirportForm,
    "airline-form": AirlineForm,
    "dae-form": DaeForm,
    "coordination-form": CoordinationForm,
    "transport-form": TransportForm,
    "boxtype-form": BoxTypeForm,
    "variety-form": VarietyForm,
    "dialing-form": DialingForm
  },
  created() {},
  data() {
    return {
      itemCase: null,
      activateDeleteDialog: false,
      dialogCatalog: false,
      actionsDialog: {
        airline: false,
        airportForm: false,
        coldRoomForm: false,
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
        boxtypeForm: false,
        varietyForm: false,
        dialingForm: false
      },
      settings: {
        maxScrollbarLength: 60
      }
    };
  },
  methods: {
    closeDeleteDialog() {
      this.activateDeleteDialog = false;
      this.itemCase = "";
    },

    openCatalogDialog(cate) {
      switch (cate) {
        case "Cuartos Fríos":
          this.activeDialogs("coldRoomForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Aerolineas":
          this.activeDialogs("airline");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Aeropuertos":
          this.activeDialogs("airportForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Bancos":
          this.activeDialogs("bankForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Cargueras":
          this.activeDialogs("hoseForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Clientes":
          this.activeDialogs("clientForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "DAE":
          this.activeDialogs("daeForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Mercado":
          this.activeDialogs("marketForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Países":
          this.activeDialogs("countryForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Regiones":
          this.activeDialogs("regionForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Coordinación":
          this.activeDialogs("coordinationForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Transporte":
          this.activeDialogs("transportForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Tipo de Caja":
          this.activeDialogs("boxtypeForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Proveedor":
          this.activeDialogs("providerForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Variedades":
          this.activeDialogs("varietyForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Marcación":
          this.activeDialogs("dialingForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
        case "Ciudades":
          this.activeDialogs("cityForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: false,
            activeDialog: true
          });
          break;
      }
    },
    activeDialogs(propertySearch) {
      if (this.actionsDialog.hasOwnProperty(propertySearch)) {
        for (var [key, value] of Object.entries(this.actionsDialog)) {
          if (key != propertySearch) {
            this.actionsDialog[key] = false;
          } else {
            this.actionsDialog[key] = true;
          }
        }
      }
    },
    editItem(item, category) {
      switch (category) {
        case "Cuartos Fríos":
          this.activeDialogs("coldRoomForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Aerolineas":
          this.activeDialogs("airline");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Aeropuertos":
          this.activeDialogs("airportForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Bancos":
          this.activeDialogs("bankForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Cargueras":
          this.activeDialogs("hoseForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Clientes":
          this.activeDialogs("clientForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "DAE":
          this.activeDialogs("daeForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Mercado":
          this.activeDialogs("marketForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Países":
          this.activeDialogs("countryForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Regiones":
          this.activeDialogs("regionForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Coordinación":
          this.activeDialogs("coordinationForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Transporte":
          this.activeDialogs("transportForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Tipo de Caja":
          this.activeDialogs("boxtypeForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Proveedor":
          this.activeDialogs("providerForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Variedades":
          this.activeDialogs("varietyForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
		  break;
		    case "Marcación":
          this.activeDialogs("dialingForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        case "Ciudades":
          this.activeDialogs("cityForm");
          this.$store.dispatch("doActiveDialog", {
            isEditable: true,
            activeDialog: true,
            data: item
          });
          break;
        default:
          break;
      }
    },
		  

		deleteItem(item, category) {
			switch (category) {
				case "Cuartos Fríos":
					this.$store
						.dispatch("deleteColdRoom", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Cuarto frío eliminado",
									color: "success"
								});
							}else{
                this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al elimnar cuarto frío",
									color: "error"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();
						});
					break;
				case "Aerolineas":
					this.$store
						.dispatch("deleteAirlines", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
                console.log(response)
								this.$store.dispatch("triggerSnackbar", {
									text: "Aerolinea eliminada",
									color: "success"
								});
							}else{
								this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar la aerolinea ",
									color: "error"
								});
							}
						})
						.finally(() => {
							this.closeDeleteDialog();
						});
					break;
				case "Aeropuertos":
					this.$store
						.dispatch("deleteAirport", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Aeropuerto eliminado",
									color: "success"
								});
							}else{
                this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar el aeropuerto",
									color: "success"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();
						});
					break;
				case "Bancos":
					this.$store
						.dispatch("deleteBank", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Banco eliminado",
									color: "success"
								});
							}else{
                		this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al elimiar el banco ",
									color: "success"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();
						});
					break;
				case "Cargueras":
					this.$store
						.dispatch("deleteHose", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Carguera eliminada",
									color: "success"
								});
							}else{
                this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar la carguera",
									color: "error"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();
						});
					break;
				case "Clientes":
					this.$store
						.dispatch("deleteClient", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Cliente eliminado",
									color: "success"
								});
							}else{
                	this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar cliente",
									color: "error"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();
						});
					break;
				case "DAE":
					this.$store
						.dispatch("deleteAirport", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Aeropuerto eliminado",
									color: "success"
								});
							}else{
                	this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar DAE",
									color: "success"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();
							this.$store.dispatch("doData", "Aerolineas");
						});
					break;
				case "Mercado":
					this.$store
						.dispatch("deleteMarket", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Mercado eliminado",
									color: "success"
								});
							}else{
                	this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar el mercado",
									color: "error"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();
						});
					break;
				case "Países":
					this.$store
						.dispatch("deleteCountry", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "País eliminado",
									color: "success"
								});
							}else{
							this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar el país",
									color: "error"
								});	
							}
						})
						.finally(() => {
							this.closeDeleteDialog();						
						});
					break;
				case "Regiones":
					this.$store
						.dispatch("deleteRegion", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Region eliminado",
									color: "success"
								});
							}else{
                		this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar la region",
									color: "success"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();			
						});
					break;
				case "Coordinación":
					this.$store
						.dispatch("deleteCoordination", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Coordinación Eliminada",
									color: "success"
								});
							}else{
								this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar coordinación",
									color: "error"
								});
							}
						})
						.finally(() => {
							this.closeDeleteDialog();
							this.$store.dispatch("doData", "Aerolineas");
						});
					break;
				case "Transporte":
					this.$store
						.dispatch("deleteTransport", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Transporte eliminado",
									color: "success"
								});
							}else{
								this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al elimanar el transporte",
									color: "success"
								});
							}
						})
						.finally(() => {
							this.closeDeleteDialog();
							
						});
					break;
				case "Tipo de Caja":
					this.$store
						.dispatch("deleteBoxtype", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Caja eliminado",
									color: "success"
								});
							}else{
								this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar el tipo de caja",
									color: "error"
								});
							}
						})
						.finally(() => {
							this.closeDeleteDialog();
							this.$store.dispatch("doData", "Tipo de Caja");
						});
					break;
				case "Proveedor":
					this.$store
						.dispatch("deleteProvider", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Proveedor eliminado",
									color: "success"
								});
							}else{
                	this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar el proveedor",
									color: "error"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();
							
						});
					break;
				case "Variedades":
					this.$store
						.dispatch("deleteVariety", {
							id: item._id,
							data: {
								status: 0
							}
						})
						.then((response) => {
							if (response.code == 200) {
								this.$store.dispatch("triggerSnackbar", {
									text: "Variedad eliminado",
									color: "success"
								});
							}else{
                	this.$store.dispatch("triggerSnackbar", {
									text: "Ha ocurrido un error al eliminar la variedad",
									color: "error"
								});
              }
						})
						.finally(() => {
							this.closeDeleteDialog();
							this.$store.dispatch("doData", "Variedad");
						});
					break;
		case "Marcación":
          this.$store
            .dispatch("deleteDialing", {
              id: item._id,
              data: {
                status: 0
              }
            })
            .then(response => {
              if (response.code == 200) {
                this.$store.dispatch("triggerSnackbar", {
                  text: "Marcación eliminado",
                  color: "success"
                });
              }else{
                 this.$store.dispatch("triggerSnackbar", {
                  text: "Ha ocurrido un error al eliminar la marcación ",
                  color: "error"
                });
              }
            })
            .finally(() => {
              this.closeDeleteDialog();
            });
          break;
        case "Ciudades":
          this.$store
            .dispatch("deleteCity", {
              id: item._id,
              data: {
                status: 0
              }
            })
            .then(response => {
              if (response.code == 200) {
                this.$store.dispatch("triggerSnackbar", {
                  text: "Ciudad eliminado",
                  color: "success"
                });
              }else{
                  this.$store.dispatch("triggerSnackbar", {
                  text: "Ha ocurrido un error al eliminar la ciudad ",
                  color: "error"
                });
              }
            })
            .finally(() => {
              this.closeDeleteDialog();
              this.$store.dispatch("doData", "Ciudades");
            });
			}
		},
//////////////////////
      
    /**
     * section for delete item fisrt open confirm delete dialog after change state item
     */
    openDeleteDialog(item, category) {
      switch (category) {
        case "Cuartos Fríos":
          this.activateDeleteDialog = true;
          this.itemCase = item.name;
          break;
        case "Aerolineas":
          this.activateDeleteDialog = true;
          this.itemCase = item.airline;

          break;
        case "Aeropuertos":
          this.activateDeleteDialog = true;
          this.itemCase = item.description;
          break;
        case "Bancos":
          this.activateDeleteDialog = true;
          this.itemCase = item.bank;
          break;
        case "Cargueras":
          this.activateDeleteDialog = true;
          this.itemCase = item.description;
          break;
        case "Clientes":
          this.activateDeleteDialog = true;
          this.itemCase = item.contact;
          break;
        case "DAE":
          console.log(item);
          this.activateDeleteDialog = true;
          /* 	this.itemCase=item.airline; */
          break;
        case "Mercado":
          console.log(item);
          this.activateDeleteDialog = true;
          this.itemCase = item.name;
          break;
        case "Países":
          console.log(item);
          this.activateDeleteDialog = true;
          /* this.itemCase=item.airline; */
          break;
        case "Regiones":
          console.log(item);
          this.activateDeleteDialog = true;
          this.itemCase = item.description;
          break;
        case "Coordinación":
          console.log(item);
          this.activateDeleteDialog = true;
          /* this.itemCase=item.airline; */
          break;
        case "Transporte":
          console.log(item);
          this.activateDeleteDialog = true;
          /* this.itemCase=item.airline; */
          break;
        case "Tipo de Caja":
          console.log(item);
          this.activateDeleteDialog = true;
          /* this.itemCase=item.airline; */
          break;
        case "Proveedor":
          console.log(item);
          this.activateDeleteDialog = true;
          this.itemCase = item.names;
          break;
        case "Variedades":
          console.log(item);
          this.activateDeleteDialog = true;
          this.itemCase = item.description;
          break;
        case "Marcación":
          console.log(item);
          this.activateDeleteDialog = true;
          this.itemCase = item.description;
          break;
        case "Ciudades":
          console.log(item);
          this.activateDeleteDialog = true;
          this.itemCase = item.description;
          break;
        default:
          break;
      }
    },
    
  }
};
</script>
<style scoped>
.scroll-area {
  position: relative;
  margin: auto;
  height: auto;
}
</style>
