<template>
  <div class="app">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

console.log(appConfig.theme)

onMounted(() => {
  if (appConfig.title) {
    document.title = appConfig.title
  }
})
</script>
