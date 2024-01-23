import { NextResponse } from 'next/server';
import User from '@/app/(models)/User';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

export async function POST(req) {
  const body = await req.json();
  const userData = body.formData;

  if (!userData?.email) {
    return NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 }
    );
  }

  const userFound = await User.findOne({ email: userData.email });

  if (!userFound) {
    return NextResponse.json(
      { message: 'Email adoes not exist' },
      { status: 409 }
    );
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const passwordResetExpire = Date.now() + 3600000;

  userFound.resetToken = passwordResetToken;
  userFound.resetTokenExpiry = passwordResetExpire;
  const resetUrl = `localhost:3000/reset-password/${resetToken}`;
  console.log('reseturl', resetUrl);

  const body2 = 'Reset Password by clicking on following url: ' + resetUrl;

  const msg = {
    to: userData.email,
    from: 'denz.granadoz21@gmail.com',
    subject: 'Reset Password',
    text: body2,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

  sgMail
    .send(msg)
    .then(() => {
      return new NextResponse(
        { message: 'Reset Password email is sent!' },
        { status: 200 }
      );
    })
    .catch(async (error) => {
      userFound.resetToken = undefined;
      userFound.resetTokenExpiry = undefined;
      await userFound.save();

      return new NextResponse.json(
        { message: 'Failed sending email', error },
        { status: 400 }
      );
    });

  try {
    await userFound.save();
    return new NextResponse(
      { message: 'Reset Password email is sent for resetting' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
