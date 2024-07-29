import { db, Transaction } from "@/lib/utils";

export async function addTransaction(transaction: Transaction) {
    return await db.transaction.add(transaction);
}

export async function filterByDate(startDate: number, endDate: number): Promise<Array<Transaction>> {
    return await db.transaction.where('date')
                    .between(startDate, endDate)
                    .toArray();
}
