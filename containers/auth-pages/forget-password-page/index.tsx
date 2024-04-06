'use client';
import { isValidEmail } from '@/utils/regex';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const ForgetPasswordContainer = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
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

    const { email } = formData;

    if (!isValidEmail(email)) {
      setErrorMessage('Email is invalid');
      return;
    }

    const res = await fetch('/api/forget-password', {
      method: 'POST',
      body: JSON.stringify({ formData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push('/ForgetPassword');
    }
  };

  return (
    <section className="w-full h-full flex justify-center items-center bg-gray-200">
      <div className="lg:w-1/2 sm:w-3/4 xl:w-3/5 h-7/12 border p-5 sm:p-10 lg:p-20 flex flex-col justify-between bg-gray-100">
        <div>
          <h1 className="text-center text-5xl text-slate-600">
            Forget Password
          </h1>
        </div>
        <form
          className="flex flex-col align-center justify-center p-0"
          onSubmit={handleSubmit}
        >
          <label className="mb-1.5 text-slate-600">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            className="block bg-gray-200 m-0 px-4 py-3 w-full rounded-none text-xl text-black focus:ring-green-500 focus:rounded-none"
          />
          <input
            type="submit"
            value="Submit"
            className="my-6 p-3 w-full bg-blue-400 hover:bg-blue-100 hover:cursor-pointer"
          />
          {errorMessage && <p className="text-red-400 my-2">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default ForgetPasswordContainer;
