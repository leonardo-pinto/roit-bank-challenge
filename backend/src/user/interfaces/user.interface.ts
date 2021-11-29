import { Document } from 'mongoose';

export interface User extends Document {
  readonly id: number;
  readonly nome: string;
  readonly idade: number;
}
