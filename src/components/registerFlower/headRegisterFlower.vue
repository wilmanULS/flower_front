<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12" lg="12" md="12">
        <v-card flat color="transparent">
          <v-row>
            <v-col cols="6" md="6" class="pb-0">
              <strong class="textDay">Lunes</strong>
            </v-col>
            <v-col cols="12" md="12" class="pt-0 pb-0">
              <v-radio-group  v-model="radios" row :mandatory="false">
                <v-radio color="#022D3C" label="Guardar" value="1"></v-radio>
                <v-radio color="#022D3C" label="Imprimir" value="2"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="12" class="pt-0">
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
                    hide-details
                    v-model="dateFormatted"
                    dense
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>
<script>
export default {
  data: vm => ({
    radios: "",
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>
<style scoped>
.textDay {
  text-transform: uppercase;
  font-size: 24px;
  color: black;
}</style
>>
