import { Product } from '@/src/domain/entities/Product';

export interface CreateProductData {
    name: string;
    description?: string | null;
    sku: string;
    price: number;
    unit?: string;
}

export interface UpdateProductData {
    name?: string;
    description?: string | null;
    sku?: string;
    price?: number;
    unit?: string;
    isActive?: boolean;
}

export interface IProductRepository {
    findAll(onlyActive?: boolean): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    findBySku(sku: string): Promise<Product | null>;
    create(data: CreateProductData): Promise<Product>;
    update(id: string, data: UpdateProductData): Promise<Product>;
    delete(id: string): Promise<void>;
}
