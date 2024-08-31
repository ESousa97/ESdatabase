// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Você pode adicionar lógica personalizada aqui se necessário
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Defina quais caminhos não requerem autenticação
        const publicPaths = [
          "/login",
          "/api/auth",
          "/terms",
          "/privacy",
          "/favicon.ico",
          "/_next/",
        ];

        const { pathname } = req.nextUrl;

        // Permitir acesso a caminhos públicos
        if (publicPaths.some((path) => pathname.startsWith(path))) {
          return true;
        }

        // Requer autenticação para todos os outros caminhos
        return !!token;
      },
    },
  }
);

// Defina os caminhos que serão verificados pelo middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /api/auth (NextAuth.js)
     * - /login (Página de Login)
     * - /terms e /privacy (Páginas públicas)
     * - /_next/ (Recursos estáticos do Next.js)
     * - /favicon.ico (Ícone da aplicação)
     */
    "/((?!login|api/auth|terms|privacy|_next|favicon.ico).*)",
  ],
};
