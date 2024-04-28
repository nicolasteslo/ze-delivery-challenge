import mongoose, { Schema } from "mongoose";
import { IPartner } from "../types/partners.type";

const partnersSchema = new Schema(
  {
    tradingName: { type: String, required: true },
    ownerName: { type: String, required: true },
    document: { type: String, unique: true, required: true },
    coverageArea: {
      type: { type: String, enum: ["MultiPolygon"], required: true },
      coordinates: { type: [[[[Number]]]], required: true },
    },
    address: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number, Number], required: true },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

partnersSchema.index({ coverageArea: "2dsphere" });

const PartnersModel = mongoose.model<IPartner>("partners", partnersSchema);

export { PartnersModel };
