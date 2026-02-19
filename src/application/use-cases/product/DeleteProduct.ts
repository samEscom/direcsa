import { IProductRepository } from '@/src/domain/repositories/IProductRepository';

export class DeleteProduct {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(id: string): Promise<void> {
        if (!id) throw new Error('ID de producto requerido');
        const existing = await this.productRepository.findById(id);
        if (!existing) throw new Error('Producto no encontrado');
        await this.productRepository.delete(id);
    }
}
