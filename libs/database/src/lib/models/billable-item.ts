import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  title: string;
  readableId: string;
  tag: string;
  variation: {
    readableId: string;
    subTitle: string;
    price: number;
  }[];
}

const schema = new mongoose.Schema<ISchema>(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    title: { type: String },
    readableId: { type: String },
    tag: { type: String },
    variation: [{
      readableId: { type: String },
      subTitle: { type: String },
      price: { type: Number },
      state: {
        available: { type: Boolean, default: false },
      },
    }]
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const BillableItemModel = mongoose.model<ISchema>('BillableItem', schema);
