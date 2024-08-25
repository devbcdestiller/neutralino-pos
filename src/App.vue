<script setup lang="ts">
import Dashboard from './pages/Dashboard.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Suspense>
    <RouterView v-slot="{ Component }">
      <component :is="Component"/>
    </RouterView>
  </Suspense>
</template>

<style scoped>

</style>
