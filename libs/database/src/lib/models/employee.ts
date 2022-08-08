import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  name: string;
  userName: string;
  tag: string[];
  access: string;
  password: string;
  salt: string;
  email: string;
  joined: Date;
  netSalary: number;
  state: {
    isWorking: boolean;
  };
}

const schema = new mongoose.Schema<ISchema>(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    name: { type: String },
    userName: { type: String },
    tag: [{ type: String }],
    access: [
      {
        type: String,
        enum: ['manager', 'biller', 'helper', 'server', 'other'],
        default: 'other',
      },
    ],
    password: { type: String },
    salt: { type: String },
    email: { type: String, unique: true },
    joined: { type: Date },
    netSalary: Number,
    state: {
      isWorking: { type: Boolean },
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const EmployeeModel = mongoose.model<ISchema>('Employee', schema);
