'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { isValidEmail } from '@/utils/regex';

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
      <form
        onSubmit={handleSubmit}
        method="post"
        className="border border-black"
      >
        <div>
          <h1>Create Account</h1>
        </div>
        <div>
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
          {errorMessage && <p>{errorMessage}</p>}
          <input type="submit" value="Register" className="btn" />
        </div>
      </form>
    </section>
  );
};

export default RegisterSection;
