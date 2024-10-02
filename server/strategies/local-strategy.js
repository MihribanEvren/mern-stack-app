import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../models/Users';

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error('User not found');
      if (!comparePassword(password, findUser.password))
        throw new Error('Bad credentials');
      done(null, findUser);
    } catch (error) {
      done(err, null);
    }
  })
);
