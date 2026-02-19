import { Product } from '@/src/domain/entities/Product';

export interface ProductDTO {
    id: string;
    name: string;
    description: string | null;
    sku: string;
    price: number;
    unit: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export function toProductDTO(product: Product): ProductDTO {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        sku: product.sku,
        price: product.price,
        unit: product.unit,
        isActive: product.isActive,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
    };
}
