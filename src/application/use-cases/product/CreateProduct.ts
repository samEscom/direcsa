import { Product } from '@/src/domain/entities/Product';
import { IProductRepository, CreateProductData } from '@/src/domain/repositories/IProductRepository';

export interface CreateProductDTO {
    name: string;
    description?: string;
    sku: string;
    price: number;
    unit?: string;
}

export class CreateProduct {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(dto: CreateProductDTO): Promise<Product> {
        // Domain validation
        Product.validate(dto.name, dto.sku, dto.price);

        // Check SKU uniqueness
        const existing = await this.productRepository.findBySku(dto.sku.trim().toUpperCase());
        if (existing) {
            throw new Error(`Ya existe un producto con el SKU: ${dto.sku}`);
        }

        const data: CreateProductData = {
            name: dto.name.trim(),
            description: dto.description?.trim() ?? null,
            sku: dto.sku.trim().toUpperCase(),
            price: dto.price,
            unit: dto.unit?.trim() ?? 'pza',
        };

        return this.productRepository.create(data);
    }
}
