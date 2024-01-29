<template>
  <NuxtLink to="/register">
    <div class="p-4 space-y-4">
      <div class="flex flex-col items-center space-y-2">
        <div class="text-lg font-bold leading-none">Logo</div>
      </div>
      <div
        class="flex h-14 space-x-4 items-center justify-center space-x-4 text-lg"
      >
        <Button class="w-20">register</Button>
        <Separator orientation="vertical" />
        <Button class="w-20">login</Button>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
</script>
