import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ name: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/auth', credentials)
      .then(() => {
        toast.success('Login successful!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Login failed! Please check your credentials.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="col-12 col-md-8 col-lg-6 bg-white rounded p-4 shadow">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login</h2>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="name"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={credentials.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
