import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

export class GetProducts {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(onlyActive = false): Promise<Product[]> {
        return this.productRepository.findAll(onlyActive);
    }
}
