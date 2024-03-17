<template>
  <div class="flex flex-col items-center justify-center">
    <Logo />
    <!-- <p>{{ msg }}</p> -->

    <div class="flex flex-col justify-center">
      <Button label="Register" />
      <!-- <Button label="Login" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
// import { Button } from '~/components/ui/button'
import Logo from "~/components/ui/logo/Logo.vue";

const config = useRuntimeConfig()
const indexUrl = config.public.apiBaseUrl || "http://localhost:8000";
const { data: msg } = await useFetch(indexUrl);
</script>
