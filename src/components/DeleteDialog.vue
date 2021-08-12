<template>
  <div class="text-center">
    <v-dialog
      persistent
      v-model="model"
      width="500"
    >
     
      <v-card>
      <v-toolbar flat dark color="#022D3C">
					<v-toolbar-title>Eliminar {{titleDeleteDialog}}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark @click="$emit('onClose')">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>

        <v-card-text class="pt-3 pl-4">
         <h4>¿Esta seguro de eliminar {{itemDelete}}?</h4>
        </v-card-text>
        <v-card-actions>
        	
			<v-spacer></v-spacer>	
					<v-btn outlined  dark color="#ff433a" @click="$emit('onConfirm')"
						><span style="text-transform:Capitalize">Si</span></v-btn
					>
					<v-btn outlined  dark color="#022D3C" @click="$emit('onClose')"
						><span style="text-transform:Capitalize">No</span></v-btn
					>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
    	props: {
        itemDelete:String,
        model: Boolean,	
        titleDeleteDialog:String	
	},
}
</script>