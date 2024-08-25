import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Item, Transaction, CartItems } from '@/datatypes/inventory'
import { Dexie, type EntityTable} from 'dexie'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundCurrency(inputNumber: number): number {
  return (Math.round(inputNumber * 100) / 100)
}

export function computeItemPrice(amount: number, price: number): number {
  return roundCurrency(
    amount * price
  );
}

export function computeTransaction(cart: CartItems): number {
  let total = 0;
  for (let item in cart) {
    total += cart[item].totalItemPrice as number
  };
  return total;
}

export const randomFileName = () => self.crypto.randomUUID()

export function toReadableDate(epoch: number) {
  return new Date(epoch);
}

const db = new Dexie('posDB') as Dexie & {
  items: EntityTable<
    Item,
    'id'
  >,
  transactions: EntityTable<
    Transaction,
    'id'
  >
};

db.version(1).stores({
  items: '&id, itemName',
  transactions: '&id, date',
});

export type { Item, Transaction };
export { db };
