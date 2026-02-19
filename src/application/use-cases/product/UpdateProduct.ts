import { Product } from '@/src/domain/entities/Product';
import { IProductRepository, UpdateProductData } from '@/src/domain/repositories/IProductRepository';

export interface UpdateProductDTO {
    name?: string;
    description?: string | null;
    sku?: string;
    price?: number;
    unit?: string;
    isActive?: boolean;
}

export class UpdateProduct {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(id: string, dto: UpdateProductDTO): Promise<Product> {
        if (!id) throw new Error('ID de producto requerido');

        const existing = await this.productRepository.findById(id);
        if (!existing) throw new Error('Producto no encontrado');

        if (dto.price !== undefined && dto.price < 0) {
            throw new Error('El precio debe ser mayor o igual a 0');
        }

        const data: UpdateProductData = {
            ...(dto.name && { name: dto.name.trim() }),
            ...(dto.description !== undefined && { description: dto.description }),
            ...(dto.sku && { sku: dto.sku.trim().toUpperCase() }),
            ...(dto.price !== undefined && { price: dto.price }),
            ...(dto.unit && { unit: dto.unit.trim() }),
            ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        };

        return this.productRepository.update(id, data);
    }
}
