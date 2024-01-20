'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
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

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
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
      setErrorMessage('Password length must be at least 8');
      return;
    }

    const res = await fetch('/api/Register', {
      method: 'POST',
      body: JSON.stringify({ formData }),
      'content-type': 'application/json',
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push('/Login');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method='post'
        className='flex flex-col gap-3 w-1/2'
      >
        <h1>Register</h1>
        <label>Name</label>
        <input
          id='name'
          name='name'
          onChange={handleChange}
          type='text'
          required={true}
          value={formData.name}
          className='m-2 bg-slate-400 rounded'
        />
        <label>Email</label>
        <input
          id='email'
          name='email'
          onChange={handleChange}
          type='text'
          required={true}
          value={formData.email}
          className='m-2 bg-slate-400 rounded'
        />
        <label>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          onChange={handleChange}
          required={true}
          value={formData.password}
          className='m-2 bg-slate-400 rounded'
        />
        <input
          type='submit'
          value='Register'
          className='bg-blue-400 hover:bg-blue-100'
        />
      </form>
      <p className='text-red-500'>{errorMessage}</p>
    </>
  );
};

export default Register;
