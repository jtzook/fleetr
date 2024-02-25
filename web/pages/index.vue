<template>
  <div class="flex flex-col items-center justify-center h-full">
    <Logo />
    <h2>welcome to fleetr</h2>
    <NuxtLink to="/register">
      <PButton class="w-20">register</PButton>
    </NuxtLink>
    <PButton class="w-20">login</PButton>
  </div>
</template>

<script setup lang="ts">
import PButton from "primevue/button"
// import { Button } from '~/components/ui/button'
import Logo from '~/components/ui/logo/Logo.vue'
</script>
