import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  readableId: string;
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
    isPrepared: { type: boolean };
    isDelivered: { type: boolean };
    isActive: { type: boolean };
  };
}

const schema = new mongoose.Schema<ISchema>(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    readableId: { type: String },
    netPrice: { type: Number },
    status: {
      type: String,
      enum: ['in-complete', 'in-preparation', 'is-delivered'],
      default: 'in-complete',
    },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
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
      isPrepared: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      isActive: {  type: Boolean, default: true }
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const OrderModel = mongoose.model<ISchema>(
  'Order',
  schema
);
