// https://nuxt.com/docs/api/configuration/nuxt-config

import type { NuxtConfig } from "nuxt/schema"

const nuxtConfig: NuxtConfig & {
  primevue: {
    ripple: boolean
    usePrimeVue: boolean
    components: {
      prefix: string
      include: string[]
    }
    cssLayerOrder: string
  }
} & {
  shadcn: {
    prefix: string
    componentDir: string
  }
} & {
  tailwindcss: {
    cssPath: string
    configPath: string
    exposeConfig: boolean
    config: {
      safelist: string[]
    }
  }

} = ({
  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  primevue: {
    ripple: true,
    usePrimeVue: true,
    components: {
      prefix: 'P',
      include: ['Button']
    },
    cssLayerOrder: 'reset,primevue'
  },
  shadcn: {
    /**
     * Prefix for all the imported components
     */
    prefix: '',
    /**
     * Directory that the components lives in.
     * @default "./components"
     */
    componentDir: './components',
  },
  tailwindcss: {
    // Adjust this path as necessary if you have a custom Tailwind config file
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    // This ensures Tailwind doesn't purge CSS from PrimeVue components
    exposeConfig: false,
    config: {
      // Add any Tailwind configuration here, for example to extend themes or add plugins
      safelist: [
        // List specific classes you want to ensure are not purged, especially those dynamically used in your components
      ],
    },
  },
  runtimeConfig: {
    private: {}, // for server
    public: { // for client
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000',
    }
  }
})

export default nuxtConfig
