import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  title: string;
  readableId: string;
  category: string[];
  products: {
    item: mongoose.SchemaDefinitionProperty;
    variations: string[],
    available: string;
  }[];
  state: {
    activateOn: Date;
    deactivateOn: Date;
  };
  method: string;
}

const schema = new mongoose.Schema<ISchema>(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    title: { type: String },
    readableId: { type: String },
    category: [{ type: String }],
    products: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        variations: [{ readableId: { type: String } }],
        available: { type: Boolean, default: false },
      },
    ],
    state: {
      activateOn: { type: Date },
      deactivateOn: { type: Date },
    },
    method: {
      type: String,
      enum: ['byDay', 'byTime', 'dayByTime'],
      default: 'absent',
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const ProductSettingModel = mongoose.model<ISchema>(
  'ProductSetting',
  schema
);
