'use server';

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// import { revalidatePath } from 'next/cache';

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
