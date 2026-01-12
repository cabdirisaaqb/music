import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  
  if (!token) {
   
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
    const userRole = decoded.role

   
    if (pathname.startsWith('/admin')) {
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url))
      }
      return NextResponse.next()
    }

  
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (pathname === '/') {
      if (userRole === 'admin' || userRole === 'user') {
        return NextResponse.next()
      }
    }

   
    return NextResponse.next()

  } catch (error) {
   
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.delete('token')
    return response
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/',
    '/login',
    '/register',
  ],
}