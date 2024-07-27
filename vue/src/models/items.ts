import { db } from "@/lib/utils";
import { Item } from "@/lib/utils";

export async function getItemById(id: number): Promise<Item | undefined> {
    return await db.items.get(id);
}

export async function getItemsByName(name: string): Promise<Array<Item>> {
    return await db.items.where('itemName')
        .startsWithIgnoreCase(name)
        .toArray();
}

export async function getAllItems(): Promise<Array<Item>> {
    return await db.items.toArray();
}

export async function addItem(item: Item): Promise<Number | undefined> {
    return await db.items.put(item);
}

export async function deleteItem(id: number): Promise<void> {
    return await db.items.delete(id);
}