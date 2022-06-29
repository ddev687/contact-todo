import mongoose, { Document, Schema } from 'mongoose';

export interface IContacts extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  userId: string,
  isDeleted: boolean;
}

const contactsSchema: Schema = new Schema({
  fullName: { type: String },
  email: { type: String, unique: true },
  phoneNumber: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
  versionKey: false
});

contactsSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.isDeleted;
  }
});

contactsSchema.index({ email: 1, phone: 1 });

const Contacts = mongoose.model<IContacts>('Contacts', contactsSchema);

export default Contacts;
