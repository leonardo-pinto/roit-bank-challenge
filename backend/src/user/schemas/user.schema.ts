import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Number,
  nome: String,
  idade: Number,
});
