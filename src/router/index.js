import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../layouts/Dashboard.vue'
import Login from "../components/Login";
import store from "../store/index"
import HoseForm from "../components/catalogos/HoseForm";
import CityForm from "../components/catalogos/CityForm";
import ClientForm from "../components/catalogos/ClientForm";
import ColdRoomForm from "../components/catalogos/ColdRoomForm";
import MarketForm from "../components/catalogos/MarketForm";
import CountryForm from "../components/catalogos/CountryForm";
import ProviderForm from "../components/catalogos/ProviderForm";
import RegionForm from "../components/catalogos/RegionForm";
import Page404 from "../views/Page404";
import RegisterNewFlower from "../views/registerNewFlower";
import Pagos from "../views/Pagos";
import NotasCredito from "../views/NotasCredito";
import RegisterBarCodeForm from "../components/registerFlower/RegisterBarCodeForm";

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    children: [ 
     {
        path: 'registroFlower',
        name: 'registroFlower',
        component: RegisterNewFlower
      },
      {
        path:'pagos',
        name :'pagos',
        component:Pagos
      },
      {
        path:'notasCredito',
        name:"notasCredito",
        component:NotasCredito
      },
      {
        path:'registerBarCodeForm',
        name:'registerBarCodeForm',
        component:RegisterBarCodeForm
      },

      /*  
       
        {
          path: '/busqueda/:cedula',
          name: 'busqueda',
          component: () => import('./views/Busqueda.vue'),
        },
        {
          path: '/aperturar/empresa',
          name: 'aperturar-empresa',
          component: () => import('./views/AperturarEmpresa.vue'),
        },
        {
          path: '/administrar/certificados',
          name: 'administrar-certificados',
          component: () => import('./views/AdministrarCertificados.vue'),
        },
        {
          path: '/procesar/certificados',
          name: 'procesar-certificados',
          component: () => import('./views/ProcesarCertificados.vue'),
        },
        {
          path: '/administrar/productos',
          name: 'administrar-productos',
          component: () => import('./views/AdministrarProductos.vue'),
        }, */
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/carguera',
    component: HoseForm,
  },
  {
    path: '/cliente',
    component: ClientForm,
  },
  {
    path: '/mercado',
    component: MarketForm,
  },
  {
    path: '/ciudad',
    component: CityForm,
  },
  {
    path: '/region',
    component: RegionForm,
  },
  {
    path: '/cuartofrio',
    component: ColdRoomForm,
  },
  {
    path: '/pais',
    component: CountryForm,
  },
  {
    path: '/proveedor',
    component: ProviderForm,
  },
  {
    path: '/',
    component: Login,
  },
  {
    path: '*',
    component: Page404,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    if (store.getters.isLogged) {
      router.push('/dashboard')
    } else {
      next()
    }
  }
  if (to.matched.some(route => route.meta.requiresAuth)) {

    if (store.getters.isLogged) {
      next()
    } else {
      next("/")
    }
  } else {
    next()
  }
})
export default router
