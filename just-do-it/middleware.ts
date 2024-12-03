import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userSession = request.cookies.get('userSession');

  
  if (!userSession) {
    console.log('No userSession cookie found');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
   
    const user = JSON.parse(userSession.value);
    const allowedRoles = ['admin', 'super', 'trainer'];

    
    if (!allowedRoles.includes(user.roles)) {
      console.log(`Access denied for role: ${user.roles}`);
      return NextResponse.redirect(new URL('/not-authorized', request.url));
    }

    
    return NextResponse.next();
  } catch (error) {
    console.error('Error parsing userSession cookie:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashBoard-Admin/:path*'],
};
