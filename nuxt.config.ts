// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss',"@nuxtjs/sanity" ,"@pinia/nuxt", ],
    sanity: {
        projectId: "oeaj94ez",
        apiVersion: '2022-03-25'
      },
      alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
      },
      
})
