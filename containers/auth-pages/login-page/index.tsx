'use client';

import { isValidEmail } from '@/utils/regex';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginSection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

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
    const { email, password } = formData;

    if (isValidEmail(email)) {
      setErrorMessage('Email is Invalid');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password Invalid');
      return;
    }

    const res = await signIn('credentials', {
      // redirect: false,
      email,
      password,
    });

    if (!res.ok) {
      setErrorMessage(res.error);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <section className="rounded-xl bg-text-100 w-full h-full flex justify-center items-center">
      <div className="lg:w-1/2 sm:w-3/4 xl:w-1/3  h-3/5 border p-20 flex flex-col justify-between bg-gray-100">
        <div>
          <h1 className="text-center text-5xl text-slate-600">Welcome Back</h1>
          <h4 className="text-center text-slate-600">
            Please log in to continue
          </h4>
        </div>
        <form
          className="flex flex-col align-center justify-center p-0"
          method="post"
          onSubmit={handleSubmit}
        >
          <label className="mb-1.5 text-slate-600">Email Address</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            className="block bg-gray-200 m-0 px-4 py-3 w-full rounded-none text-xl text-black focus:ring-green-500 focus:rounded-none"
          />
          <label className="mb-1.5 text-slate-600">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            className="block bg-gray-200 m-0 px-4 py-3 w-full rounded-none text-xl text-black focus:ring-green-500 focus:rounded-none"
          />

          <div className="w-full text-right mt-6 mb-3.5  flex justify-end ">
            <Link
              href="/Register"
              className="text-blue-400 hover:text-slate-400"
            >
              Forget password?
            </Link>
          </div>
          <input
            type="submit"
            value="Login"
            className="m-0 p-3 w-full bg-blue-400 hover:bg-blue-100 hover:cursor-pointer"
          />
          {errorMessage && <p className="text-red-400 my-2">{errorMessage}</p>}
        </form>
        <div className="h-20 flex flex-col text-center">
          <p className="text-slate-600">Or log in with:</p>
          <div className="flex-1 flex pt-2">
            <button
              className="flex-1 border-white border bg-gray-400 hover:bg-gray-500"
              onClick={() => {
                signIn('github');
              }}
            >
              Github
            </button>
            <button
              className="flex-1 border-white border bg-gray-400 hover:bg-gray-500"
              onClick={() => {
                signIn('google');
              }}
            >
              Google
            </button>
            <button
              className="flex-1 border-white border bg-gray-400 hover:bg-gray-500"
              onClick={() => {
                signIn('discord');
              }}
            >
              Discord
            </button>
          </div>
        </div>
        <div className="h-5 w-full flex justify-center ">
          <span className="text-slate-600 mr-1">No account yet?</span>
          <Link href="/Register" className="text-blue-400 hover:text-slate-400">
            Register Here
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
