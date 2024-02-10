<template>
  <div class="space-y-2">
    <Logo />
    <div class="flex h-14 space-x-4 items-center text-lg">
      <NuxtLink to="/register">
        <Button class="w-20">register</Button>
      </NuxtLink>
      <Separator orientation="vertical" />
      <Button class="w-20">login</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
import Logo from '~/components/ui/logo/Logo.vue'
</script>
