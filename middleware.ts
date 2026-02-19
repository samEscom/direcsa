import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/src/infrastructure/auth/jwt';

const PROTECTED_PATHS = [
    '/dashboard',
    '/api/quotes',
];

const ADMIN_ONLY_METHODS: Record<string, string[]> = {
    '/api/products': ['POST', 'PUT', 'DELETE'],
};

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const isProtected =
        PROTECTED_PATHS.some((p) => pathname.startsWith(p)) ||
        (ADMIN_ONLY_METHODS['/api/products'] &&
            ADMIN_ONLY_METHODS['/api/products'].includes(req.method) &&
            pathname.startsWith('/api/products'));

    if (!isProtected) return NextResponse.next();

    const token =
        req.cookies.get('token')?.value ??
        req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
        if (pathname.startsWith('/api/')) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    try {
        verifyToken(token);
        return NextResponse.next();
    } catch {
        if (pathname.startsWith('/api/')) {
            return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
        }
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/api/products/:path*',
        '/api/quotes/:path*',
    ],
};
