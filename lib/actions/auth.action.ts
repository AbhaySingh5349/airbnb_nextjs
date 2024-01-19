'use server';

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { connectToDB } from '../mongoose';
import { CreateUserParams } from './shared.types';
import { User } from '@/database';

export const registerUser = async (params: CreateUserParams) => {
  try {
    await connectToDB();

    const { username, email, password } = params;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return new NextResponse('Email Already in use', { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // revalidatePath(path); // gives new data that was submitted (automatic refresh of path we are redirecting to)

    return user;
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
};

/*
to avoid warning: we need to modify keys in user model to pass over components as props eg. Date keys

Warning: Only plain objects can be passed to Client Components from Server Components. 
Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props
*/

export async function getSession() {
  return await getServerSession(authOptions);
}

export const getCurrentUser = async () => {
  try {
    await connectToDB();

    const session = await getSession();

    console.log('SESSION in get current user: ', session);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await User.findOne({
      email: session.user.email,
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    // not throwing error since some pages are also for signed-out users
    return null;
  }
};

export const getUserById = async (params: any) => {
  try {
    await connectToDB();

    const { userId } = params;

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    // not throwing error since some pages are also for signed-out users
    return null;
  }
};
