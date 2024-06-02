import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ history }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signin', formData);
      console.log('Sign in successful:', data);  // Add this line
      localStorage.setItem('profile', JSON.stringify(data));
      history.push('/');
    } catch (error) {
      console.error('Error signing in:', error);  // Add this line
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;