import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import colors from 'vuetify/lib/util/colors'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: colors.red.darken1, // #E53935
              secondary: colors.red.lighten4, // #FFCDD2
              indigo: '#3F51B5',
              lime: '#4CAF50'
            }
          },
        },
      },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        }
      },
  })

createApp(App)
    .use(vuetify)
    .use( store ).mount('#app')
