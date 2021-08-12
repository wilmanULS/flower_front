<template>
  <v-container>
    <v-form ref="formDialing" v-model="validForm" lazy-validation>
      <div>
        <v-row>
          <v-text-field label="Nombre" dense outlined></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Descipción" dense outlined></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Dirección" dense outlined></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Teléfono" dense outlined></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Correo" dense outlined></v-text-field>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              :items="countryList"
              outlined
              item-text="description"
              item-value="_id"
              dense
              label="Pais"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select label="Ciudad Destino" dense outlined></v-select>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="12" xs="6" lg="6" md="6">
            <v-btn outlined block dark color="#ff433a" @click="cancelDialog()">
              <span style="text-transform:Capitalize">Cancelar</span>
            </v-btn>
          </v-col>
          <v-col cols="12" xs="6" lg="6" md="6">
            <v-btn outlined block dark color="#022D3C">
              <span style="text-transform:Capitalize">Registrar</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";
export default {
  computed: {
    ...mapGetters(["countryList"])
  },
  data: () => ({
    validForm: true,
    codeRules: [v => !!v || "Código requerido"],
    countryRules: [v => !!v || "País requerido"],
    descriptionRules: [v => !!v || "Descrpición requerida"],
    daeModel: {
      code: "",
      description: "",
      paisId: ""
    }
  }),
  created() {
    this.$store.dispatch("getCountryList");
  },
  methods: {
      		createDialing() {
			if (!this.$refs.formAirline.validate()) {
				return;
			}
			this.$store
				.dispatch("createDialing", this.airlineModel)
				.then((response) => {
					if (response.code == 200) {
						this.$store.dispatch("triggerSnackbar", {
							text: "Se ha creado correctamente",
							color: "success"
						});
					}
				})
				.finally(() => {
					this.cancelDialog();
					this.$store.dispatch("doData", "createDialing");
				});
		},
    cancelDialog() {
      //	this.$refs.formAirline.resetValidation();
      this.$store.dispatch("doActiveDialog", {
        isEditable: false,
        activeDialog: false
      });
    }
  }
};
</script>