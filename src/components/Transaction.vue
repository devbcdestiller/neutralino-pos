<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ref, Ref } from 'vue';
import { getTransactionByID } from '@/models/transactions';
import { Transaction } from '@/datatypes/inventory';
import { toReadableDate } from '@/lib/utils';
import { table } from 'console';


defineProps({
    transactionId: String
});

// const model: Ref<Transaction> = ref() as Ref<Transaction>;
const tableItems = ref();
const txnDate = ref();
const totalPrice = ref(0);

async function getTransaction(id: string) {
  const model = await getTransactionByID(id);
  txnDate.value = toReadableDate(model.date);
  tableItems.value = model.items;
  totalPrice.value = model.totalPrice;
}

function printReceipt() {
  console.log('PRINT')
}

</script>

<template>
    <Dialog>
        <DialogTrigger>
            <Button @click="getTransaction(transactionId as string)">View</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[720px]">
            <DialogHeader>
                <DialogTitle>Transaction</DialogTitle>
                <DialogDescription>Txn ID: {{ transactionId }}</DialogDescription>
                <DialogDescription>Txn Date: {{ txnDate }}</DialogDescription>
            </DialogHeader>
            <div class="flex flex-row justify-center items-center gap-10 px-16">
              <Table>
                  <TableHeader>
                  <TableRow
                    class="*:text-base *:font-bold"
                    >
                      <TableHead>Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead
                        class="text-right"
                        >
                        Price (PHP)
                      </TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  <TableRow
                    v-for="item in tableItems"
                    :key="item.item.id"
                    class="*:text-lg">
                      <TableCell
                        class="text-wrap font-light"
                        >
                        {{ item.item.itemName }}
                      </TableCell>
                      <TableCell
                        class="font-bold"
                        >
                        {{ item.amount }}
                      </TableCell>
                      <TableCell
                        class="text-right"
                        >
                        {{ item.totalItemPrice }}
                      </TableCell>
                  </TableRow>
                  </TableBody>
              </Table>
            </div>
            <DialogFooter class="flex flex-row justify-center items-center">
              <h1>Total: {{ totalPrice }}</h1>
              <Button @click="printReceipt">Print</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>