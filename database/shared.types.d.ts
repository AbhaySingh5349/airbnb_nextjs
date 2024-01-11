// d.ts file is used to provide TS type info

import { Document } from 'mongoose';

export interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  confirm_password?: string | undefined;
  joinedAt: Date;
}
