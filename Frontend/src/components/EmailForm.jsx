import React, { useState } from 'react';
import API from '../services/api';

const EmailForm = ({ onSend }) => {
  const [formData, setFormData] = useState({ to: '', subject: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/email/send', formData);
      alert('Email sent successfully!');
      onSend();
    } catch (err) {
      console.error(err);
      alert('Failed to send email!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-lg font-bold mb-2">Send Email</h2>
      <div className="mb-2">
        <label className="block text-sm">To</label>
        <input
          type="email"
          name="to"
          onChange={handleChange}
          value={formData.to}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Subject</label>
        <input
          type="text"
          name="subject"
          onChange={handleChange}
          value={formData.subject}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Message</label>
        <textarea
          name="text"
          onChange={handleChange}
          value={formData.text}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Send Email
      </button>
    </form>
  );
};

export default EmailForm;
