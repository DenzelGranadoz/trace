import { NextResponse } from 'next/server';
import User from '@/app/(models)/User';
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
    return new NextResponse(
      { message: 'User password has been updated' },
      { status: 200 }
    );
  } catch (error) {
    console.log('error foun', error);
    return new NextResponse({ 'error:': error }, { status: 500 });
  }
}
