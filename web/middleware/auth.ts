export default defineNuxtRouteMiddleware((to, from) => {
  // TODO
  // isAuthenticated() is an example method verifying if a user is authenticated
  // if (isAuthenticated() === false) {
  //   return navigateTo('/login')
  // }
  return navigateTo('/')
})
