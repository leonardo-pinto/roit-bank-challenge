import { Document } from 'mongoose';

export interface User extends Document {
  readonly id: number;
  readonly name: string;
  readonly idade: number;
}
