export default defineNuxtRouteMiddleware((to, from) => {
    console.log(to.name)
    console.log(from.name)
})