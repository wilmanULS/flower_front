<template>
  <VuePerfectScrollbar class="scroll-area" :settings="settings">
    <v-container grid-list-xs>
      <v-form ref="formCiudad" v-model="validForm" lazy-validation>
        <v-row>
          <v-text-field
            label="Ciudad"
            outlined
            dense
            :rules="descriptionRules"
            v-model="ciudadModel.description"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-col lg="6">
            <v-select
              v-if="countryLoading=true"
              item-text="name"
              item-value="_id"
              :items="regionList"
              label="Seleccione la Región"
              outlined
              dense
              v-model="ciudadModel.regionId"
            ></v-select>
          </v-col>
          <v-col lg="6">
            <v-select
              item-text="description"
              :items="countryList"
              label="Seleccione el Pais"
              outlined
              dense
              :rules="paisRules"
              v-model="ciudadModel.paisId"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="12" xs="6" lg="6" md="6">
            <v-btn outlined block dark color="#ff433a" @click="cancelDialog()">
              <span style="text-transform:Capitalize">Cancelar</span>
            </v-btn>
          </v-col>
          <v-col cols="12" xs="6" lg="6" md="6">
            <v-btn outlined block dark color="#022D3C" @click="createCiudad">
              <span style="text-transform:Capitalize">Registrar</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </VuePerfectScrollbar>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";
import Vue from "vue";
import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";
export default {
  components: {
    VuePerfectScrollbar
  },
  created() {
    Vue.nextTick(() => {
      this.countryLoading = true;
      this.$store.dispatch("getRegionList").finally(() => {
        this.countryLoading = false;
        this.regnList = this.regionList;
      });
      this.$store.dispatch("getPaisList");
    });
  },
  computed: {
    ...mapGetters(["countryList", "regionList"])
  },

  data: () => ({
    countryLoading: false,
    regnList: [],
    settings: {
      maxScrollbarLength: 60
    },
    validForm: true,
    descriptionRules: [v => !!v || "Descripción requerida"],
    paisRules: [v => !!v || "País requerido"],
    regionRules: [v => !!v || "Region requerido"],
    ciudadModel: {
      paisId: "",
      regionId: "",
      description: ""
    },

    countryLoading: true,
    regionLoading: true
  }),
  watch: {
    dataEditable(newVal, oldVal) {
      if (!oldVal) {
        this.ciudadModel = newVal;
      } else {
        this.ciudadModel = this.dataEditable;
      }
    }
  },
  created() {
    this.regionLoading = false;
    this.$store.dispatch("getRegionList").finally(() => {
      this.regionLoading = true;
    });
    this.countryLoading;
    this.$store.dispatch("getCountryList").finally(() => {
      this.countryLoading = true;
    });
  },
  methods: {
    createCiudad() {
      console.log("mensjae", this.regionList);
      if (!this.$refs.formCiudad.validate()) {
        return;
      }
      this.$store.dispatch("createCity", this.ciudadModel).then(response => {
        if (response.code == 200) {
          this.$store.dispatch("triggerSnackbar", {
            text: "Se ha creado correctamente",
            color: "success"
          });
        }
      });
    },
    cancelDialog() {
      //	this.$refs.formAirline.resetValidation();
      this.$store.dispatch("doActiveDialog", {
        isEditable: false,
        activeDialog: false
      });
    },
    reloadSelect() {}
  },
  mounted() {}
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