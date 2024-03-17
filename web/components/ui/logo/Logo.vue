<template>
  <div class="flex justify-center items-center">
    <h1 class="logo" :class="twClasses">fleetr</h1>
  </div>
</template>

<script setup lang="ts">
const twClasses = ["text-6xl sm:text-8xl md:text-9xl", "font-bold", "m-6"];
</script>

<style>
.logo {
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 900;
  /* color: hsl(138, 30%, 40%); */
  /* text-shadow: 0.2rem 0rem 0.5rem hsl(138, 30%, 50%); */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
