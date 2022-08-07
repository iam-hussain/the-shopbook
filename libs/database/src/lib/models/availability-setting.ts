import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  title: string;
  readableId: string;
  category: string[];
  billableItems: {
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
    billableItems: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'BillableItem' },
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

export const AvailabilitySettingModel = mongoose.model<ISchema>(
  'AvailabilitySetting',
  schema
);
