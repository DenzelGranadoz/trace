import User from '@/lib/models/User';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req, { params }) {
  const { token } = params;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    activateToken: hashedToken,
    activateTokenExpire: { $gt: Date.now() },
    activatedAt: null,
    createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  });

  if (!user) {
    throw new Error('Token is invalid or expired');
  }

  user.activateToken = undefined;
  user.activateTokenExpire = undefined;
  user.emailVerified = true;
  user.activatedAt = new Date();

  await user.save();

  redirect('/Login');
}
