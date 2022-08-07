import mongoose from '../database';

interface ISchema {
  shop: mongoose.SchemaDefinitionProperty;
  dateOfDay: Date;
  entry: {
    worker: mongoose.SchemaDefinitionProperty;
    status: string;
    checkIn: Date;
    checkOut: Date;
    reason: string;
  }[];
}

const schema = new mongoose.Schema<ISchema>(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    dateOfDay: { type: Date },
    entry: [
      {
        worked: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
        status: {
          type: String,
          enum: ['present', 'absent'],
          default: 'absent',
        },
        checkIn: { type: Date },
        checkOut: { type: Date },
        reason: { type: String },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const AttendanceModel = mongoose.model<ISchema>('Attendance', schema);
