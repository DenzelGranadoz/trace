import { NextResponse } from 'next/server';
import User from '@/lib/models/User';
import crypto from 'crypto';

export async function POST(req) {
  const { token } = await req.json();

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    const errorResponse = {
      message: 'Invalid token or token has expired!',
    };
    const body = JSON.stringify(errorResponse);
    return new NextResponse(body, { status: 400 });
  }

  return new NextResponse(JSON.stringify(user), { status: 200 });
}
