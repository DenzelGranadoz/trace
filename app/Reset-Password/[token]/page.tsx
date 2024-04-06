'use client';
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ResetPassword = ({ params }) => {
  console.log('para', params);
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const { status: sessionStatus, data: session } = useSession();
  console.log('data', session);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('/api/verify-token', {
          method: 'POST',
          body: JSON.stringify({ token: params.token }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 400) {
          setErrorMessage('invalid token or has expired');
          setVerified(true);
        }
        if (res.status === 200) {
          setErrorMessage('');
          setVerified(true);
          const userData = await res.json();
          console.log('getemail', userData.email);
          setUser(userData);
          setFormData((prevState) => ({
            ...prevState,
            email: userData.email,
          }));
        }
      } catch (error) {
        setErrorMessage('Error, try again');
      }
    };

    verifyToken();
  }, [params.token]);

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.push('/');
      router.refresh();
    }
  }, [sessionStatus, router]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { password } = formData;
    console.log('form', formData);

    // setFormData((prevState) => ({
    //   ...prevState,
    //   email: user.email,
    // }));
    console.log(formData);

    const res = await fetch('/api/reset-password', {
      method: 'POST',
      body: JSON.stringify({ formData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 400) {
      setErrorMessage('Something went wrong');
    }

    if (res.status == 200) {
      setErrorMessage('');
      router.push('/Login');
    }

    // if (!res.ok) {
    //   const response = await res.json();
    //   setErrorMessage(response.message);
    // } else {
    //   // router.refresh();
    //   router.push('/Login');
    // }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-200">
      <div className="lg:w-1/2 sm:w-3/4 xl:w-3/5 h-7/12 border p-5 sm:p-10 lg:p-20 flex flex-col justify-between bg-gray-100">
        <div>
          <h1 className="text-center text-5xl text-slate-600">
            Reset Password
          </h1>
        </div>
        <form
          className="flex flex-col align-center justify-center p-0"
          onSubmit={handleSubmit}
        >
          <label className="mb-1.5 text-slate-600">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            value={formData.password}
            required
            className="block bg-gray-200 m-0 px-4 py-3 w-full rounded-none text-xl text-black focus:ring-green-500 focus:rounded-none"
          />
          <input
            type="submit"
            value="Reset Password"
            disabled={errorMessage.length > 0}
            className="my-6 p-3 w-full bg-blue-400 hover:bg-blue-100 hover:cursor-pointer"
          />
          {errorMessage && <p className="text-red-400 my-2">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
