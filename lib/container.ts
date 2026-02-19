/**
 * Dependency Injection Container (manual)
 *
 * Wires together infrastructure implementations with use cases.
 * No DI framework needed — simple factory functions.
 */

import { prisma } from '@/src/infrastructure/prisma/prismaClient';
import { hashPassword, verifyPassword } from '@/src/infrastructure/auth/password';
import { signToken } from '@/src/infrastructure/auth/jwt';

// Repositories
import { PrismaUserRepository } from '@/src/infrastructure/repositories/PrismaUserRepository';
import { PrismaProductRepository } from '@/src/infrastructure/repositories/PrismaProductRepository';
import { PrismaQuoteRepository } from '@/src/infrastructure/repositories/PrismaQuoteRepository';

// Use Cases
import { RegisterUser } from '@/src/application/use-cases/user/RegisterUser';
import { LoginUser } from '@/src/application/use-cases/user/LoginUser';
import { CreateProduct } from '@/src/application/use-cases/product/CreateProduct';
import { GetProducts } from '@/src/application/use-cases/product/GetProducts';
import { GetProductById } from '@/src/application/use-cases/product/GetProductById';
import { UpdateProduct } from '@/src/application/use-cases/product/UpdateProduct';
import { DeleteProduct } from '@/src/application/use-cases/product/DeleteProduct';
import { CreateQuote } from '@/src/application/use-cases/quote/CreateQuote';
import { GetQuotes } from '@/src/application/use-cases/quote/GetQuotes';
import { GetQuoteById } from '@/src/application/use-cases/quote/GetQuoteById';

// Controllers
import { AuthController } from '@/src/interfaces/controllers/AuthController';
import { ProductController } from '@/src/interfaces/controllers/ProductController';
import { QuoteController } from '@/src/interfaces/controllers/QuoteController';

// ─── Repositories (singletons) ───────────────────────────────────────────────
const userRepository = new PrismaUserRepository(prisma);
const productRepository = new PrismaProductRepository(prisma);
const quoteRepository = new PrismaQuoteRepository(prisma);

// ─── Controller factories ─────────────────────────────────────────────────────

export function getAuthController(): AuthController {
    const registerUser = new RegisterUser(userRepository, hashPassword);
    const loginUser = new LoginUser(userRepository, verifyPassword, signToken);
    return new AuthController(registerUser, loginUser);
}

export function getProductController(): ProductController {
    const getProducts = new GetProducts(productRepository);
    const getProductById = new GetProductById(productRepository);
    const createProduct = new CreateProduct(productRepository);
    const updateProduct = new UpdateProduct(productRepository);
    const deleteProduct = new DeleteProduct(productRepository);
    return new ProductController(getProducts, getProductById, createProduct, updateProduct, deleteProduct);
}

export function getQuoteController(): QuoteController {
    const getQuotes = new GetQuotes(quoteRepository);
    const getQuoteById = new GetQuoteById(quoteRepository);
    const createQuote = new CreateQuote(quoteRepository);
    return new QuoteController(getQuotes, getQuoteById, createQuote);
}
