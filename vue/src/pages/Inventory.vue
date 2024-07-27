<script setup lang="ts">
import { MagnifyingGlassIcon } from '@radix-icons/vue';
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ref, toRaw } from 'vue';
import { Item } from '@/datatypes/inventory';
import { getAllItems, getItemsByName, addItem, deleteItem } from '@/models/items';
import ItemForm from '../components/ItemForm.vue';
import NavBar from '../components/NavBar.vue';
import { randomFileName } from '@/lib/utils';

const search = ref();
const tableItems = ref();
const itemModel = ref({
  itemName: "Sample Item",
  price: 100,
  amount: 10
});


async function refreshTableItems() {
  tableItems.value = await getAllItems();
  console.log(tableItems)
}

async function deleteTableItem(id: number) {
  await deleteItem(id);
  await refreshTableItems();
}

async function addTableItem(tableItem: Item) {
  await addItem(Object.assign({id: randomFileName()}, toRaw(tableItem)));
  await refreshTableItems();
}

async function searchInventory() {
  const query: string = search.value
  console.log(search)
  tableItems.value = await getItemsByName(query);
  if(query.length == 0) await refreshTableItems()
}
await refreshTableItems();

</script>

<template>
    <NavBar />
    <div class="flex flex flex-nowrap gap-4 justify-between px-16 py-8">
      <div class="relative grow *:text-xl">
          <MagnifyingGlassIcon class="absolute left-2 top-2 size-5 text-muted-foreground"/>
          <Input 
            class="pl-8"
            placeholder="Search Inventory"
            v-model="search"
            @keyup="searchInventory"
            />
          <div>{{ search }}</div>
      </div>
      <ItemForm 
        :dialogTitle="`Add Item`"
        :dialogDescription="`Enter Information Item`"
        v-model="itemModel"
        @submit="addTableItem"/>
    </div>
    <div class="flex flex-row justify-center items-center gap-10 px-16">
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
            <TableRow class="*:text-lg">
                <TableHead class="w-[100px]">
                Item
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead class="text-right">
                Price (PHP)
                </TableHead>
                <TableHead class="text-center">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow v-for="(tableItem, index) in tableItems" :key="tableItem.id" class="*:text-lg">
                <TableCell class="font-medium">
                {{ index }}
                </TableCell>
                <TableCell>{{ tableItem.itemName }}</TableCell>
                <TableCell>{{ tableItem.amount }}</TableCell>
                <TableCell class="text-right">
                {{ tableItem.price }}
                </TableCell>
                <TableCell class="flex flex-row justify-center content-center gap-4">
                  <!-- <ItemForm
                    :dialogDescription="`Edit Item`"
                    :dialogTitle="`Edit Item`"
                    @submit="addTableItem"
                    /> -->
                  <ItemForm
                    :dialogTitle="`Delete Item`"
                    :dialogDescription="`Are you sure you want to delete the item?`"
                    :isDelete="true"
                    :variant="`destructive`"
                    @submit="deleteTableItem(tableItem.id)"
                  />
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
    </div>
</template>