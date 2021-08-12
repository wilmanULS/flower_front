<template>
  <v-container grid-list-xs>
    <v-form ref="formPais" v-model="validForm" lazy-validation>
      <div v-if="dataEditable.hasOwnProperty('_id')">
        <v-row>
          <v-text-field
            label="Descripción"
            outlined
            dense
            :rules="descripcionRules"
            v-model="dataEditable.description"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Codigo"
              outlined
              dense
              :rules="codeRules"
              type="number"
              v-model="dataEditable.code"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Código de Región"
              outlined
              dense
              :rules="regionCodeRules"
              v-model="dataEditable.regionCode"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-row>
          <v-text-field
            label="Descripción"
            outlined
            dense
            :rules="descripcionRules"
            v-model="paisModel.description"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Codigo"
              outlined
              dense
              :rules="codeRules"
              type="number"
              v-model="paisModel.code"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Código de Región"
              outlined
              dense
              :rules="regionCodeRules"
              v-model="paisModel.regionCode"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <v-row justify="end">
        <v-col cols="12" xs="6" lg="6" md="6">
          <v-btn outlined block dark color="#ff433a" @click="cancelDialog()">
            <span style="text-transform:Capitalize">Cancelar</span>
          </v-btn>
        </v-col>

        <v-col v-if="dataEditable.hasOwnProperty('_id')" cols="12" xs="6" lg="6" md="6">
          <v-btn outlined block dark color="#022D3C" @click="guardarPais">
            <span style="text-transform:Capitalize">Guardar</span>
          </v-btn>
        </v-col>

        <v-col v-else cols="12" xs="6" lg="6" md="6">
          <v-btn outlined block dark color="#022D3C" @click="createPais">
            <span style="text-transform:Capitalize">Registrar</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  props: {
    dataEditable: Object
  },
  components: {},
  data: () => ({
    validForm: true,
    paisModel: {
      description: "",
      code: 0,
      regionCode: 0
    },
    descripcionRules: [v => !!v || "Descripción requerida"],
    codeRules: [v => !!v || "Código requerido"],
    regionCodeRules: [v => !!v || "Código Region requerido"]
  }),
  watch: {
    dataEditable(newVal, oldVal) {
      if (!oldVal) {
        this.paisModel = newVal;
      } else {
        this.paisModel = this.dataEditable;
      }
    }
  },
  methods: {
    cancelDialog() {
      this.$store.dispatch("doActiveDialog", false);
    },
    createPais() {
      if (!this.$refs.formPais.validate()) {
        return;
      }
      this.$store
        .dispatch("createCountry", this.paisModel)
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
          this.$store.dispatch("doData", "Países");
        });
    },
  	guardarPais() {
			if (!this.$refs.formPais.validate()) {
				return;
			}
			var id = this.dataEditable["_id"];
			delete this.dataEditable["_id"];
			delete this.dataEditable["createdAt"];
			delete this.dataEditable["updatedAt"];
			this.$store
				.dispatch("updateCountry", { id: id, data: this.dataEditable })
				.then((response) => {
					if (response.code == 200) {
						this.$store.dispatch("triggerSnackbar", {
							text: "Se ha actualizado correctamente",
							color: "success"
						});
					}
				})
				.finally(() => {
					this.cancelDialog();
				
				});
		}
  }
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