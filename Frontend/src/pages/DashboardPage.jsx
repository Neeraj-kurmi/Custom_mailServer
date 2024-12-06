import  { useState, useEffect } from 'react';
import API from '../services/api';
import EmailForm from '../components/EmailForm';
import EmailList from '../components/EmailList';

const DashboardPage = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const { data } = await API.get('/email/inbox');
      setEmails(data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch emails!');
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="p-4">
      <EmailForm onSend={() => fetchEmails()} />
      <EmailList emails={emails} />
    </div>
  );
};

export default DashboardPage;
