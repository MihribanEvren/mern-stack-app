import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const successMessage = 'User deleted successfully!';
    const errorMessage = 'An error occurred! Please try again.';
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() => {
        toast.success(successMessage);
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch(() => toast.error(errorMessage));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark ">
      <div className="col-12 col-md-8 col-lg-6 bg-white rounded p-4">
        <Link to="/create">
          <button className="btn btn-success mb-3">Add+</button>
        </Link>

        <input
          type="text"
          placeholder="Search"
          className="form-control mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-center">{user.age}</td>
                  <td className="d-flex justify-content-center">
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
