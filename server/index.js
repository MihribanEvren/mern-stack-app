import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import userRouter from './routes/userRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/crud')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(
  session({
    secret: 'mihi the dev',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

// Authentication with passport.js library
// Session'dan sonra, Route'lardan önce yapılır
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRouter);

// Auth
app.post('/api/auth', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200).json(req.user);
});

app.get('/api/auth/status', (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
