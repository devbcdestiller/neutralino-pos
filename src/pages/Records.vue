<script setup lang="ts">
import { MagnifyingGlassIcon } from '@radix-icons/vue';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NavBar from '../components/NavBar.vue';
import { ref, toRaw } from 'vue';
import { toReadableDate } from '@/lib/utils';
import { getTransactions, getTransactionByID } from '@/models/transactions';

const search = ref();
const tableItems = ref();

async function refreshTableItems() {
  tableItems.value = await getTransactions();
}

async function searchTransaction() {
  console.log(search.value)
  const query: string = search.value;
  tableItems.value = await getTransactionByID(query);
  if(query.length == 0) await refreshTableItems();
}

await refreshTableItems();
</script>

<template>
    <NavBar/>
    <div class="px-16 py-8">
      <div class="relative grow *:text-xl">
          <MagnifyingGlassIcon class="absolute left-2 top-2 size-5 text-muted-foreground"/>
          <Input 
            class="pl-8"
            placeholder="Enter Transaction ID"
            v-model="search"
            @keyup="searchTransaction"
            />
      </div>
    </div>
    <div class="flex flex-row justify-center items-center gap-10 px-16">
        <Table>
            <TableCaption>A list of transactions.</TableCaption>
            <TableHeader>
            <TableRow
              class="*:text-base *:font-bold"
              >
                <TableHead>Transaction ID</TableHead>
                <TableHead>Transaction Date</TableHead>
                <TableHead
                  class="text-center"
                  >
                  Actions
                </TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow
              v-for="tableItem in tableItems"
              :key="tableItem.id"
              class="*:text-lg">
                <TableCell
                  class="text-wrap font-light"
                  >
                  {{ tableItem.id }}
                </TableCell>
                <TableCell
                  class="font-bold"
                  >
                  {{ toReadableDate(tableItem.date) }}
                </TableCell>
                <TableCell class="flex flex-row justify-center content-center gap-4">
                  
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
    </div>
</template>