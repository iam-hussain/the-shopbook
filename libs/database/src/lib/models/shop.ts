import mongoose from '../database';

interface ISchema {
  name: string;
  uniqueName: string;
  slogan: string;
  avatar: string;
  password: string;
  salt: string;
  email: string;
  phone: {
    e164Format: string;
    countryCode: string;
    country: string;
    number: string;
  };
  tags: {
    worker: string[];
    billableItem: string[];
    expense: string[];
  };
  contacts: mongoose.Types.ObjectId[];
  groups: mongoose.Types.ObjectId[];
  personals: mongoose.Types.ObjectId[];
  logs: {
    lastLogin: Date;
    lastPasswordReset: Date;
    lastActivity: Date;
  };
  state: {
    open: boolean;
    emailVerified: boolean;
    passwordAdded: boolean;
    phoneVerified: boolean;
  };
  oneTimePasswords: {
    code: string;
    generatedTime: Date;
    expiredAfter: Date;
    source: string;
  }[];
  workers: mongoose.SchemaDefinitionProperty[];
}

const schema = new mongoose.Schema<ISchema>(
  {
    name: { type: String },
    uniqueName: { type: String },
    slogan: { type: String },
    avatar: { type: String },
    password: { type: String },
    salt: { type: String },
    email: { type: String, unique: true },
    phone: {
      e164Format: { type: String, unique: true },
      countryCode: { type: String },
      country: { type: String },
      number: { type: String },
    },
    tags: {
      worker: [{ type: String }],
      billableItem: [{ type: String }],
      expense: [{ type: String }],
    },
    logs: {
      lastLogin: { type: Date },
      lastPasswordReset: { type: Date },
      lastActivity: { type: Date },
    },
    state: {
      open: { type: Boolean, default: false },
      emailVerified: { type: Boolean, default: false },
      passwordAdded: { type: Boolean, default: false },
      phoneVerified: { type: Boolean, default: false },
    },
    oneTimePasswords: [
      {
        code: { type: String },
        generatedTime: { type: Date, default: Date.now },
        expiredAfter: { type: Date, default: Date.now },
        source: { type: String, enum: ['phone', 'email'], default: 'email' },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

schema.virtual('workers', {
  type: 'ObjectId',
  ref: 'Worker',
  localField: '_id',
  foreignField: 'shop',
});

schema.virtual('attendances', {
  type: 'ObjectId',
  ref: 'Attendance',
  localField: '_id',
  foreignField: 'shop',
});

export const ShopModel = mongoose.model<ISchema>('Shop', schema);
