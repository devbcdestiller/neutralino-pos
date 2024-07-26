<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="flex flex-row shadow-md content-evenly hover:*:bg-zinc-300 *:py-4 *:px-8 *:text-xl">
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/sales">Sales Processing</RouterLink>
        <RouterLink to="/inventory">Inventory</RouterLink>
        <RouterLink to="/records">Records</RouterLink>
    </div>
</template> 