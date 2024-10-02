import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`http://localhost:5000/api/users/${id}`)
        .then((res) => {
          setFormData({
            name: res.data.name,
            email: res.data.email,
            age: res.data.age,
            password: '',
          });
        })
        .catch((err) => console.log(err));
    }
  }, [id, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const successMessage = isEditing
      ? 'User updated successfully!'
      : 'User added successfully!';
    const errorMessage = 'An error occurred! Please try again.';

    setErrors({});

    const request = isEditing
      ? axios.put(`http://localhost:5000/api/users/${id}`, {
          ...formData,
          password: formData.password,
        })
      : axios.post('http://localhost:5000/api/users', {
          ...formData,
          password: formData.password,
        });

    request
      .then(() => {
        toast.success(successMessage);
        navigate('/');
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const validationErrors = {};
          err.response.data.errors.forEach((error) => {
            validationErrors[error.path] = error.msg;
          });
          setErrors(validationErrors);
        } else {
          toast.error(errorMessage);
        }
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="col-12 col-md-8 col-lg-6 bg-white rounded p-4 shadow">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">
            {isEditing ? 'Update User' : 'Add User'}
          </h2>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="form-control"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <div className="text-danger">{errors.age}</div>}
          </div>
<<<<<<< HEAD
          <div className="form-group mb-4">
=======
          <div className="form-group mb-3">
>>>>>>> backend
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
<<<<<<< HEAD
              value={formData.password}
=======
              value={formData.password || ''}
>>>>>>> backend
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            {isEditing ? 'Update' : 'Add'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn btn-light w-100 mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
