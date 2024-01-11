'use server';

// import { revalidatePath } from 'next/cache';

import { connectToDB } from '../mongoose';
import { CreateUserParams } from './shared.types';
import { User } from '@/database';

export const registerUser = async (params: CreateUserParams) => {
  try {
    await connectToDB();

    const { username, email, password } = params;
    const user = await User.create({ username, email, password });

    // revalidatePath(path); // gives new data that was submitted (automatic refresh of path we are redirecting to)

    return user;
  } catch (err) {
    console.log('error in creating answer: ', err);
    throw new Error(`error in creating answer: ${err}`);
  }
};
