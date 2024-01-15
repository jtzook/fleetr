<template>
  <div class="app">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { title } = useAppConfig()

onMounted(() => {
  document.title = title
})
</script>
