import { NextResponse } from 'next/server';
import User from '@/lib/models/User';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;

    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    const resetToken = crypto.randomBytes(20).toString('hex');
    const activateUserToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const activateTokenExpire = Date.now() + 3600 * 1000 * 10;

    userData.activateToken = activateUserToken;
    userData.activateTokenExpire = activateTokenExpire;
    const resetUrl = `http://localhost:3000/api/activate/${resetToken}`;

    const body2 =
      'Activate your account by clicking on following url: ' + resetUrl;

    const msg = {
      to: userData.email,
      from: 'zelgranadoz@gmail.com',
      subject: 'Activate Account',
      html: body2,
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

    sgMail
      .send(msg)
      .then(() => {
        const successResponse = {
          message: 'Reset Password email is sent!',
        };
        const body = JSON.stringify(successResponse);
        return new NextResponse(body, { status: 200 });
      })
      .catch(async (error) => {
        userData.resetToken = undefined;
        userData.resetTokenExpiry = undefined;
        await userData.save();

        return NextResponse.json(
          { message: 'Failed sending email', error },
          { status: 400 }
        );
      });

    await User.create(userData);

    return NextResponse.json(
      { message: 'User Created Successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
