import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Item } from '@/datatypes/inventory'
import { Dexie, type EntityTable} from 'dexie'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const randomFileName = () => self.crypto.randomUUID()

const db = new Dexie('posDB') as Dexie & {
  items: EntityTable<
    Item,
    'id' // primary key "id" (for the typings only)
  >;
};

db.version(1).stores({
  items: '&id, itemName'
});

export type { Item };
export { db };