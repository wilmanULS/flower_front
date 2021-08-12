<template>
    <v-container>
        <v-form>
            <v-row>
                <v-text-field
                	label="Nombre"
					outlined
					dense
                
                
                ></v-text-field>
            </v-row>
             <v-row>
                <v-text-field
                	label="Descripción  "
					outlined
					dense
                
                
                ></v-text-field>
            </v-row>
             <v-row>
                <v-text-field
                label="url  "
				outlined
				dense
                
                
                ></v-text-field>
            </v-row>
             <v-row>
                <v-text-field
                label="usuario  "
				outlined
				dense
                
                
                ></v-text-field>
            </v-row>
             <v-row>
                <v-text-field
                label="password  "
					outlined
					dense
                
                
                ></v-text-field>
            </v-row>
             <v-row>
                <v-text-field
                label="Contacto  "
					outlined
					dense
                
                
                ></v-text-field>
            </v-row>
             <v-row>
                <v-text-field
                label="Teléfono  "
					outlined
					dense
                
                
                ></v-text-field>
            </v-row>
             <v-row>
                <v-text-field
                label="Correo  "
					outlined
					dense
                
                
                ></v-text-field>
            </v-row>
            			<v-row  justify="end">
				<v-col cols="12" xs="6" lg="6" md="6" >
					<v-btn outlined  block dark color="#ff433a" @click="cancelDialog()"
						><span style="text-transform:Capitalize">Cancelar</span></v-btn
					>
				</v-col>
				<v-col cols="12" xs="6" lg="6" md="6" >
					<v-btn outlined  block dark color="#022D3C" 
						><span style="text-transform:Capitalize">Registrar</span></v-btn
					>
				</v-col>
			</v-row>
        </v-form>
    </v-container>
</template>
<script>
export default {
    methods:{
        cancelDialog() {
	
			this.$store.dispatch("doActiveDialog", false);
			
		}
    }
}
</script>