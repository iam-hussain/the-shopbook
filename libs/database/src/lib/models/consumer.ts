import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  name: string;
  email: string;
  phone: {
    e164Format: string;
    countryCode: string;
    country: string;
    number: string;
  };
}

const schema = new mongoose.Schema<ISchema>(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    name: { type: String },
    email: { type: String },
    phone: {
        e164Format: { type: String, unique: true },
        countryCode: { type: String },
        country: { type: String },
        number: { type: String },
      },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const ConsumerModel = mongoose.model<ISchema>('Consumer', schema);
