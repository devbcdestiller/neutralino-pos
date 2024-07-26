<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/component/ui/card';

import { FileTextIcon } from '@radix-icons/vue';
import { ArchiveIcon } from '@radix-icons/vue';
import { ClipboardIcon } from '@radix-icons/vue';
import { RouterLink } from 'vue-router';

</script>
<template>
    <div class="flex flex-col justify-center items-center gap-10 m-10">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome</h1>
        <div class="flex flex-row justify-center items-center gap-4">
            <RouterLink to="/sales">
                <Card class="cursor-pointer hover:bg-zinc-300">
                    <CardHeader>
                        <CardTitle class="flex flex-col justify-center items-center">
                            <FileTextIcon class="h-52 w-52 text-blue-500"/>
                            <h1 class="text-2xl text-wrap">Sales Processing</h1>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </RouterLink>
            <RouterLink to="/inventory">
                <Card class="cursor-pointer hover:bg-zinc-300">
                    <CardHeader>
                        <CardTitle class="flex flex-col justify-evenly items-center">
                            <ArchiveIcon class="h-52 w-52 text-blue-500"/>
                            <h1 class="text-2xl text-wrap">Inventory</h1>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </RouterLink>
            <RouterLink to="/records">
                <Card class="cursor-pointer hover:bg-zinc-300">
                    <CardHeader>
                        <CardTitle class="flex flex-col justify-center items-center">
                            <ClipboardIcon class="h-52 w-52 text-blue-500"/>
                            <h1 class="text-2xl text-wrap">Records</h1>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </RouterLink>
        </div>
    </div>

</template>