// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],
  devtools: { enabled: true },
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
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
})
