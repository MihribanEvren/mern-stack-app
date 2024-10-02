import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../models/Users';
import { comparePassword } from '../utils/helpers';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error('User Not Found');
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (name, password, done) => {
    try {
      const findUser = await User.findOne({ name });
      if (!findUser) throw new Error('User not found');
      if (!comparePassword(password, findUser.password))
        throw new Error('Bad credentials');
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
