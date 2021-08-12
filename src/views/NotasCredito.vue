<template>
  <v-container>
    <h2>NOTAS DE CRÉDITO</h2>
    <v-divider></v-divider>
    <br />
    <br />
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="6">
        <v-select dense outlined attach label="Cliente"></v-select>
      </v-col>

      <v-col>
        <v-btn color="success" dark>
          Exportar
          <v-icon right dark>mdi-file-export</v-icon>
        </v-btn>
      </v-col>
    </v-row>
<v-dialog  v-model="dialog"
      fullscreen
     
      hide-overlay
      transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn color="#022D3C" dark v-on="on">Agregar Notas de Crédito</v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="#022D3C">
          <v-toolbar-title>Nota de crédito</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title class="pl-5">
          <span>Ingresar nota de crédito</span>
        </v-card-title>
          <v-card-text class="pb-0">
            <v-container grid-list-md class="pr-0 pl-0 pb-0">
              <v-row>
                <v-col class="pb-0" cols="12" sm="12" xs="12" md="6" lg="6" xl="6">
                  <v-select dense outlined label="Cliente"></v-select>
                </v-col>

                <v-col class="pb-0" cols="12" sm="12" xs="12" md="6" lg="6" xl="6">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        outlined
                        dense
                        v-model="date"
                        label="Fecha"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col class="pt-0" cols="12" sm="12" xs="12" md="6" lg="6" xl="6">
                  <v-textarea dense outlined name="input-7-4" label="Motivo"></v-textarea>
                </v-col>
                  <v-col class="pt-0" cols="12" sm="12" xs="12" md="6" lg="6" xl="6">
                  <v-text-field label="Valor" dense outlined></v-text-field>
                   <v-select dense outlined label="Factura"></v-select>
                </v-col>
  
              </v-row>
             
            </v-container>
          </v-card-text >
          <v-card-actions  v-bind:class="{'pt-0 pr-5':$vuetify.breakpoint.mdAndUp}">
           <v-row align="end" justify="end" v-bind:class="{'paddingButton':$vuetify.breakpoint.mdAndUp}">
              <v-col cols="12"  xs="12" sm="12" lg="2" md="2">
                <v-btn outlined block dark color="#ff433a" @click="cancelDialog()">
                  <span style="text-transform:Capitalize">Cancelar</span>
                </v-btn>
              </v-col>
              <v-col cols="12"  xs="12" sm="12" lg="2" md="2">
                <v-btn outlined block dark color="#022D3C" @click="createAirline">
                  <span style="text-transform:Capitalize">Registrar</span>
                </v-btn>
              </v-col>
           </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!--////fin dialogo-->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      search: "",
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          filterable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
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
<style>
.paddingButton{
  padding-right: 3%;

}
  
</style>