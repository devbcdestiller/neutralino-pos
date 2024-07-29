export interface Item {
    id?: string;
    // sku: string;
    itemName: string;
    price: number;
    // stepPrice: number
    // amount?: number
}

export interface CartItems {
    [key: string]: {
        item: Item
        amount: number
        price: number
        totalItemPrice: number      
    }
}


export interface Transaction {
    id?: string;
    date: number;
    totalPrice: number;
    items: CartItems
}