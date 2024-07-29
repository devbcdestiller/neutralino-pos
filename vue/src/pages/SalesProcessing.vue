<script setup lang="ts">
import { ref, Ref, toRaw} from 'vue'
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import {
  Button
} from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import NavBar from '@/components/NavBar.vue';
import ItemForm from '@/components/ItemForm.vue';
import { CartItems, Item } from '@/datatypes/inventory';
import { computeItemPrice, computeTransaction } from '@/lib/utils';
import { getAllItems } from '@/models/items';

const cartItems: Ref<CartItems> = ref({})
const totalPrice = ref(0);
const inventory = ref(await getAllItems());
const open = ref(false)

function showInventory() {
  open.value = !open.value;
}

function hideInventory() {
  open.value = false;
}

function addToCart(refItem: Item) {
  const rawItem = toRaw(refItem);

  cartItems.value[rawItem.id as string] = {
    item: rawItem,
    amount: 1,
    price: rawItem.price,
    totalItemPrice: rawItem.price
  }
}

function removeFromCart(id: string) {
  delete cartItems.value[id];
}

function saveTransaction() {
  console.log(totalPrice.value)
  console.log(cartItems)
}

</script>

<template>
    <NavBar />
    <div class="flex flex flex-nowrap gap-4 justify-between px-16 py-8">
      <!-- <div class="relative grow *:text-xl">
          <MagnifyingGlassIcon class="absolute left-2 top-2 size-5 text-muted-foreground"/>
          <Input 
            class="pl-8"
            placeholder="Search Inventory"
            v-model="search"
            @keyup="searchInventory"
            @focus="showInventory"
            />
      </div> -->
        <!-- <Popover class="grow *:text-xl">
            <PopoverTrigger as-child class="grow *:text-xl text-left">
                <Button variant="outline" class="text-left">Search Inventory</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder="Item to search..." />
                    <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                        <CommandItem value="calendar">
                        Calendar
                        </CommandItem>
                        <CommandItem value="search-emoji">
                        Search Emoji
                        </CommandItem>
                        <CommandItem value="calculator">
                        Calculator
                        </CommandItem>
                </CommandList>
            </Command>
            </PopoverContent>
        </Popover> -->
        <Command 
          @focusin="showInventory"
          >
          <CommandInput
            class="text-xl"
            placeholder="Item to search..." />
          <CommandEmpty>Item not found...</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem 
                v-for="inventoryItem in inventory"
                @click="addToCart(inventoryItem)"
                :key="inventoryItem.itemName"
                :value="inventoryItem.itemName"
                class="text-md"
                >
                {{ inventoryItem.itemName }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
    </div>
    <div 
      class="flex flex-col justify-center items-center gap-10 px-16"
      >
        <Table>
            <TableCaption>Search Inventory to add item into cart.</TableCaption>
            <TableHeader>
            <TableRow
              class="*:text-base *:font-bold"
              >
                <TableHead
                  class="w-[50px]"
                  >
                  Item
                </TableHead>
                <TableHead>Item SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead
                  class="text-right"
                  >
                  Price (PHP)
                </TableHead>
                <TableHead
                  class="text-center"
                  >
                  Actions
                </TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow
              v-for="(cartItem, key, index) in cartItems" 
              class="*:text-lg"
              >
                <TableCell
                  class="text-center font-light"
                  >
                  {{ index + 1}}
                </TableCell>
                <TableCell
                  class="text-wrap font-light"
                  >
                  {{ key }}
                </TableCell>
                <TableCell
                  class="font-bold"
                  >
                  {{ cartItem.item.itemName }}
                </TableCell>
                <TableCell
                  class="font-medium"
                  >
                  <NumberField
                    id="amount"
                    :default-value="1"
                    :min="0.01"
                    :step="0.01"
                    v-model="cartItem.amount"
                    class="font-semibold"
                    >
                    <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                    </NumberFieldContent>
                  </NumberField>
                </TableCell>
                <TableCell
                  class="text-right"
                  >
                  {{ 
                    cartItem.totalItemPrice = computeItemPrice(
                      cartItem.amount as number,
                      cartItem.price as number
                    ),
                    cartItem.totalItemPrice.toLocaleString()
                  }}
                </TableCell>
                <TableCell 
                  class="text-center"
                  >
                  <ItemForm
                    :dialogTitle="`Remove Item`"
                    :dialogDescription="`Are you sure you want to remove ${cartItem.item.itemName} from cart?`"
                    :isDelete="true"
                    :variant="`destructive`"
                    v-model="cartItem.item"
                    @submit="removeFromCart(key as string)"
                  />
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
        <div
          class="flex flex-row justify-between content-center gap-8"
          >
          <h2 
            class="grow scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
            >
            Total: {{
              totalPrice = computeTransaction(cartItems),
              totalPrice.toLocaleString()
            }}
          </h2>
          <Button class="flex-1" @click="saveTransaction()">Submit</Button>
        </div>
    </div>
</template>