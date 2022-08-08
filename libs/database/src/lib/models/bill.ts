import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  order: mongoose.SchemaDefinitionProperty;
  readableId: string;
  netPrice: number;
  items: {
    item: mongoose.SchemaDefinitionProperty;
    title: string;
    readableId: string;
    tag: string;
    totalPrice: string;
    variation: {
      readableId: string;
      subTitle: string;
      quantity: string;
      price: number;
    }[];
  }[];
  state: {
    isPrinted: { type: boolean };
    isPaid: { type: boolean };
    paidAt: { type: Date };
  };
}

const schema = new mongoose.Schema<ISchema>(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    readableId: { type: String },
    netPrice: { type: Number },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: { type: String },
        readableId: { type: String },
        tag: { type: String },
        totalPrice: { type: String },
        variation: [
          {
            readableId: { type: String },
            subTitle: { type: String },
            quantity: { type: Number },
            price: { type: Number },
          },
        ],
      },
    ],
    state: {
      isPrinted: { type: Boolean, default: false },
      isPaid: { type: Boolean, default: false },
      paidAt: { type: Date },
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const BillModel = mongoose.model<ISchema>(
  'Bill',
  schema
);
