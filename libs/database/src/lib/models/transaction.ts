import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  title: string;
  note: string;
  tag: string;
  addedAt: Date;
  netPrice: number;
  method: string;
  employee: mongoose.SchemaDefinitionProperty;
  state: {
    isPending: { type: boolean };
  };
}

const schema = new mongoose.Schema<ISchema>(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    title: { type: String },
    note: { type: String },
    tag: { type: String },
    addedAt: { type: Date },
    netPrice: Number,
    method: {
      type: String,
      enum: ['income', 'expense', 'salary'],
      default: 'expense',
    },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    state: {
      isPending: { type: Boolean, default: false },
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const TransactionModel = mongoose.model<ISchema>(
  'Transaction',
  schema
);
