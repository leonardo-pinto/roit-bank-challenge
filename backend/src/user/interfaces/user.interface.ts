import { Document } from 'mongoose';

export interface Customer extends Document {
  readonly id: number;
  readonly name: string;
  readonly idade: number;
}
