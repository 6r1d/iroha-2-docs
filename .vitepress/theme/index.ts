/// <reference types="vite/client" />

import ThemeDefault from 'vitepress/theme'
import LayoutCustom from './components/LayoutCustom.vue'
import { createGtm } from '@gtm-support/vue-gtm'

import 'virtual:windi.css'
import './style/index.scss'

export default {
  ...ThemeDefault,
  Layout: LayoutCustom,
  enhanceApp({ app, router }) {
    app.use(
      createGtm({
        id: 'GTM-7XJ4SJS4KG',
        defer: false,
        compatibility: false,
        enabled: true,
        debug: true,
        loadScript: true,
        vueRouter: router,
        ignoredViews: ['homepage'],
        trackOnNextTick: false,
      }),
    )
  },
}
