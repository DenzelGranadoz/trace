'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { isValidEmail } from '@/utils/regex';
import Link from 'next/link';

interface RegisterSectionProps {}

const RegisterSection: React.FC<RegisterSectionProps> = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailVerified: false,
    password: '',
  });

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
    setErrorMessage('');

    const { email, password } = formData;

    if (!isValidEmail(email)) {
      setErrorMessage('Enter a valid email');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password length should be at least 8 characters');
      return;
    }

    const res = await fetch('/api/Register', {
      method: 'POST',
      body: JSON.stringify({ formData }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.push('/Login');
      router.refresh();
    }
  };

  return (
    <section className="rounded-xl bg-text-100 flex justify-center items-center w-full h-full">
      <div className="lg:w-1/2 sm:w-3/4 xl:w-3/5 h-7/12 border p-5 sm:p-10 lg:p-20 flex flex-col justify-between bg-gray-100">
        <div>
          <h1 className="text-center text-5xl text-slate-600">Register</h1>
          <h4 className="text-center text-slate-600">
            Please log in to continue
          </h4>
        </div>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col align-center justify-center p-0"
        >
          <label>Name</label>
          <input
            id="name"
            name="name"
            onChange={handleChange}
            type="text"
            required={true}
            value={formData.name}
            placeholder="Name"
          />
          <label>Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            type="text"
            required={true}
            value={formData.email}
            placeholder="Email"
          />
          <label>Password</label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            type="password"
            required={true}
            value={formData.password}
            placeholder="Password"
          />
          <input
            type="submit"
            value="Register"
            className="my-6 p-3 w-full bg-blue-400 hover:bg-blue-100 hover:cursor-pointer"
          />
          {errorMessage && <p className="text-red-400 my-2">{errorMessage}</p>}
        </form>
        <div className="h-5 w-full flex justify-center ">
          <span className="text-slate-600 mr-1">Already have an account?</span>
          <Link href="/Login" className="text-blue-400 hover:text-slate-400">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
