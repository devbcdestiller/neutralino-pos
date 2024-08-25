import { db } from "@/lib/utils";
import { Transaction } from "@/lib/utils";

export async function addTransaction(transaction: Transaction) {
    console.log(transaction)
    return await db.transactions.put(transaction);
}

export async function filterByDate(startDate: number, endDate: number): Promise<Array<Transaction>> {
    return await db.transactions.where('date')
                    .between(startDate, endDate)
                    .toArray();
}

export async function getTransactions() {
    return await db.transactions.toArray();
}

export async function getTransactionByID(id: string) {
    console.log(id)
    return await db.transactions.where('id')
        .startsWithIgnoreCase(id).toArray();
}