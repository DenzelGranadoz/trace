import { NextResponse } from 'next/server';
import User from '../../(models)/User';
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
    const resetUrl = `localhost:3000/activate/${resetToken}`;

    const body2 =
      'Activate your account by clicking on following url: ' + resetUrl;

    const msg = {
      to: userData.email,
      from: 'denz.granadoz21@gmail.com',
      subject: 'Activate Account',
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

    await User.create(userData);

    return NextResponse.json(
      { message: 'User Created Successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log(err);
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
