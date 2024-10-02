import express from 'express';
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../utils/validationSchemas.js';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', checkSchema(createUserValidationSchema), createUser);

router.put('/:id', checkSchema(createUserValidationSchema), updateUser);

router.delete('/:id', deleteUser);

export default router;
