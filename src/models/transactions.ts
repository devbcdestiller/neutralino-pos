import { db } from "@/lib/utils";
import { Transaction } from "@/lib/utils";

export async function addTransaction(transaction: Transaction) {
    return await db.transactions.put(transaction);
}

export async function filterByDate(startDate: number, endDate: number): Promise<Array<Transaction>> {
    console.log(startDate);
    console.log(endDate)
    return (await db.transactions.where('date')
                    .between(startDate, endDate + (86400 * 1000))
                    .toArray()).sort(
                        (min, max) => min.date - max.date
                    );
}

export async function getTransactions() {
    return (await db.transactions.toArray()).sort(
        (min, max) => min.date - max.date
    );
}

export async function searchTransactionByID(id: string) {
    return (await db.transactions.where('id')
        .startsWithIgnoreCase(id).toArray()).sort(
            (min, max) => min.date - max.date
        );
}

export async function getTransactionByID(id: string): Promise<Transaction> {
    return await db.transactions.get(id) as Transaction;
}