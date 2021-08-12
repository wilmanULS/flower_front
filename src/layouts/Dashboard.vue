<template>
	<v-app>
		<NavigationDrawer :drawer.sync="drawer" />
		<Toolbar @toggleDrawer="toggleDrawer" />
		<VuePerfectScrollbar class="scroll-area" style="margin: 4px 0px 0px 10px" :settings="settings">
		<!-- 	<v-btn color="success" @click="plantilla1('Explorer', 60, 'EXPL', 25, 'S')">PLATILLA 1</v-btn>
			<v-btn color="success" @click="plantilla2('1', '4','gf')">PLATILLA 2</v-btn>
			<v-btn color="success" @click="transform">html2canvas</v-btn> -->
			<router-view></router-view>
		</VuePerfectScrollbar>
	</v-app>
</template>
<script>
import NavigationDrawer from "../components/NavegationDrawer.vue";
import Toolbar from "../components/Toolbar.vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { async } from "q";
import barcode from "jsbarcode";

export default {
	name: "dashboard",
	components: {
		VuePerfectScrollbar,
		NavigationDrawer,
		Toolbar
	},
	data() {
		return {
			drawer: true,
			settings: {
				maxScrollbarLength: 60
			}
		};
	},
	methods: {
		toggleDrawer() {
			this.drawer = !this.drawer;
		},
		plantilla1(variedad, medida, iniciales, nTallos, tipo) {
			var doc = new jsPDF("l", "mm", "a8", true);
			var imgData = new Image();
			imgData.src = "logos/barcode.jpg";
			var canvas = document.createElement("canvas");
			barcode(canvas, `10100402${iniciales}${nTallos}${tipo}60230109`, { fontSize: 30, fontOptions: "bold" });
			canvas.toDataURL("image/png");

			doc.setFontSize(9);
			doc.setFontType("bold");
			doc.text(12, 5, `${variedad.toUpperCase()}`);
			doc.text(58, 5, "S12");
			doc.setFontSize(10);
			doc.addImage(canvas, "PNG", 12, 6.5, 52, 12);
			doc.setFontSize(12);
			doc.setFontType("bold");
			doc.text(12, 22, `${medida}x${nTallos}`);
			doc.setFontSize(9);
			doc.setFontType("bold");
			doc.text(28, 22, "E y B Roses");
			doc.setFontSize(5);
			doc.text(28, 24, "Product of Ecuador");
			window.open(doc.output("bloburl"), "_blank");
		},
		plantilla2(nActualCaja, nTotalCajas, nTipoCaja) {
			var doc = new jsPDF("p", "mm", [850, 1130], true);
			var imgSenae = new Image();
			imgSenae.src = "logos/logo-senae.png";
			var imgBarcode = new Image();
			imgBarcode.src = "logos/barcode.jpg";
			var imgData = new Image();
			imgData.src = "logos/lineas.png";
			var imgDataLV = new Image();
			imgDataLV.src = "logos/lineav.png";
			var imgDataLVm = new Image();
			imgDataLVm.src = "logos/lineavm.png";
			//section1
			var canvas = document.createElement("canvas");
			barcode(canvas, `055-2019-40-00893408`, { fontSize: 30, fontOptions: "bold" });
			canvas.toDataURL("image/png");
			doc.addImage(canvas, "PNG", 8, 4, 68, 15);
			doc.addImage(imgSenae, "PNG", 2, 10, 12, 12);
			doc.addImage(imgData, "PNG", 2, 2, 82, 2);
			doc.setFontSize(7);
			doc.text(4, 23, "País Destino:");
			doc.setFontType("bold");
			doc.text(20, 23, `` + "NEDERLAND");
			//section 2
			doc.setFontSize(7);
			doc.text(18, 28, "E.Y.B ROSES");
			doc.setFontSize(7);
			doc.setFontType("normal");
			doc.text(45, 28, "1711807998001.17010801");
			doc.setFontSize(8);
			doc.setFontType("bold");
			doc.text(5, 33, "MAWB:");
			doc.text(17, 33, `07429892903`);
			doc.text(45, 33, "HAWM:");
			doc.text(57, 33, `LA121610770`);
			//page and order number
			doc.setFontType("normal");
			doc.text(20, 38, `2784`);
			doc.setFontType("bold");
			doc.text(50, 38, `${nActualCaja}/${nTotalCajas}`);
			doc.text(78, 40, `${nTipoCaja}`);
			doc.addImage(imgData, "PNG", 2.3, 40, 82, 3);
			doc.text(25, 44.5, `PROSTOCVET`);
			doc.addImage(imgData, "PNG", 2.3, 23, 82, 2);
			doc.addImage(imgDataLV, "PNG", 2, 2, 2.5, 108);
			doc.addImage(imgDataLV, "PNG", 82.3, 2, 2.5, 108);
			doc.setFontSize(6);
			doc.setFontType("bold");
			doc.text(3, 115, `` + "ALIANZA LOGISTICA");
			doc.setFontSize(6);
			doc.setFontType("bold");
			doc.text(35, 115, `` + "TRANSINTERNAT");
			doc.setFontSize(6);
			doc.setFontType("bold");
			doc.text(55, 115, "T.STEMS");
			doc.setFontSize(6);
			doc.setFontType("bold");
			doc.text(68, 115, `` + "1000");
			doc.autoTable({
				head: [["Variedad", "Bunch", "Size", "Stems"]],
				body: [
					["Explorer", "12", "70", "300"],
					["Explorer", "12", "70", "245"],
					["Explorer", "12", "70", "265"],
					["Explorer", "12", "70", "278"],
					["Explorer", "12", "70", "212"],
					["Explorer", "12", "70", "265"],
					["Explorer", "12", "70", "278"],
					["Explorer", "12", "70", "278"],
					["Explorer", "12", "70", "278"],
					["Explorer", "12", "70", "278"],
					["Explorer", "12", "70", "278"],
					["Explorer", "12", "70", "278"],
					["Explorer", "12", "70", "212"]
				],
				margin: { top: 45.5, left: 3 },
				tableWidth: 80,
				headStyles: {
					fillColor: [255, 255, 255],
					textColor: 20,
					halign: "center",
					lineWidth: 0.5,
					lineColor: 10
				},
				columnStyles: {
					0: { halign: "left", cellPadding: 0.6 },
					1: { halign: "center", cellPadding: 0.6 },
					2: { halign: "center", cellPadding: 0.6 },
					3: { halign: "center", cellPadding: 0.6 }
				},
				styles: {
					fontSize: 8.4
				},
				tableLineWidth: 0.5,
				tableLineColor: 10
			});
			window.open(doc.output("bloburl"), "_blank");
		}
	}
};
</script>

<style lang="scss" scoped>
.vue-border {
	border-width: 1px !important;
	border-color: rgba(0, 0, 0, 0.12) !important;
	border-style: solid !important;
}
.scroll-area {
	height: 100;
}
.oculto {
	position: absolute;
	clip: rect(1px, 1px, 1px, 1px);
}
</style>
