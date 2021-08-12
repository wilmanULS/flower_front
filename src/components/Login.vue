<template>
  <v-container fluid class="pt-5">
    <v-row align="center" justify="center" class="pb-5">
      <v-img src="logos/logo1.png" max-width="300" max-height="300"></v-img>
    </v-row>
    <v-form onSubmit="return false;" ref="signin" lazy-validation>
      <v-row justify="center" align="center">
        <v-col xs="12" md="4" sm="6">
          <v-card outlined tile class="roundCards">
            <v-row justify="center" class="pl-3 pr-5">
              <v-col lg="10" class="pb-0">
                <v-text-field
                  :rules="loginEmailRules"
                  autocomplete="off"
                  color="#424242"
                  prepend-inner-icon="mdi-account"
                  single-line
                  outlined
                  v-model="loginEmail"
                  type="email"
                  label="correo electrónico"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" class="pl-3 pr-5 pt-0">
              <v-col lg="10" class="pt-0">
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  hide-details
                  color="#424242"
                  prepend-inner-icon="mdi-lock"
                  single-line
                  outlined
                  :type="show ? 'text' : 'password'"
                  v-model="loginPassword"
                  @click:append="show = !show"
                  label="Contraseña"
                  @keyup.enter.native="executeLogin()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col class="text-center" cols="6" md="2" xs="12" sm="6">
          <v-btn @click="executeLogin()" block color="#1B6A00">
            <span class="textColor">Ingresar</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import router from "../router";
import Vue from "vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      show: false
    };
  },
  computed: {
    ...mapGetters(["isLogged", "getSnackbarData"]),
    snackbar: {
      get() {
        return this.$store.getters.getSnackbarData;
      }
    }
  },
  methods: {
    executeLogin() {
      if (!this.$refs.signin.validate()) {
        return;
      }

      this.$store
        .dispatch("doUserAuthentication", {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(data => {
          if (data.code == 200) {
            this.$router.push("dashboard");
          } else if (data.code == 400) {
            this.$store.dispatch("triggerSnackbar", {
              text: "Contraseña o usuario incorrecta",
              color:"#FEB626"
            });
            return;
          }
        });
    },
    redirectLogin() {
      alert("holaaaaa");
    }
  },
  created() {
    this.loginEmailRules = [
      v => !!v || "Ingrese un correo valido",
      v =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "correo incorrecto "
    ];
    /* 	this.loginPasswordRules = [
			v => !!v || "* " + this.$t("message.passwordRequired")
		]; */
  },
  beforeMount() {
    this.$store.commit("mCheckLogged");
    if (this.isLogged) {
      this.$router.push("/dashboard");
    } else {
      return;
    }
  }
};
</script>
<style scoped>
.textColor {
  color: #fff !important;
}
.roundCards {
  border-radius: 7px 7px 7px 7px;
  padding-top: 25px;
  padding-bottom: 25px;
}
</style>