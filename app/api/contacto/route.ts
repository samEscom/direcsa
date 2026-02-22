import { NextRequest } from 'next/server';
import { ContactController } from '@/src/interfaces/controllers/ContactController';
import { CreateContact } from '@/src/application/use-cases/contact/CreateContact';
import { PrismaContactRepository } from '@/src/infrastructure/repositories/PrismaContactRepository';

// Dependency Injection
const contactRepository = new PrismaContactRepository();
const createContact = new CreateContact(contactRepository);
const contactController = new ContactController(createContact);

export async function POST(req: NextRequest) {
    return await contactController.create(req);
}
