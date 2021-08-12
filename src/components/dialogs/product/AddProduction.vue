<template>
	<v-dialog v-model="dialogActive" persistent max-width="290">
		<v-card>
			<v-card-title class="headline"> Agregar a Produccion</v-card-title>
			<v-card-text>
				<v-form>
					<v-row>
						<v-col>
							<v-text-field name="name" label="label" id="id"></v-text-field>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="$emit('onClose')">Cancelar</v-btn>
				<v-btn color="green darken-1" text @click="$emit('onConfirm')">Agregar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		dialogActive: Boolean
	},
	data: () => ({
		dialog: false
	})
};
</script>

<style scoped></style>
