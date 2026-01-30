export interface Product {
    id: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

export interface Cart {
    id: number;
    userId: number;
    total: number;
    discountedTotal: number;
    totalProducts: number;
    totalQuantity: number;
    products: Product[];
}

export interface CartsResponse {
    carts: Cart[];
    total: number;
    skip: number;
    limit: number;
}