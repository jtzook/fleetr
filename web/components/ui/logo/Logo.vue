<template>
  <h1 class="logo" :class="twClasses">fleetr</h1>
</template>

<script setup lang="ts">
const twClasses = ['text-7xl sm:text-8xl md:text-9xl', 'font-bold']
</script>

<style>
.logo {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 900;
  color: hsl(138, 30%, 40%);
  text-shadow: 0.2rem 0rem 0.5rem hsl(138, 30%, 50%);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
