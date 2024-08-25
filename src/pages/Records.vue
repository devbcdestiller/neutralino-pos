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
import {
  NavBar,
  DateRange,
  Transaction
} from '@/components';

import { ref } from 'vue';
import { toReadableDate } from '@/lib/utils';
import {
  filterByDate,
  getTransactions,
  searchTransactionByID
} from '@/models/transactions';

const search = ref();
const tableItems = ref();

async function refreshTableItems() {
  tableItems.value = await getTransactions();
}

async function searchTransaction() {
  const query: string = search.value;
  tableItems.value = await searchTransactionByID(query);
  if(query.length == 0) await refreshTableItems();
}

async function filterTransaction(range: any) {
  if (range.start === undefined) return
  if (range.end === undefined) return
  
  const start = new Date(range.start.year,
    range.start.month - 1,
    range.start.day)
      .toDateString();
  const end = new Date(range.end.year,
    range.end.month - 1,
    range.end.day)
      .toDateString();

  console.log(start)
  console.log(end)
  tableItems.value = await filterByDate(Date.parse(start), Date.parse(end));
}

await refreshTableItems();
</script>

<template>
    <NavBar/>
    <div class="flex flex flex-nowrap gap-4 justify-between px-16 py-8">
      <div class="relative grow *:text-xl">
          <MagnifyingGlassIcon class="absolute left-2 top-2 size-5 text-muted-foreground"/>
          <Input 
            class="pl-8"
            placeholder="Enter Transaction ID"
            v-model="search"
            @keyup="searchTransaction"
            />
      </div>
      <div>
        <DateRange
          @submit="filterTransaction"  
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
                  <Transaction
                    :transaction-id="tableItem.id"
                  />
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
    </div>
</template>