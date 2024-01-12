import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { User } from '@/database';
import { connectToDB } from '@/lib/mongoose';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // while logging-in with credentials
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(formCredentials) {
        await connectToDB();

        if (!formCredentials?.email || !formCredentials?.password) {
          throw new Error('Invalid credentials');
        }

        const existingUser = await User.findOne({
          email: formCredentials.email,
        });

        console.log('logged-in user: ', existingUser);

        if (!existingUser) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          formCredentials.password,
          existingUser.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return existingUser;
      },
    }),
  ],
  pages: {
    // if any error s happen, it will redirect to '/' page which is auth for us
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
