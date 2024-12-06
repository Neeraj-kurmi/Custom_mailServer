import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed!');
    }
  };

  return <AuthForm onSubmit={handleRegister} title="Register" />;
};

export default RegisterPage;
