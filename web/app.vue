<template>
  <Head>
    <Title>fleets</Title>
  </Head>

  <main class="app" :style="appStyles">
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
