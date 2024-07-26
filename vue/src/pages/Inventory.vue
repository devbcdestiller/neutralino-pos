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
import { Button } from '@/components/ui/button';

import { Pencil1Icon, Cross2Icon } from '@radix-icons/vue';
import NavBar from '../components/NavBar.vue';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]
</script>

<template>
    <NavBar />
    <div class="flex flex flex-nowrap gap-4 justify-between px-16 py-8">
      <div class="relative grow *:text-xl">
          <MagnifyingGlassIcon class="absolute left-2 top-2 size-5 text-muted-foreground"/>
          <Input class="pl-8" placeholder="Search Inventory"/>
      </div>
      <Button class="*:text-xl">Add Item</Button>
    </div>
    <div class="flex flex-row justify-center items-center gap-10 px-16">
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
            <TableRow class="*:text-lg">
                <TableHead class="w-[100px]">
                SKU
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead class="text-right">
                Price
                </TableHead>
                <TableHead class="text-center">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow v-for="invoice in invoices" :key="invoice.invoice" class="*:text-lg">
                <TableCell class="font-medium">
                {{ invoice.invoice }}
                </TableCell>
                <TableCell>{{ invoice.paymentStatus }}</TableCell>
                <TableCell>{{ invoice.paymentMethod }}</TableCell>
                <TableCell class="text-right">
                {{ invoice.totalAmount }}
                </TableCell>
                <TableCell class="flex flex-row justify-center content-center gap-4">
                  <Pencil1Icon class="text-blue-600 cursor-pointer"/>
                  <Cross2Icon class="text-red-600 cursor-pointer"/>
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
    </div>
</template>