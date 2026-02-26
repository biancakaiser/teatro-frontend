import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import PersonRecord from '@/pages/PersonRecord'
import CompanyRecord from '@/pages/CompanyRecord'
import PlayRecord from '@/pages/PlayRecord'
import TheaterRecord from '@/pages/TheaterRecord'
import PersonSearch from '@/pages/PersonSearch'
import PageView from '@/pages/PageView'
import PresentationSearch from '@/pages/PresentationSearch'
import About from '@/pages/About'
import AboutUs from '@/pages/AboutUs'
import Methodology from '@/pages/Methodology'
import VueTheMask from 'vue-the-mask'

const VueScrollTo = require('vue-scrollto')
Vue.use(VueTheMask)
Vue.use(VueScrollTo)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/pessoa/:personId',
      component: PersonRecord
    },
    {
      path: '/companhia/:companyId',
      component: CompanyRecord
    },
    {
      path: '/peca/:playId',
      component: PlayRecord
    },
    {
      path: '/teatro/:theaterId',
      component: TheaterRecord
    },
    {
      path: '/projeto',
      component: About
    },
    {
      path: '/metodologia',
      component: Methodology
    },
    {
      path: '/quem-somos',
      component: AboutUs
    },
    {
      path: '/pesquisar-pessoas',
      component: PersonSearch
    },
    {
      path: '/pesquisar-espetaculos',
      component: PresentationSearch
    },
    {
      path: '/pagina/:pagina',
      component: PageView
    }
  ]
})
