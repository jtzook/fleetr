<template>
  <div class="flex flex-col items-center justify-center h-full">
    <!-- <p>{{ msg }}</p> -->

    <div class="flex flex-col h-2/3 w-full">
      <div class="flex-1 flex align-center justify-center bg-red-500">
        <Logo />
      </div>

      <div class="flex-1 flex align-center justify-center bg-green-500">Box 2</div>

      <div class="flex-1 flex align-center justify-center bg-blue-500">
        <div class="flex flex-col">
          <Button label="Register"  />
          <Button label="Login" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
// import { Button } from '~/components/ui/button'
import Logo from "~/components/ui/logo/Logo.vue";

const config = useRuntimeConfig();
const indexUrl = config.public.apiBaseUrl || "http://localhost:8000";
const { data: msg } = await useFetch(indexUrl);
</script>
