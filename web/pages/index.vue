<template>
  <NuxtLink to="/register">
    <div class="p-4 space-y-4">
      <div class="flex flex-col items-center space-y-2">
        <div class="text-lg font-bold leading-none">Logo</div>
      </div>
      <div class="flex h-5 items-center justify-center space-x-4 text-sm">
        <div class="text-gray-500 w-20 flex justify-end">register</div>
        <Separator orientation="vertical" />
        <div class="text-gray-500 w-20 justify-end">login</div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Separator } from '~/components/ui/separator'
</script>
