import { NextRequest, NextResponse } from 'next/server';
import { GetProducts } from '@/src/application/use-cases/product/GetProducts';
import { GetProductById } from '@/src/application/use-cases/product/GetProductById';
import { CreateProduct } from '@/src/application/use-cases/product/CreateProduct';
import { UpdateProduct } from '@/src/application/use-cases/product/UpdateProduct';
import { DeleteProduct } from '@/src/application/use-cases/product/DeleteProduct';
import { toProductDTO } from '@/src/interfaces/mappers/product.mapper';

export class ProductController {
    constructor(
        private readonly getProducts: GetProducts,
        private readonly getProductById: GetProductById,
        private readonly createProduct: CreateProduct,
        private readonly updateProduct: UpdateProduct,
        private readonly deleteProduct: DeleteProduct,
    ) { }

    async getAll(req: NextRequest): Promise<NextResponse> {
        try {
            const { searchParams } = new URL(req.url);
            const onlyActive = searchParams.get('active') === 'true';
            const products = await this.getProducts.execute(onlyActive);
            return NextResponse.json({ products: products.map(toProductDTO) });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al obtener productos';
            return NextResponse.json({ error: message }, { status: 500 });
        }
    }

    async getById(_req: NextRequest, id: string): Promise<NextResponse> {
        try {
            const product = await this.getProductById.execute(id);
            return NextResponse.json({ product: toProductDTO(product) });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al obtener producto';
            const status = message.includes('no encontrado') ? 404 : 500;
            return NextResponse.json({ error: message }, { status });
        }
    }

    async create(req: NextRequest): Promise<NextResponse> {
        try {
            const body = await req.json();
            const product = await this.createProduct.execute(body);
            return NextResponse.json({ product: toProductDTO(product) }, { status: 201 });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al crear producto';
            return NextResponse.json({ error: message }, { status: 400 });
        }
    }

    async update(req: NextRequest, id: string): Promise<NextResponse> {
        try {
            const body = await req.json();
            const product = await this.updateProduct.execute(id, body);
            return NextResponse.json({ product: toProductDTO(product) });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al actualizar producto';
            const status = message.includes('no encontrado') ? 404 : 400;
            return NextResponse.json({ error: message }, { status });
        }
    }

    async delete(_req: NextRequest, id: string): Promise<NextResponse> {
        try {
            await this.deleteProduct.execute(id);
            return NextResponse.json({ message: 'Producto eliminado' });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al eliminar producto';
            const status = message.includes('no encontrado') ? 404 : 500;
            return NextResponse.json({ error: message }, { status });
        }
    }
}
