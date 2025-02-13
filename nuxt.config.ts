// https://nuxt.com/docs/api/configuration/nuxt-config
import {getModuleRoutes} from "./src/register-modules";
import type {NuxtPage} from "@nuxt/schema";

const moduleRoutes: NuxtPage[] = getModuleRoutes();


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  pages: true,
  devtools: { enabled: true },
  modules: ['nuxt-oidc-auth', '@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/color-mode', '@vueuse/nuxt'],
  hooks: {
    'pages:extend' (pages) {
      pages.push(...moduleRoutes);
    }
  },
  oidc: {
    defaultProvider: "auth0",
    providers: {
      auth0: {
        audience: 'https://creatormate.eu.auth0.com/api/v2/',
        redirectUri: process.env.NUXT_OIDC_PROVIDERS_AUTH0_REDIRECT_URI,
        baseUrl: process.env.NUXT_OIDC_PROVIDERS_AUTH0_BASE_URL,
        clientId: process.env.NUXT_OIDC_PROVIDERS_AUTH0_CLIENT_ID,
        clientSecret: process.env.NUXT_OIDC_PROVIDERS_AUTH0_CLIENT_SECRET,
        scope: ['openid', 'offline_access', 'profile', 'email'],
        additionalTokenParameters: { // In case you need access to an API registered in Auth0
          audience: 'https://creatormate.eu.auth0.com/api/v2/',
        },
        additionalAuthParameters: { // In case you need access to an API registered in Auth0
          audience: 'https://creatormate.eu.auth0.com/api/v2/',
        },
        exposeIdToken: true,
        exposeAccessToken: true,
      },
    },
    middleware: {
      globalMiddlewareEnabled: false,
    },
  },
  colorMode: {
    classSuffix: ''
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: 'creatormate portal',
      script: [
        {
          async: false,
          src: "https://cdn.getphyllo.com/connect/v2/phyllo-connect.js"
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap'
        },
      ]
    }
  },
  runtimeConfig: {
    pages: [],
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_KEY: process.env.STRIPE_WEBHOOK_KEY,
    NUXT_SUPABASE_SECRET: process.env.NUXT_SUPABASE_SECRET,
    SUPABASE_AUTH_URL: process.env.SUPABASE_AUTH_URL,
    SUPABASE_AUTH_KEY: process.env.SUPABASE_AUTH_KEY,
    PHYLLO_KEY: process.env.PHYLLO_KEY,
    mailerUser: '',
    mailerPass: '',
    mailerHost: '',
    mailerPort: '',
    public: {
      BASE_URL: process.env.BASE_URL,
      META_CLIENT_ID: process.env.META_CLIENT_ID,
      META_REDIRECT_URL: process.env.META_REDIRECT_URL,
      META_CONFIG_ID: process.env.META_CONFIG_ID,
    },
  },
  image: {
    domains: ['https://mfouoyeneddsfujxfjci.supabase.co', 'https://s.gravatar.com', 'https://lh3.googleusercontent.com'],
  },
  dir: {
    assets: './src/assets',
    layouts: './src/layouts',
    plugins: './src/plugins',
    middleware: './src/middleware',
    pages: './src/pages',
  },
  components: {
    dirs: [
      {
        path: './src/components',
        global: true
      }
    ],
  },
  serverHandlers: [
    {
      route: '/API', handler: './src/api/hono.ts', middleware: true
    }
  ]
});