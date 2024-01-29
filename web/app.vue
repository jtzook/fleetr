<template>
  <Head>
    <Title>fleets</Title>
  </Head>

  <div class="app dark">
    <!-- <header>
      <div>
        <div class="m-4">
          <NuxtLink to="/">fleetr</NuxtLink>
        </div>
        <Separator class="" />
      </div>
    </header> -->

    <main class="w-full xs:w-11/12 sm:w-10/12 md:w-9/12 max-w-3xl">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
</script>

<style>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;

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
```
