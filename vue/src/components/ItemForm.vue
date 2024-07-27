<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
        <DialogTrigger as-child>
            <Button :variant="variant">{{ dialogTitle }}</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ dialogTitle }}</DialogTitle>
                <DialogDescription>{{ dialogDescription }}</DialogDescription>
            </DialogHeader>
                <div class="grid gap-4 py-4" v-if="!isDelete">
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-right">
                        Name
                        </Label>
                        <input id="name" v-model="model.itemName" :placeholder="model.itemName" class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="amount" class="text-right">
                        Amount
                        </Label>
                        <input type="number" id="amount" v-model="model.amount" :placeholder="model.amount" class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="price" class="text-right">
                        Price
                        </Label>
                        <input type="number" id="price" v-model="model.price" :placeholder="model.price" class="col-span-3" />
                    </div>
                </div>
            <DialogFooter>
            <!-- <Button @click="console.log(model)">Save changes</Button> -->
            <Button :variant="variant" @click="$emit('submit', model)">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>