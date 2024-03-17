<template>
  <Head>
    <Title>fleets</Title>
  </Head>

  <main>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import "primevue/resources/themes/aura-light-green/theme.css";
</script>

<style>
main {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  padding: 1rem;

  background: hsl(var(--background));
  color: hsl(var(--foreground));
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

header > div {
  width: 500px;
  max-width: 80%;
  /* max-width: 64rem; */
  padding: 0 1rem;
}

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
