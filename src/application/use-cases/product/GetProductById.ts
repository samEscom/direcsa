import { Product } from '@/src/domain/entities/Product';
import { IProductRepository } from '@/src/domain/repositories/IProductRepository';

export class GetProductById {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(id: string): Promise<Product> {
        if (!id) throw new Error('ID de producto requerido');
        const product = await this.productRepository.findById(id);
        if (!product) throw new Error('Producto no encontrado');
        return product;
    }
}
