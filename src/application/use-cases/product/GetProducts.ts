import { Product } from '@/src/domain/entities/Product';
import { IProductRepository } from '@/src/domain/repositories/IProductRepository';

export class GetProducts {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(onlyActive = false): Promise<Product[]> {
        return this.productRepository.findAll(onlyActive);
    }
}
