import { IResolvers } from 'graphql-tools';
import * as bcrypt from 'bcrypt';
import { User } from './entity/User';

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      return User.findOne({ where: { id: req.session.userId } });
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      User.create({ email, password: hashedPassword }).save();
      return true;
    },
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const valid = bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }
      req.session.userId = user.id;
      return user;
    }
  }
};
