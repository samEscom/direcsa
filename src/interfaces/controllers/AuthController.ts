import { NextRequest, NextResponse } from 'next/server';
import { RegisterUser } from '@/src/application/use-cases/user/RegisterUser';
import { LoginUser } from '@/src/application/use-cases/user/LoginUser';
import { toUserDTO } from '@/src/interfaces/mappers/user.mapper';

export class AuthController {
    constructor(
        private readonly registerUser: RegisterUser,
        private readonly loginUser: LoginUser,
    ) { }

    async register(req: NextRequest): Promise<NextResponse> {
        try {
            const body = await req.json();
            const { name, email, password } = body;

            const { user } = await this.registerUser.execute({ name, email, password });

            return NextResponse.json(
                { user: toUserDTO(user), message: 'Cuenta creada exitosamente' },
                { status: 201 },
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al registrar usuario';
            return NextResponse.json({ error: message }, { status: 400 });
        }
    }

    async login(req: NextRequest): Promise<NextResponse> {
        try {
            const body = await req.json();
            const { email, password } = body;

            const { user, token } = await this.loginUser.execute({ email, password });

            const response = NextResponse.json(
                { user: toUserDTO(user), token, message: 'Sesión iniciada' },
                { status: 200 },
            );

            // Set HTTP-only cookie for SSR auth
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return response;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al iniciar sesión';
            return NextResponse.json({ error: message }, { status: 401 });
        }
    }

    async logout(_req: NextRequest): Promise<NextResponse> {
        const response = NextResponse.json({ message: 'Sesión cerrada' });
        response.cookies.delete('token');
        return response;
    }
}
