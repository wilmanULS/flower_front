<template>
  <v-navigation-drawer :value="drawer" app clipped>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-item avatar>
          <v-list-item-avatar>
            <v-icon color="blue">mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jorge Villavicencio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0">
      <v-divider></v-divider>

      <template v-for="(group, i) in groups">
        <h3 :key="i" class="title text-uppercase pl-3 pt-3 pb-1">{{ group.name }}</h3>
        <v-divider :key="i"></v-divider>

        <v-list-group v-for="(item, j) in group.elements" :key="`${j}`" :prepend-icon="item.icon">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="(tile, k) in item.tiles" :key="`${k}`" :to=" {name:tile.url }">
            <v-list-item-title v-text="tile.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "navigation-drawer",
  props: ["drawer"],
  data() {
    return {
      groups: [
        {
          name: "Ventas",
          elements: [
            {
              name: "Cartera",
              icon: "mdi-briefcase",
              tiles: [
                {
                  name: "Estado de cuenta generales",
                  url: ""
                },
                {
                  name: "Estado de cuenta por factura ",
                  url: ""
                },
                {
                  name: "Estado de cuenta con destinatarios",
                  url: ""
                },
                {
                  name: "Notas de crédito",
                  url: "notasCredito"
                },
                {
                  
                  name: "Pagos",
                  url: "pagos"
                },
                {
                  name: "Saldos iniciales",
                  url: ""
                }
              ]
            },
            {
              name: "Facturación",
              icon: "mdi-library-books",
              tiles: [
                {
                  name: "Facturación electrónica",
                  url: ""
                },
                {
                  name: "Facturación exportación",
                  url: ""
                },
                {
                  name: "Facturación local",
                  url: ""
                },
                {
                  name: "Facturación SRI",
                  url: ""
                }
              ]
            },
            {
              name: "Ventas Exportación",
              icon: "mdi-shopping"
            },
            {
              name: "Reportes",
              icon: "mdi-file-document"
            }
          ]
        },
        {
          name: "Postcosecha",
          elements: [
            {
              name: "Flor Exportación",
              icon: "mdi-flower",
              tiles: [
                {
                  name: "Ingreso Manual",
                  url: "registroFlower"
                },
                {
                  name: "Ingreso Código Barras",  
                  url: "registerBarCodeForm"
                }
              ]
            },
            {
              name: "Inventario",
              icon: "mdi-checkbox-marked",
              tiles: [
                {
                  name: "Aperturar",
                  url: ""
                }
              ]
            },
            {
              name: "Reportes",
              icon: "mdi-file-document",
              tiles: [
                {
                  name: "Aperturar",
                  url: ""
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>