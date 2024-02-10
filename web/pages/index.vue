<template>
  <div class="flex flex-col items-center justify-center h-full">
    <Logo />
    <h2>welcome to fleetr</h2>
    <NuxtLink to="/register">
      <PButton class="w-20">register</PButton>
    </NuxtLink>
    <PButton class="w-20">login</PButton>
    <PButton label="Check" icon="pi pi-check" />
  </div>
</template>

<script setup lang="ts">
// import { Button } from '~/components/ui/button'
import Logo from '~/components/ui/logo/Logo.vue'
</script>
