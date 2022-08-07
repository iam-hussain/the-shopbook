import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  netPrice: number;
  status: string;
  items: {
    item: mongoose.SchemaDefinitionProperty;
    totalPrice: string;
    variation: {
      readableId: string;
      quantity: string;
      price: number;
    }[];
  }[];
  state: {
    isBilled: { type: boolean };
    isPrinted: { type: boolean };
    isPaid: { type: boolean };
  };
}

const schema = new mongoose.Schema<ISchema>(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    netPrice: { type: Number },
    status: {
      type: String,
      enum: ['in-complete', 'in-preparation', 'is-delivered'],
      default: 'in-complete',
    },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'BillableItem' },
        totalPrice: { type: String },
        variation: [
          {
            readableId: { type: String },
            quantity: { type: Number },
            price: { type: Number },
          },
        ],
      },
    ],
    state: {
      isBilled: { type: Boolean, default: false },
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const BillingCartModel = mongoose.model<ISchema>(
  'BillingCart',
  schema
);
