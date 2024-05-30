import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../model/user_model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        console.log(jwt_payload)
        const user = await User.findById(jwt_payload.payload.id);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.error('Error finding user:', err);
        return done(err, false);
      }
    })
  );
};