<template>
  <v-container grid-list-xs>
		<v-form ref="formBoxtype" v-model="validForm" lazy-validation>
			<div v-if="dataEditable.hasOwnProperty('_id')">
				<v-row>
					<v-text-field
						label="Nombre"
						outlined
						dense
						:rules="boxRules"
						v-model="dataEditable.box"
					></v-text-field>
				</v-row>
				<v-row
					><v-text-field
						label="Tamaño"
						outlined
						dense
						:rules="sizeRules"
						v-model="dataEditable.size"
						type=""
					></v-text-field>
				</v-row>
                <v-row
					><v-text-field
						label="Tallos"
						outlined
						dense
						:rules="stemRules"
						v-model="dataEditable.stem"
						type="number"
					></v-text-field>
				</v-row>
                <v-row
					><v-text-field
						label="Peso Neto (kg)"
						outlined
						dense
						:rules="netRules"
						v-model="dataEditable.net"
						type="number"
					></v-text-field>
				</v-row>
                <v-row
					><v-text-field
						label="Peso Bruto (kg)"
						outlined
						dense
						:rules="totalRules"
						v-model="dataEditable.total"
						type="number"
					></v-text-field>
				</v-row>
			</div>
            
			<div v-else>
				<v-row>
					<v-text-field
						label="Nombre"
						outlined
						dense
						:rules="boxRules"
						v-model="boxtypeModel.box"
					></v-text-field>
				</v-row>
				<v-row
					><v-text-field
						label="Tamaño"
						outlined
						dense
						:rules="sizeRules"
						v-model="boxtypeModel.size"
						type=""
					></v-text-field>
				</v-row>
                <v-row
					><v-text-field
						label="Tallos"
						outlined
						dense
						:rules="stemRules"
						v-model="boxtypeModel.stem"
						type="number"
					></v-text-field>
				</v-row>
                <v-row
					><v-text-field
						label="Peso Neto (kg)"
						outlined
						dense
						:rules="netRules"
						v-model="boxtypeModel.net"
						type="number"
					></v-text-field>
				</v-row>
                <v-row
					><v-text-field
						label="Peso Bruto (kg)"
						outlined
						dense
						:rules="total"
						v-model="boxtypeModel.total"
						type="number"
					></v-text-field>
				</v-row>
			</div>

			<v-row justify="end">
				<v-col cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#ff433a" @click="cancelDialog()"
						><span style="text-transform:Capitalize">Cancelar</span></v-btn
					>
				</v-col>

				<v-col
					v-if="dataEditable.hasOwnProperty('_id')"
					cols="12"
					xs="6"
					lg="6"
					md="6"
				>
					<v-btn outlined block dark color="#022D3C" @click="guardarAirline"
						><span style="text-transform:Capitalize">Guardar</span></v-btn
					>
				</v-col>
				<v-col v-else cols="12" xs="6" lg="6" md="6">
					<v-btn outlined block dark color="#022D3C" @click="createBoxtype"
						><span style="text-transform:Capitalize">Registrar</span></v-btn
					>
				</v-col>
			</v-row>
		</v-form>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import axios from "axios";
import ServicesConfig from "@/constants/ServicesConfig";
export default {
  props: {
    dataEditable: Object
  },
  computed: {
    ...mapGetters(["countryList", "airlineList"])
  },
  data: () => ({
    settings: {
      maxScrollbarLength: 60
    },
    validForm: true,
    airlineRules: [v => !!v || "Aerolinea requerida"],
    codeRules: [v => !!v || "Código requerido"],
    boxtypeModel: {
      airline: "",
      guideCode: null
    }
  }),
  watch: {
    dataEditable(newVal, oldVal) {
      if (!oldVal) {
        this.boxtypeModel = newVal;
      } else {
        this.boxtypeModel = this.dataEditable;
      }
    }
  },
  methods: {
    createBoxtype() {
      if (!this.$refs.formBoxtype.validate()) {
        return;
      }
      this.$store
        .dispatch("createBoxtype", this.boxtypeModel)
        .then(response => {
          if (response.code == 200) {
            this.$store.dispatch("triggerSnackbar", {
              text: "Se ha creado correctamente",
              color: "success"
            });
          }
        })
        .finally(() => {
          this.cancelDialog();
          this.$store.dispatch("doData", "Tipo de Caja");
        });
    },
    cancelDialog() {
      //  this.$refs.formAirline.resetValidation();
      this.$store.dispatch("doActiveDialog", {
        isEditable: false,
        activeDialog: false
      });
    },
    guardarAirline() {
      if (!this.$refs.formBoxtype.validate()) {
        return;
      }
      var id = this.dataEditable["_id"];
      delete this.dataEditable["_id"];
      delete this.dataEditable["createdAt"];
      delete this.dataEditable["updatedAt"];
      this.$store
        .dispatch("updateAirline", { id: id, data: this.dataEditable })
        .then(response => {
          if (response.code == 200) {
            this.$store.dispatch("triggerSnackbar", {
              text: "Se ha actualizado correctamente",
              color: "success"
            });
          }
        })
        .finally(() => {
          this.cancelDialog();
          this.$store.dispatch("doData", this.airlineList);
        });
    }
  }
};
</script>
