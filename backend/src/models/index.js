import mongoose from 'mongoose';
import { sellerSchema } from './Seller.js';
import { buyerSchema } from './Buyer.js';

const personFields = { id: { type: String, unique: true }, name: String, email: { type: String, lowercase: true, index: true }, phone: String, password: String, role: String, transportId: String, driverId: String, transportCompanyId: String, companyName: String, state: String, city: String, pincode: String, address: String, licenseNumber: String, assignedVehicleNumber: String, avatar: String, rating: Number, tripsCompleted: Number, experienceYears: Number };

export const schemas = {
  User: new mongoose.Schema(personFields, { strict: false, timestamps: true }),
  Seller: sellerSchema,
  Buyer: buyerSchema,
  Product: new mongoose.Schema({ id: { type: String, unique: true }, title: String, category: String, categoryLabel: String, description: String, price: Number, weightKg: Number, sellerId: String, sellerName: String, state: String, city: String, lat: Number, lng: Number, images: [String] }, { strict: false, timestamps: true }),
  Partner: new mongoose.Schema({ id: { type: String, unique: true }, companyName: String, partnerStatus: String }, { strict: false, timestamps: true }),
  Fleet: new mongoose.Schema({ id: { type: String, unique: true }, vehicleNumber: String, transportCompanyId: String }, { strict: false, timestamps: true }),
  Driver: new mongoose.Schema({ id: { type: String, unique: true }, driverId: String, transportCompanyId: String }, { strict: false, timestamps: true }),
  Order: new mongoose.Schema({ id: { type: String, unique: true }, productId: String, buyerId: String, sellerId: String, status: String, transportRequestStatus: String, transportCompanyId: String, driverId: String, vehicleNumber: String }, { strict: false, timestamps: true })
};
