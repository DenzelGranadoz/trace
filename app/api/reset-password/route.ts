import { NextResponse } from 'next/server';
import User from '@/lib/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const body = await req.json();
  const userData = body.formData;

  const userFound = await User.findOne({ email: userData.email });
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userFound.password = hashedPassword;

  userFound.resetToken = undefined;
  userFound.resetTokenExpiry = undefined;

  try {
    await userFound.save();
    const successResponse = {
      message: 'User password has been updated',
    };
    const body = JSON.stringify(successResponse);
    return new NextResponse(body, { status: 200 });
  } catch (error) {
    const errorResponse = {
      message: 'Error',
    };
    const body = JSON.stringify(errorResponse);
    return new NextResponse(body, { status: 500 });
  }
}
