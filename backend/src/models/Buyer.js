import mongoose from 'mongoose';

export const buyerSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  email: { type: String, lowercase: true, index: true },
  phone: String,
  password: String,
  role: { type: String, default: 'BUYER' },
  state: String,
  city: String,
  pincode: String,
  address: String,
  avatar: String
}, { strict: false, timestamps: true });
