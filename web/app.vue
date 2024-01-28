<template>
  <Head>
    <Title>fleets</Title>
  </Head>

  <div class="app dark">
    <header>
      <div>
        <div class="m-4">
          <NuxtLink to="/">fleetr</NuxtLink>
        </div>
        <Separator class="" />
      </div>
    </header>
    <main>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
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
</style>
```
