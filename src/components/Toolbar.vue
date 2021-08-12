<template>
  <v-app-bar app color="#022D3C" dark flat fixed clipped-left>
    <v-app-bar-nav-icon
      @click="
        () => {
          this.$emit('toggleDrawer');
        }
      "
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase">E&B roses</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-container grid-list-xs>
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <v-menu open-on-hover>
              <template v-slot:activator="{ on }">
                <v-btn @mouseover="on" v-on="on" text>
                  <v-icon small>mdi-pencil</v-icon>
                  <span class="tolbarMenuTop">parámetros ventas</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <div style="padding-top:20%">
                <v-list dense >
                  <VuePerfectScrollbar class="scroll-area" :settings="settings">
                    <v-list-item
					
					
					class="backgroundItem pa-0 pl-2 pr-0 ma-0 mr-0"
                      v-for="(item, index) in itemsVentas"
                      :key="index"
                      @click="openNewDialog(item.title)"
                    >
                      <v-list-item-title style="line-height: 2rem !important;" class="colorTextItem ">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </VuePerfectScrollbar>
                </v-list>
              </div>
            </v-menu>
          </v-col>
          <v-col cols="12" md="5">
            <v-menu open-on-hover>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" text>
                  <v-icon small>mdi-flower</v-icon>
                  <span class="tolbarMenuTop">parámetros postcosechas</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <div style="padding-top:16%">
                <v-list dense>
                  <v-list-item
				  class="backgroundItem pa-0 pl-2 pr-0 ma-0 mr-0"
                    v-for="(item, index) in itemsPostcosechas"
                    :key="index"
                    @click="openNewDialog(item.title)"
                  >
                    <v-list-item-title style="line-height: 2rem !important;" class="colorTextItem ">{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
          <v-col align="right" cols="12" md="2">
            <v-menu open-on-hover>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" text>
                  <v-icon small>mdi-account</v-icon>
                  <span class="tolbarMenuTop">Usuario</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <div style="padding-top:30%">
                <v-list dense>
                  <v-list-item
				  class="backgroundItem pa-0 pl-2 pr-0 ma-0 mr-0"
                    v-for="(item, index) in itemUsuario"
                    :key="index"
                    @click="openNewDialog(item.title)"
                  >
                    <v-list-item-title style="line-height: 2rem !important;" class="colorTextItem " @click="doActionUser(item.action)">{{
                      item.title
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-md-and-up">
		<v-menu :close-on-content-click="false" >
		<v-spacer></v-spacer>
		<template v-slot:activator="{on}">
			
			<v-btn v-on="on" text>
            <v-icon>mdi-settings</v-icon><v-icon left>mdi-menu-down</v-icon>
          </v-btn>	
			
		</template>
          
    <div  style="padding-top:15%">
<v-card  class="mx-auto" width="280">
			 <v-list dense>
              <v-list-group prepend-icon="mdi-pencil">
                  <template v-slot:activator>
                      <v-list-item-title>Parametros ventas</v-list-item-title>
                   </template>
                      <VuePerfectScrollbar class="scroll-area" :settings="settings">
                    <v-list-item
                      v-for="(item, index) in itemsVentas"
                      :key="index"
                      @click="openNewDialog(item.title)"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </VuePerfectScrollbar>
              </v-list-group>

              <v-list-group prepend-icon="mdi-flower" value="true">
                <template v-slot:activator>
                  <v-list-item-title>parámetros postcosechas</v-list-item-title>
                </template>

                <v-list-item
                    v-for="(item, index) in itemsPostcosechas"
                    :key="index"
                    @click="openNewDialog(item.title)"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list-group>

                <v-list-item @click="doActionUser('logout')">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title >Cerrar sesión</v-list-item-title>
      </v-list-item>
             
            </v-list> 
		</v-card>
 
	</div>
		
		</v-menu>
      
           
    
    </v-toolbar-items>
    <pdialog
      v-if="render == true"
      hidden
      :model="openDialog"
      @onClose="closeDialog()"
    ></pdialog>
  </v-app-bar>
</template>

<script>
import Vue from "vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import PopupDialog from "./PopupDialog";
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["categoryKey", "airlineList", "isActiveDialog", "dataTable"])
	},
	created() {},
	data() {
		return {
      showSubmenu:false,
			render: false,
			getObjectPath: Vue.getObjectPath,
			settings: {
				maxScrollbarLength: 60
			},
			openDialog: false,
			keyDialog: "",
			itemUsuario: [{ title: "Cerrar Sesion", action: "logout" }],
			itemsPostcosechas: [
				/* { title: "Calidad" }, */
		/* 		{ title: "Categorías" }, */
				{ title: "Proveedor" },
			/* 	{ title: "Unidades" }, */
				{ title: "Variedades" }
			],
			itemsVentas: [
				{ title: "Aerolineas" },
				{ title: "Aeropuertos" },
				{ title: "Bancos" },
				{ title: "Cargueras" },
				{ title: "Clientes" },
				{ title: "Cuartos Fríos" },
				{ title: "DAE" },
				{ title: "Distritos" },
				{ title: "Mercado" },
				{ title: "Países" },
				{ title: "Marcación" },
				{ title: "Regiones" },
				{ title: "Tipo de Caja" },
				{ title: "Transporte" },
				{title: "Coordinación" },
				{title: "Ciudades"}
			]
		};
	},
	components: {
		pdialog: PopupDialog,
		VuePerfectScrollbar
	},
	methods: {
     toggleShow() {
			this.showSubmenu = !this.showSubmenu;
		},
		doActionUser(action) {
			switch (action) {
				case "logout":
					this.$store.dispatch("doLogout");
					this.$router.push("/");
					break;
			}
		},
		openNewDialog(key) {
			this.$store.dispatch("doDataDialog", {
				categoryKey: key
			});
			this.initialize(key);
		},
		closeDialog() {
			this.$store.dispatch("doCleanData");
			this.openDialog = false;
		},
		initialize(cate) {
			switch (cate) {
				case "Aerolineas":
					this.$store.dispatch("doData", cate).finally(() => {
						this.render = true;
						this.openDialog = true;
					});
					break;
				case "Aeropuertos":
					this.$store.dispatch("doData", cate).finally(() => {
						this.render = true;
						this.openDialog = true;
					});
					break;
				case "Bancos":
					this.$store.dispatch("doData", cate).finally(() => {
						this.render = true;
						this.openDialog = true;
					});
					break;
				case "Cargueras":
					this.$store.dispatch("doData", cate).finally(() => {
						this.render = true;
						this.openDialog = true;
					});
					break;
				case "Clientes":
					this.$store.dispatch("doData", cate).finally(() => {
						this.render = true;
						this.openDialog = true;
					});
					break;
				case "Cuartos Fríos":
					this.$store.dispatch("doData", cate).finally(() => {
						this.render = true;
						this.openDialog = true;
					});
					break;
				case "DAE":
					this.$store.dispatch("doData", cate).finally(() => {
						this.render = true;
						this.openDialog = true;
					});
					break;
				case "Mercado":
					this.$store.dispatch("doData", cate).finally(() => {
						this.render = true;
						this.openDialog = true;
					});
					break;
				case "Países":
					this.$store.dispatch("doData", cate).finally(()=>{
						this.render=true;
						this.openDialog=true;
					});
					break;
				case "Regiones":
					this.$store.dispatch("doData",cate).finally(()=>{
					this.render=true;
					this.openDialog=true;
					});
					break;
				case "Coordinación":
					this.$store.dispatch("doData",cate).finally(()=>{
					this.render=true;
					this.openDialog=true;
					});
					break;
				case "Transporte":
					this.$store.dispatch("doData",cate).finally(()=>{
					this.render=true;
					this.openDialog=true;
					});
					break;
				case "Tipo de Caja":
					this.$store.dispatch("doData",cate).finally(()=>{
					this.render=true;
					this.openDialog=true;
					});
					break;
				case "Proveedor":
					this.$store.dispatch("doData",cate).finally(()=>{
					this.render=true;
					this.openDialog=true;
					});
					break;
				case "Variedades":
					this.$store.dispatch("doData",cate).finally(()=>{
					this.render=true;
					this.openDialog=true;
					});
					break;
				case "Marcación":
					this.$store.dispatch("doData",cate).finally(()=>{
					this.render=true;
					this.openDialog=true;
					});
					break;
				case "Ciudades":
					this.$store.dispatch("doData",cate).finally(()=>{
					this.render=true;
					this.openDialog=true;
					});
					break;
			}
		}
	}
};
</script>
<style scoped>
.backgroundItem:hover {
	background-color: #022D3C  !important;	
	
}
.colorTextItem:hover{
	color: white;
}
.tolbarSpace {
  padding-left: 7%;
}
.tolbarMenuTop {
  text-transform: capitalize;
  font-size: 12px !important;
}
.scroll-area {
  position: relative;
  margin: auto;
  height: 200px;
}
</style>
