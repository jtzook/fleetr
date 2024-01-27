<template>
  <Head>
    <Title>fleets</Title>
  </Head>

  <main class="app" :style="appStyles">
    <!-- <NuxtLoadingIndicator /> -->
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
const {
  theme: {
    colors: { background: backgroundColor, textPrimary: color },
  },
} = useAppConfig()

const appStyles = {
  backgroundColor,
  color,
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 250ms ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
```
