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
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

import { Button } from '@/components/ui/button';

const model = defineModel()
defineEmits([
    'submit'
]);

defineProps({
    dialogTitle: String,
    dialogDescription: String,
    isDelete: {
        type: Boolean,
        default: false
    },
    variant: {
        type: String,
        default: "default"
    }
})

</script>

<template>
    <Dialog>
        <DialogTrigger>
            <Button :variant="variant">{{ dialogTitle }}</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ dialogTitle }}</DialogTitle>
                <DialogDescription>{{ dialogDescription }}</DialogDescription>
            </DialogHeader>
                <div class="grid gap-4 py-4" v-if="!isDelete">
                    <div class="grid grid-cols-4 items-center gap-4">
                        <label for="name" class="text-right">
                        Name
                        </label>
                        <input id="name" v-model="model.itemName" :placeholder="model.itemName" class="col-span-3" />
                    </div>

                    <!-- <div class="grid grid-cols-4 items-center gap-4">
                        <label for="amount" class="text-right">
                        Amount
                        </label>
                        <NumberField
                            id="amount"
                            :default-value="1"
                            :min="0"
                            v-model="model.amount"
                            class="col-span-3"
                        >
                            <NumberFieldContent>
                            <NumberFieldDecrement />
                            <NumberFieldInput />
                            <NumberFieldIncrement />
                            </NumberFieldContent>
                        </NumberField>
                    </div> -->

                    <div class="grid grid-cols-4 items-center gap-4">
                        <label for="price" class="text-right">
                        Price
                        </label>
                        <NumberField
                            id="price"
                            :step="0.01"
                            :default-value="1"
                            :format-options="{
                                style: 'currency',
                                currency: 'PHP',
                                currencyDisplay: 'code',
                                currencySign: 'accounting'
                            }"
                            :min="0"
                            v-model="model.price"
                            class="col-span-3"
                        >
                            <NumberFieldContent>
                            <NumberFieldDecrement />
                            <NumberFieldInput />
                            <NumberFieldIncrement />
                            </NumberFieldContent>
                        </NumberField>
                    </div>
                </div>
            <DialogFooter>
                <DialogClose as-child>
                    <Button :variant="variant" @click="$emit('submit', model)">Save changes</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>