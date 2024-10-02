import { validationResult } from 'express-validator';
import { User } from '../models/Users.js';

//@desc     Get all posts
//@route    GET /api/posts

export const getUsers = async (req, res) => {
  await User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
};

//@desc    Get single user
//@route   GET /api/users/:id

export const getUser = async (req, res) => {
  const { id } = req.params;
  await User.findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

//@desc    Create new user
//@route   POST /api/users

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, age, password } = req.body;
  const user = new User({ name, email, age, password });
  await user
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

//@desc    Update the user
//@route   PUT /api/users/:id

export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, email, age, password } = req.body;
  const updatedData = { name, email, age };
  if (password) {
    updatedData.password = password;
  }

  await User.findByIdAndUpdate(id, updatedData)
    .then(() => res.json({ msg: 'User updated' }))
    .catch((err) => res.status(500).json(err));
};

//@desc    Delete the user
//@route   DELETE /api/users/:id

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id)
    .then(() => res.json({ msg: 'User deleted' }))
    .catch((err) => res.status(500).json(err));
};
