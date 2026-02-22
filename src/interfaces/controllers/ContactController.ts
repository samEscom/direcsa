import { NextRequest, NextResponse } from 'next/server';
import { CreateContact } from '@/src/application/use-cases/contact/CreateContact';

export class ContactController {
    constructor(private readonly createContact: CreateContact) { }

    async create(req: NextRequest): Promise<NextResponse> {
        try {
            const body = await req.json();
            const contact = await this.createContact.execute({
                name: body.name,
                email: body.email,
                phone: body.phone,
                description: body.description,
            });

            return NextResponse.json({
                message: 'Mensaje enviado correctamente',
                contact: {
                    id: contact.id,
                    createdAt: contact.createdAt
                }
            }, { status: 201 });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al procesar el mensaje de contacto';
            return NextResponse.json({ error: message }, { status: 400 });
        }
    }
}
