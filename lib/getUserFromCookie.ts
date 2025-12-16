import { NextRequest } from 'next/server';
import { User } from '@/models/User';

export async function getUserFromCookie(request: NextRequest) {
  const cookie = request.cookies.get('user');
  if (!cookie) return null;

  try {
    const data = JSON.parse(cookie.value);
    const user = await User.findById(data.id).select('-password');
    if (!user || !user.isActive) return null;
    return user;
  } catch {
    return null;
  }
}
