export const createUserValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 3,
        max: 32,
      },
      errorMessage:
        'Name must be at least 3 characters with a max 32 characters',
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty',
    },
    isString: {
      errorMessage: 'Name must be a string',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Please provide a valid email address',
    },
    normalizeEmail: true,
    notEmpty: {
      errorMessage: 'Email cannot be empty',
    },
  },
  age: {
    isInt: {
      options: { min: 0, max: 100 },
      errorMessage: 'Age must be an integer between 0 and 100',
    },
    notEmpty: {
      errorMessage: 'Age cannot be empty',
    },
    toInt: true,
  },
  password: {
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage:
        'Password must be at least 3 characters with a max 20 characters',
    },
    notEmpty: {
      errorMessage: 'Password cannot be empty',
    },
  },
};
