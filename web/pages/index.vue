<template>
  <div class="flex flex-col items-center justify-center w-full h-3/4">
    <Logo />
    <p>{{ msg }}</p>
    <!-- <NuxtLink to="/register">
      <PButton class="w-20">register</PButton>
    </NuxtLink>
    <PButton class="w-20">login</PButton> -->
  </div>
</template>

<script setup lang="ts">
import PButton from "primevue/button";
// import { Button } from '~/components/ui/button'
import Logo from "~/components/ui/logo/Logo.vue";

const config = useRuntimeConfig()
const indexUrl = config.public.apiBaseUrl || "http://localhost:8000";
const { data: msg } = await useFetch(indexUrl);
</script>
