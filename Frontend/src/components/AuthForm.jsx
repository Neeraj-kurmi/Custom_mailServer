import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AuthForm = ({ onSubmit, title }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleRegister=(e)=>{
    e.preventDefault();
    navigate("/register");
  }

  const handleLogin=(e)=>{
    e.preventDefault();
    navigate("/login");
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {title}
      </button>
      
    </form>
    {
      title=="Login" && (
        <div className='flex justify-center'>
          <NavLink className='m-3 text-blue-800 cursor-pointer '
         onClick={handleRegister}
   >Not registerd click for Register?</NavLink>
        </div>
         
      )
   }
   {
      title=="Register" && (
         <div className='flex justify-center'><NavLink className='m-3 text-blue-800 cursor-pointer'
         onClick={handleLogin}
   >Aready register click for Login?</NavLink></div>
      )
   }
    </>
    
  );
};

export default AuthForm;
