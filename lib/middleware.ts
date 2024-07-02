import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

export async function middleware(request: NextRequest) {
  const user = await auth();
  const userRole = user?.user.role;

  const protectedPaths = ['/dashboard', '/admin-dashboard'];

  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin-dashboard/:path*'],
}