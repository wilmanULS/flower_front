<template>
  <v-container>
    <div>
      <v-row align="center" justify="center">
        <v-col>
          <h3>Código de Barra</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Código de Barra" dense outlined></v-text-field>
        </v-col>
      </v-row>
    </div>
    <v-container grid-list-xs>
      <v-row align="center" justify="center">
        <v-col cols="12" >
          <head-register></head-register>
          <form-register></form-register>
        </v-col>
        <v-col xl="8" lg="8" md="8" style="border:solid 1px gray">
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
            <v-data-table :headers="headers" :items="desserts" :search="search">
              <template v-slot:item.action="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">mdi-plus-box</v-icon>
                  </template>
                  <span>Agregar Producción</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">mdi-minus-box</v-icon>
                  </template>
                  <span>Anular Producción</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">mdi-arrow-down-bold-circle</v-icon>
                  </template>
                  <span>Degrade</span>
                </v-tooltip>
              </template>
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
  </v-container>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
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
        { text: "Calidad", value: "calories" },
        { text: "Variedad", value: "fat" },
        { text: "Proveedor", value: "carbs" },
        { text: "Longitud", value: "carbs" },
        { text: "Total Bounche", value: "protein" },
        { text: "Acciones", value: "action", sortable: false }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ],

      settings: {
        maxScrollbarLength: 60
      }
    };
  }
};
</script>