import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      alert('Login failed!');
    }
  };

  return <AuthForm onSubmit={handleLogin} title="Login" />;
};

export default LoginPage;
